import { NextResponse } from "next/server";

import { getMyProject } from "@/modules/projects";
import { createServerSupabaseClient } from "@/shared/lib/supabase/server";
import { getCurrentUser } from "@/shared/lib/supabase/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getCurrentUser();
  const client = await createServerSupabaseClient();
  const project = await getMyProject(id);

  if (!user || !client.ok || !project) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { data, error } = await client.value.storage
    .from("projects")
    .download(project.storagePath);

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const bytes = await data.arrayBuffer();
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-store",
    },
  });
}
