"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

export type LocaleSwitcherProps = {
  readonly className?: string;
  readonly tone?: "light" | "dark";
};

export function LocaleSwitcher({
  className,
  tone = "light",
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tLocale = useTranslations("locale");

  return (
    <label className={cn("inline-flex min-h-11 items-center", className)}>
      <span className="sr-only">{t("language")}</span>
      <select
        className={cn(
          "min-h-11 rounded-full border bg-transparent px-3 text-sm font-bold",
          tone === "light"
            ? "border-white/25 text-white"
            : "border-[#d9e2fb] text-[#0c1a3d]",
        )}
        value={locale}
        onChange={(event) => {
          const next = event.target.value as AppLocale;
          router.replace(pathname, { locale: next });
        }}
      >
        {routing.locales.map((code) => (
          <option key={code} value={code} className="text-[#0c1a3d]">
            {tLocale(code)}
          </option>
        ))}
      </select>
    </label>
  );
}
