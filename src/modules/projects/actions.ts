"use server";

import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

import { PRODUCT_LIMITS, routes } from "@/shared/config/routes";
import { createServerSupabaseClient } from "@/shared/lib/supabase/server";
import { getCurrentUser } from "@/shared/lib/supabase/session";
import { asProjectId } from "@/shared/types";

import { mapProjectRow } from "./mappers";
import { storagePathFor, type Project } from "./types";

export type ProjectActionError =
  | "notConfigured"
  | "createFailed"
  | "limitReached"
  | "missingTitle"
  | "renameFailed";

export type ProjectActionState = {
  readonly error?: ProjectActionError;
};

export async function listMyProjects(): Promise<Project[]> {
  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();
  if (!user || !client.ok) {
    return [];
  }

  const { data, error } = await client.value
    .from("projects")
    .select("*")
    .eq("user_id", user.userId)
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapProjectRow);
}

export async function getMyProject(projectId: string): Promise<Project | null> {
  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();
  if (!user || !client.ok) {
    return null;
  }

  const { data, error } = await client.value
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("user_id", user.userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProjectRow(data);
}

export async function createProjectAction(
  _prev: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const locale = await getLocale();
  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();

  if (!user || !client.ok) {
    return { error: "notConfigured" };
  }

  const { count, error: countError } = await client.value
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.userId);

  if (countError) {
    return { error: "createFailed" };
  }

  if ((count ?? 0) >= PRODUCT_LIMITS.maxProjectsPerUser) {
    return { error: "limitReached" };
  }

  const t = await getTranslations("projects");
  const id = crypto.randomUUID();
  const projectId = asProjectId(id);
  const resolvedTitle = (title.length > 0 ? title : t("defaultTitle")).slice(
    0,
    80,
  );

  const { error } = await client.value.from("projects").insert({
    id,
    user_id: user.userId,
    title: resolvedTitle,
    storage_path: storagePathFor(user.userId, projectId),
    visibility: "private",
  });

  if (error) {
    return { error: "createFailed" };
  }

  redirect({ href: routes.projectEdit(id), locale });
  return {};
}

export async function deleteProjectAction(projectId: string): Promise<void> {
  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();
  if (!user || !client.ok) {
    return;
  }

  await client.value
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", user.userId);

  revalidatePath("/projects");
  revalidatePath("/en/projects");
}

export async function renameProjectAction(
  projectId: string,
  title: string,
): Promise<ProjectActionState> {
  const trimmed = title.trim().slice(0, 80);
  if (!trimmed) {
    return { error: "missingTitle" };
  }

  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();
  if (!user || !client.ok) {
    return { error: "notConfigured" };
  }

  const { error } = await client.value
    .from("projects")
    .update({ title: trimmed })
    .eq("id", projectId)
    .eq("user_id", user.userId);

  if (error) {
    return { error: "renameFailed" };
  }

  revalidatePath("/projects");
  revalidatePath("/en/projects");
  return {};
}
