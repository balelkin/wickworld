"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui";

import { signOutAction } from "../actions";

export function SignOutButton() {
  const t = useTranslations("nav");

  return (
    <form action={signOutAction}>
      <Button
        type="submit"
        variant="ghost"
        className="min-h-11 px-3 text-[15px] text-[#dbe4ff] hover:text-white"
      >
        {t("logout")}
      </Button>
    </form>
  );
}
