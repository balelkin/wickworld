import type { ReactNode } from "react";

import "./globals.css";

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
