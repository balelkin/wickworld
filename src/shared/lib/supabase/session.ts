import { asUserId, type UserId } from "@/shared/types";

import { createServerSupabaseClient } from "./server";

export type CurrentUser = {
  readonly userId: UserId;
  readonly email: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const client = await createServerSupabaseClient();
  if (!client.ok) {
    return null;
  }

  const { data, error } = await client.value.auth.getUser();
  if (error || !data.user?.email) {
    return null;
  }

  return {
    userId: asUserId(data.user.id),
    email: data.user.email,
  };
}
