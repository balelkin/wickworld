import { useTranslations } from "next-intl";

import { routes } from "@/shared/config/routes";
import { ButtonLink, Container } from "@/shared/ui";

const FEATURE_KEYS = ["simple", "learn", "share"] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative overflow-hidden bg-[#eef4ff] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/wwimage.png')" }}
    >
      <div className="absolute inset-0 bg-[#e2ecff]/35" />
      <Container className="relative flex min-h-[min(70vh,520px)] flex-col justify-center gap-6 py-8 md:min-h-[450px] md:flex-row md:items-center md:justify-between md:gap-7">
        <div className="max-w-[400px] rounded-[20px] bg-white/70 p-5 backdrop-blur-md sm:bg-white/55 sm:p-6">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-[linear-gradient(120deg,#6d4bef,#4a7cf7_70%)] sm:text-5xl">
            {t("title")
              .split("\n")
              .map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
          </h1>
          <p className="mt-4 mb-6 text-[15px] leading-relaxed text-[#3d4d72] sm:text-[15.5px]">
            {t("body")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={routes.projects}>{t("ctaCreate")}</ButtonLink>
            <ButtonLink href={routes.login} variant="secondary">
              {t("ctaLogin")}
            </ButtonLink>
          </div>
        </div>
        <aside className="flex max-w-none flex-col gap-4 rounded-[20px] bg-white/90 p-5 md:max-w-[340px] md:bg-white md:p-6">
          {FEATURE_KEYS.map((key) => (
            <div key={key}>
              <h2 className="font-[family-name:var(--font-display)] text-[15px] font-extrabold text-[#0c1a3d]">
                {t(`features.${key}.title`)}
              </h2>
              <p className="mt-1 text-[13px] leading-snug text-[#5a6b8c]">
                {t(`features.${key}.body`)}
              </p>
            </div>
          ))}
        </aside>
      </Container>
    </section>
  );
}
