import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { env, isSupabaseConfigured } from "@/shared/config/env";
import { err, ok, type Result } from "@/shared/lib/result";

import type { Database } from "./database";

export type TypedSupabaseClient = SupabaseClient<Database>;

export class SupabaseNotConfiguredError extends Error {
  public override readonly name = "SupabaseNotConfiguredError";

  public constructor() {
    super("Supabase env vars are not set. Copy .env.example to .env.local.");
  }
}

export function createBrowserSupabaseClient(): Result<
  TypedSupabaseClient,
  SupabaseNotConfiguredError
> {
  if (!isSupabaseConfigured(env)) {
    return err(new SupabaseNotConfiguredError());
  }

  return ok(createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey));
}

export function createServiceSupabaseClient(): Result<
  TypedSupabaseClient,
  SupabaseNotConfiguredError
> {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    return err(new SupabaseNotConfiguredError());
  }

  return ok(
    createClient<Database>(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  );
}
