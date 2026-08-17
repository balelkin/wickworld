import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

export type ButtonLinkVariant = "primary" | "secondary" | "ghost";

export type ButtonLinkProps = {
  readonly href: ComponentProps<typeof Link>["href"];
  readonly variant?: ButtonLinkVariant;
  readonly children: ReactNode;
  readonly className?: string;
};

const variantClassName: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-[linear-gradient(120deg,#6d4bef,#4a7cf7)] text-white hover:brightness-105",
  secondary:
    "bg-white text-[#5433d6] border-2 border-[#d9e2fb] hover:border-[#4a7cf7]",
  ghost: "bg-transparent text-[#dbe4ff] hover:text-white",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold transition",
        variantClassName[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
