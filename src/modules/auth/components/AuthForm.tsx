"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { routes } from "@/shared/config/routes";
import { Button, TextField } from "@/shared/ui";

import {
  signInAction,
  signUpAction,
  type AuthActionState,
} from "../actions";

export type AuthFormProps = {
  readonly mode: "login" | "register";
};

const initialState: AuthActionState = {};

export function AuthForm({ mode }: AuthFormProps) {
  const t = useTranslations("auth");
  const action = mode === "login" ? signInAction : signUpAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <section className="w-full max-w-md rounded-[20px] border border-[#e7edf9] bg-[#f8faff] p-5 sm:p-8">
      <h1 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[#0c1a3d] sm:text-2xl">
        {mode === "login" ? t("loginTitle") : t("registerTitle")}
      </h1>
      <p className="mt-3 text-[#5a6b8c]">
        {mode === "login" ? t("loginDescription") : t("registerDescription")}
      </p>

      {state.error ? (
        <p className="mt-4 text-sm font-semibold text-red-600">
          {t(`errors.${state.error}`)}
        </p>
      ) : null}

      {state.notice ? (
        <p className="mt-4 text-sm font-semibold text-[#22a06b]">
          {t(`notices.${state.notice}`)}
        </p>
      ) : null}

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        {mode === "register" ? (
          <TextField
            name="displayName"
            label={t("displayName")}
            autoComplete="nickname"
            required
            maxLength={40}
          />
        ) : null}
        <TextField
          name="email"
          type="email"
          label={t("email")}
          autoComplete="email"
          required
        />
        <TextField
          name="password"
          type="password"
          label={t("password")}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={8}
        />
        <Button type="submit" disabled={pending}>
          {pending ? t("pending") : mode === "login" ? t("submitLogin") : t("submitRegister")}
        </Button>
      </form>

      <p className="mt-6 text-sm font-bold text-[#5a6b8c]">
        {mode === "login" ? (
          <Link href={routes.register} className="text-[#4a7cf7]">
            {t("loginAction")}
          </Link>
        ) : (
          <Link href={routes.login} className="text-[#4a7cf7]">
            {t("registerAction")}
          </Link>
        )}
      </p>
    </section>
  );
}
