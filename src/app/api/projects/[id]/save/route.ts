import { NextResponse } from "next/server";

import { getMyProject } from "@/modules/projects";
import { PRODUCT_LIMITS } from "@/shared/config/routes";
import { createServerSupabaseClient } from "@/shared/lib/supabase/server";
import { getCurrentUser } from "@/shared/lib/supabase/session";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();
  const project = await getMyProject(id);

  if (!user || !client.ok || !project) {
    return NextResponse.json({ ok: false, error: "notFound" }, { status: 404 });
  }

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength === 0) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }
  if (bytes.byteLength > PRODUCT_LIMITS.maxProjectFileBytes) {
    return NextResponse.json({ ok: false, error: "tooLarge" }, { status: 413 });
  }

  const { error: uploadError } = await client.value.storage
    .from("projects")
    .upload(project.storagePath, bytes, {
      upsert: true,
      contentType: "application/octet-stream",
    });

  if (uploadError) {
    return NextResponse.json({ ok: false, error: "uploadFailed" }, { status: 500 });
  }

  await client.value
    .from("projects")
    .update({ storage_path: project.storagePath })
    .eq("id", project.id)
    .eq("user_id", user.userId);

  return NextResponse.json({ ok: true });
}
