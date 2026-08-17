import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/modules/marketing";
import { Container } from "@/shared/ui";

export default function AuthSectionLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-[#f4f7fd]">
      <SiteHeader />
      <Container as="main" className="flex flex-1 items-start py-8 sm:py-16">
        {children}
      </Container>
      <SiteFooter />
    </div>
  );
}
