import { useTranslations } from "next-intl";

import { Container } from "@/shared/ui";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-auto bg-[#141f5e] text-[#c9d3f4]">
      <Container className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:flex-wrap sm:items-center">
        <div>
          <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold text-white">
            {t("community")}
          </p>
          <p className="text-[12.5px] text-[#a9b6ea]">{t("tagline")}</p>
        </div>
        <p className="text-sm">{t("attribution")}</p>
      </Container>
    </footer>
  );
}
