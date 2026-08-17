"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";

import { isSupabaseConfigured } from "@/shared/config/env";
import { Button } from "@/shared/ui";

import { createProjectAction, type ProjectActionState } from "../actions";

const initialState: ProjectActionState = {};

export function CreateProjectButton() {
  const t = useTranslations("projects");
  const [state, formAction, pending] = useActionState(
    createProjectAction,
    initialState,
  );
  const configured = isSupabaseConfigured();

  return (
    <form action={formAction} className="flex flex-col items-end gap-2">
      <input type="hidden" name="title" value={t("defaultTitle")} />
      <Button type="submit" disabled={!configured || pending}>
        {pending ? t("creating") : t("create")}
      </Button>
      {state.error ? (
        <p className="text-sm font-semibold text-red-600">
          {t(`errors.${state.error}`)}
        </p>
      ) : null}
    </form>
  );
}
