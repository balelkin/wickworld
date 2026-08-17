"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/ui";

import {
  deleteProjectAction,
  renameProjectAction,
} from "../actions";
import type { Project } from "../types";

export type ProjectActionsProps = {
  readonly project: Project;
};

export function ProjectActions({ project }: ProjectActionsProps) {
  const t = useTranslations("projects");
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onRename() {
    const next = window.prompt(t("renamePrompt"), project.title);
    if (next === null || next.trim() === project.title) {
      return;
    }
    setPending(true);
    await renameProjectAction(project.id, next);
    router.refresh();
    setPending(false);
  }

  async function onDelete() {
    if (!window.confirm(t("confirmDelete"))) {
      return;
    }
    setPending(true);
    await deleteProjectAction(project.id);
    router.refresh();
    setPending(false);
  }

  return (
    <div className="mt-2 flex gap-2">
      <Button
        type="button"
        variant="secondary"
        className="min-h-9 px-3 py-1 text-xs"
        disabled={pending}
        onClick={() => void onRename()}
      >
        {t("rename")}
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="min-h-9 px-3 py-1 text-xs text-[#5a6b8c]"
        disabled={pending}
        onClick={() => void onDelete()}
      >
        {t("delete")}
      </Button>
    </div>
  );
}
