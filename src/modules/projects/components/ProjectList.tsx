import { useTranslations } from "next-intl";

import { PRODUCT_LIMITS } from "@/shared/config/routes";
import { PageHeader } from "@/shared/ui";

import type { Project } from "../types";
import { CreateProjectButton } from "./CreateProjectButton";
import { ProjectActions } from "./ProjectActions";
import { ProjectCard } from "./ProjectCard";

export type ProjectListProps = {
  readonly projects: readonly Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  const t = useTranslations("projects");

  return (
    <div>
      <PageHeader
        title={t("title")}
        description={t("description", {
          maxProjects: PRODUCT_LIMITS.maxProjectsPerUser,
          maxMb: PRODUCT_LIMITS.maxProjectFileBytes / (1024 * 1024),
        })}
        actions={<CreateProjectButton />}
      />
      {projects.length === 0 ? (
        <p className="rounded-[20px] border border-dashed border-[#c9d8fb] bg-white px-4 py-10 text-center text-[#5a6b8c] sm:px-6 sm:py-12">
          {t("empty")}
        </p>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {projects.map((project) => (
            <li key={project.id} className="w-[calc(50%-0.5rem)] sm:w-[172px]">
              <ProjectCard project={project} className="w-full max-w-none" />
              <ProjectActions project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
