import { SiteFooter, SiteHeader } from "@/modules/marketing";
import { Container } from "@/shared/ui";

export default function AppSectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-[#f4f7fd]">
      <SiteHeader />
      <Container as="main" className="flex-1 py-6 sm:py-10">
        {children}
      </Container>
      <SiteFooter />
    </div>
  );
}
