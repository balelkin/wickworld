"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { SignOutButton } from "@/modules/auth";
import { Link } from "@/i18n/navigation";
import { routes } from "@/shared/config/routes";
import { ButtonLink, Container } from "@/shared/ui";

import { LocaleSwitcher } from "./LocaleSwitcher";

export type NavbarProps = {
  readonly userEmail?: string | null;
};

export function Navbar({ userEmail = null }: NavbarProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const signedIn = Boolean(userEmail);

  const links = [
    { href: routes.projects, label: t("create") },
    { href: { pathname: routes.home, hash: "gallery" }, label: t("explore") },
    { href: routes.projects, label: t("projects") },
  ] as const;

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-[linear-gradient(90deg,#16247a,#2452d6_70%)]">
      <Container className="flex h-16 items-center gap-3 sm:h-[76px] sm:gap-7">
        <Link
          href={routes.home}
          className="flex min-h-11 items-center gap-2 whitespace-nowrap text-xl font-extrabold text-white font-[family-name:var(--font-display)] sm:text-2xl"
          onClick={close}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffd23f] text-lg sm:h-10 sm:w-10 sm:text-xl">
            ✦
          </span>
          WickWorld
        </Link>

        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[15px] font-bold text-[#dbe4ff] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          {signedIn ? (
            <>
              <span className="max-w-[160px] truncate text-sm font-bold text-[#dbe4ff]">
                {userEmail}
              </span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href={routes.login}
                className="inline-flex min-h-11 items-center text-[15px] font-bold text-[#dbe4ff] hover:text-white"
              >
                {t("login")}
              </Link>
              <ButtonLink
                href={routes.register}
                variant="secondary"
                className="border-0 bg-[#ffd23f] text-[#3a2a00] hover:bg-[#f2b400]"
              >
                {t("join")}
              </ButtonLink>
            </>
          )}
        </div>

        <button
          type="button"
          className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/15 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex min-h-11 items-center rounded-xl px-3 font-bold text-white"
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
            {signedIn ? (
              <div className="mt-2 flex flex-col gap-2 px-3">
                <span className="truncate text-sm font-bold text-[#dbe4ff]">
                  {userEmail}
                </span>
                <SignOutButton />
              </div>
            ) : (
              <>
                <Link
                  href={routes.login}
                  className="flex min-h-11 items-center rounded-xl px-3 font-bold text-white"
                  onClick={close}
                >
                  {t("login")}
                </Link>
                <ButtonLink
                  href={routes.register}
                  variant="secondary"
                  className="mt-2 border-0 bg-[#ffd23f] text-[#3a2a00]"
                >
                  {t("join")}
                </ButtonLink>
              </>
            )}
            <div className="mt-3 px-1">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
