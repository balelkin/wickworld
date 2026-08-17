import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export type PageHeaderProps = {
  readonly title: string;
  readonly description?: string;
  readonly actions?: ReactNode;
  readonly className?: string;
};

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[#0c1a3d] sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-[#5a6b8c]">{description}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}
