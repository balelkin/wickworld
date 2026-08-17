import type { ReactNode } from "react";

import { SiteHeader } from "@/modules/marketing";

export default function EditorSectionLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-dvh min-h-0 flex-col bg-[#0c1a3d]">
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
