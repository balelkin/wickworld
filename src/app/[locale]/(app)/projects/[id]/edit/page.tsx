import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { EditorHost } from "@/modules/editor";
import { getMyProject } from "@/modules/projects";
import { PageHeader } from "@/shared/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("editor");
  const project = await getMyProject(id);

  return { title: project?.title ?? t("metaTitle") };
}

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("editor");
  const project = await getMyProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={project.title} description={t("pageDescription")} />
      <EditorHost projectId={project.id} />
    </div>
  );
}
