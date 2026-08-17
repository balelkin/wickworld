import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export type ContainerProps = {
  readonly as?: "div" | "main" | "section" | "header" | "footer";
  readonly children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
