import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

export type TextFieldProps = ComponentProps<"input"> & {
  readonly label: string;
  readonly error?: string;
};

export function TextField({
  label,
  error,
  id,
  className,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-[#0c1a3d]">
      {label}
      <input
        id={fieldId}
        className={cn(
          "min-h-11 rounded-xl border border-[#e7edf9] bg-white px-3 text-base font-semibold text-[#0c1a3d]",
          "outline-none focus:border-[#4a7cf7]",
          error ? "border-red-400" : null,
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="font-semibold text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
