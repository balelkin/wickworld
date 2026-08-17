"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import type { ProjectId } from "@/shared/types";

import {
  isWickworldMessage,
  WICKWORLD_PROTOCOL_VERSION,
  type EditorToHostMessage,
  type HostToEditorMessage,
} from "../protocol";

export type EditorHostProps = {
  readonly projectId: ProjectId;
  readonly editorSrc?: string;
};

export function EditorHost({
  projectId,
  editorSrc = "/editor/",
}: EditorHostProps) {
  const t = useTranslations("editor");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadedRef = useRef(false);
  const frameSrc = `${editorSrc}?projectId=${projectId}`;

  useEffect(() => {
    function post(message: HostToEditorMessage) {
      const frame = iframeRef.current?.contentWindow;
      if (!frame) {
        return;
      }
      frame.postMessage(message, window.location.origin);
    }

    async function onReady() {
      const response = await fetch(`/api/projects/${projectId}/file`, {
        credentials: "include",
      });

      if (response.status === 404) {
        loadedRef.current = true;
        post({
          protocolVersion: WICKWORLD_PROTOCOL_VERSION,
          type: "wickworld:load-empty",
          requestId: crypto.randomUUID(),
        });
        return;
      }

      if (!response.ok) {
        return;
      }

      const wickBytes = await response.arrayBuffer();
      loadedRef.current = true;
      post({
        protocolVersion: WICKWORLD_PROTOCOL_VERSION,
        type: "wickworld:load",
        requestId: crypto.randomUUID(),
        wickBytes,
      });
    }

    async function onSave(message: Extract<EditorToHostMessage, { type: "wickworld:save" }>) {
      if (!loadedRef.current) {
        post({
          protocolVersion: WICKWORLD_PROTOCOL_VERSION,
          type: "wickworld:save-ack",
          requestId: message.requestId,
          ok: false,
          error: "loadIncomplete",
        });
        return;
      }

      const response = await fetch(`/api/projects/${projectId}/save`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/octet-stream" },
        body: message.file,
      });

      post({
        protocolVersion: WICKWORLD_PROTOCOL_VERSION,
        type: "wickworld:save-ack",
        requestId: message.requestId,
        ok: response.ok,
        error: response.ok ? undefined : "saveFailed",
      });
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }
      if (!isWickworldMessage(event.data)) {
        return;
      }

      const data = event.data as EditorToHostMessage;
      if (data.type === "wickworld:ready") {
        void onReady();
      }
      if (data.type === "wickworld:save") {
        void onSave(data);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [projectId]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0c1a3d]">
      <iframe
        ref={iframeRef}
        title={t("label")}
        src={frameSrc}
        className="h-full min-h-[70vh] w-full flex-1 border-0 bg-white"
        allow="autoplay; clipboard-read; clipboard-write"
      />
    </div>
  );
}
