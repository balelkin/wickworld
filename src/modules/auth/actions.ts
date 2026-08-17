"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

import { routes } from "@/shared/config/routes";
import { createServerSupabaseClient } from "@/shared/lib/supabase/server";

export type AuthActionError =
  | "missingFields"
  | "notConfigured"
  | "invalidCredentials"
  | "passwordShort"
  | "signUpFailed";

export type AuthActionNotice = "checkEmail";

export type AuthActionState = {
  readonly error?: AuthActionError;
  readonly notice?: AuthActionNotice;
};

export async function signInAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const locale = await getLocale();

  if (!email || !password) {
    return { error: "missingFields" };
  }

  const client = await createServerSupabaseClient();
  if (!client.ok) {
    return { error: "notConfigured" };
  }

  const { error } = await client.value.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "invalidCredentials" };
  }

  redirect({ href: routes.projects, locale });
  return {};
}

export async function signUpAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();
  const locale = await getLocale();

  if (!email || !password || !displayName) {
    return { error: "missingFields" };
  }

  if (password.length < 8) {
    return { error: "passwordShort" };
  }

  const client = await createServerSupabaseClient();
  if (!client.ok) {
    return { error: "notConfigured" };
  }

  const { data, error } = await client.value.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
    },
  });

  if (error) {
    return { error: "signUpFailed" };
  }

  if (!data.session) {
    return { notice: "checkEmail" };
  }

  redirect({ href: routes.projects, locale });
  return {};
}

export async function signOutAction(): Promise<void> {
  const locale = await getLocale();
  const client = await createServerSupabaseClient();
  if (client.ok) {
    await client.value.auth.signOut();
  }
  redirect({ href: routes.home, locale });
}
