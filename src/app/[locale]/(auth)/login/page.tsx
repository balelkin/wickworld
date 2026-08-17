import { getTranslations } from "next-intl/server";

import { AuthForm } from "@/modules/auth";

export async function generateMetadata() {
  const t = await getTranslations("auth");
  return { title: t("loginTitle") };
}

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
