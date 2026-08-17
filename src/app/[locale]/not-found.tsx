import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routes } from "@/shared/config/routes";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[#0c1a3d] sm:text-3xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-[#5a6b8c]">{t("body")}</p>
      <Link
        href={routes.home}
        className="inline-flex min-h-11 items-center rounded-full bg-[linear-gradient(120deg,#6d4bef,#4a7cf7)] px-5 font-extrabold text-white"
      >
        {t("home")}
      </Link>
    </div>
  );
}
