export { env, isSupabaseConfigured } from "@/shared/config/env";
export { PRODUCT_LIMITS, routes } from "@/shared/config/routes";
export { cn } from "@/shared/lib/cn";
export { err, isOk, ok, type Result } from "@/shared/lib/result";
export {
  createBrowserSupabaseClient,
  createServiceSupabaseClient,
  SupabaseNotConfiguredError,
} from "@/shared/lib/supabase/client";
export type { Brand, ProjectId, UserId } from "@/shared/types";
export { asProjectId, asUserId } from "@/shared/types";
