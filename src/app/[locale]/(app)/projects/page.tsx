import { getTranslations } from "next-intl/server";

import { ProjectList, listMyProjects } from "@/modules/projects";

export async function generateMetadata() {
  const t = await getTranslations("projects");
  return { title: t("metaTitle") };
}

export default async function ProjectsPage() {
  const projects = await listMyProjects();

  return <ProjectList projects={projects} />;
}
