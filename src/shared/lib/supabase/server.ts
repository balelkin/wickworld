import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { env, isSupabaseConfigured } from "@/shared/config/env";
import { err, ok, type Result } from "@/shared/lib/result";

import type { Database } from "./database";
import {
  SupabaseNotConfiguredError,
  type TypedSupabaseClient,
} from "./client";

export async function createServerSupabaseClient(): Promise<
  Result<TypedSupabaseClient, SupabaseNotConfiguredError>
> {
  if (!isSupabaseConfigured(env)) {
    return err(new SupabaseNotConfiguredError());
  }

  const cookieStore = await cookies();

  return ok(
    createServerClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot always set cookies; proxy refreshes the session.
          }
        },
      },
    }),
  );
}
