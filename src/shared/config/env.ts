import { z } from "zod";

const optionalUrl = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  z.string().url().optional(),
);

const optionalKey = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  z.string().min(1).optional(),
);

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalKey,
  SUPABASE_SERVICE_ROLE_KEY: optionalKey,
});

export type PublicEnv = {
  readonly supabaseUrl: string | undefined;
  readonly supabaseAnonKey: string | undefined;
};

export type ServerEnv = PublicEnv & {
  readonly supabaseServiceRoleKey: string | undefined;
};

function readEnv(): ServerEnv {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  if (!parsed.success) {
    throw new Error(`Invalid environment: ${parsed.error.message}`);
  }

  return {
    supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: parsed.data.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export const env: ServerEnv = readEnv();

export function isSupabaseConfigured(
  value: PublicEnv = env,
): value is PublicEnv & { supabaseUrl: string; supabaseAnonKey: string } {
  return Boolean(value.supabaseUrl && value.supabaseAnonKey);
}
