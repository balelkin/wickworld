import { getTranslations } from "next-intl/server";

import { Container } from "@/shared/ui";

import { Hero } from "./Hero";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="flex min-h-full flex-col bg-[#f4f7fd]">
      <SiteHeader />
      <Hero />
      <Container as="main" className="py-8 sm:py-10" id="gallery">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[#0c1a3d] sm:text-[21px]">
          {t("galleryTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-[#5a6b8c]">{t("galleryBody")}</p>
      </Container>
      <SiteFooter />
    </div>
  );
}
