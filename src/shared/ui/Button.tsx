import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

export type ButtonProps = {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(120deg,#6d4bef,#4a7cf7)] text-white hover:brightness-105",
  secondary:
    "bg-white text-[#5433d6] border-2 border-[#d9e2fb] hover:border-[#4a7cf7] hover:bg-[#f5f8ff]",
  ghost: "bg-transparent text-[#dbe4ff] hover:text-white",
};

const sizeClassName: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.9375rem]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-extrabold transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
