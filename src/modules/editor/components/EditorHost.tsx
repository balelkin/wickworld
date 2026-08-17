import { useTranslations } from "next-intl";

import type { ProjectId } from "@/shared/types";

export type EditorHostProps = {
  readonly projectId: ProjectId;
  readonly editorSrc?: string;
};

/**
 * Iframe host. The Wick build will be served from `/editor` later.
 * Until the fork exists we render a documented placeholder.
 */
export function EditorHost({
  projectId,
  editorSrc = "/editor",
}: EditorHostProps) {
  const t = useTranslations("editor");

  return (
    <div className="flex min-h-[60vh] flex-col overflow-hidden rounded-[20px] border border-[#e7edf9] bg-[#0c1a3d] text-white sm:min-h-[70vh]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-3 text-sm sm:px-4">
        <span className="truncate font-bold">
          {t("label")} · {projectId}
        </span>
        <span className="hidden text-white/60 sm:inline">{editorSrc}</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center sm:p-8">
        <p className="font-[family-name:var(--font-display)] text-xl font-extrabold sm:text-2xl">
          {t("notConnected")}
        </p>
        <p className="max-w-md text-sm text-white/70">{t("notConnectedBody")}</p>
      </div>
    </div>
  );
}
