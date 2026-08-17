import { asProjectId, asUserId } from "@/shared/types";

import type { Database } from "@/shared/lib/supabase/database";

import type { Project } from "./types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: asProjectId(row.id),
    userId: asUserId(row.user_id),
    title: row.title,
    storagePath: row.storage_path,
    visibility: row.visibility,
    remixOf: row.remix_of ? asProjectId(row.remix_of) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
