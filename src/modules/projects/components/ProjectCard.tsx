import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { routes } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";

import type { Project } from "../types";

export type ProjectCardProps = {
  readonly project: Project;
  readonly className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const t = useTranslations("projects");

  return (
    <Link
      href={routes.projectEdit(project.id)}
      className={cn(
        "block w-full max-w-[172px] overflow-hidden rounded-[14px] border border-[#e7edf9] bg-[#f8faff]",
        "transition hover:-translate-y-0.5 hover:border-[#c9d8fb]",
        className,
      )}
    >
      <div className="flex h-[110px] items-center justify-center bg-[linear-gradient(135deg,#8b5cf6,#3b2f8f)] text-4xl text-white">
        ✦
      </div>
      <div className="px-3 py-2.5">
        <p className="text-sm font-extrabold leading-tight text-[#0c1a3d]">
          {project.title}
        </p>
        <p className="mt-1 text-xs text-[#5a6b8c]">{t("private")}</p>
      </div>
    </Link>
  );
}
