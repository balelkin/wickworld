import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { EditorHost } from "@/modules/editor";
import { getMyProject } from "@/modules/projects";
import { Link } from "@/i18n/navigation";
import { routes } from "@/shared/config/routes";

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
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between gap-3 bg-[#16247a] px-4 py-2 text-sm text-white">
        <p className="truncate font-extrabold">{project.title}</p>
        <Link
          href={routes.projects}
          className="inline-flex min-h-11 shrink-0 items-center font-bold text-[#dbe4ff] hover:text-white"
        >
          {t("back")}
        </Link>
      </div>
      <EditorHost projectId={project.id} />
    </div>
  );
}
