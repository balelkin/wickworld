import { getTranslations } from "next-intl/server";

import { AuthForm } from "@/modules/auth";

export async function generateMetadata() {
  const t = await getTranslations("auth");
  return { title: t("registerTitle") };
}

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
