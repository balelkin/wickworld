import { getCurrentUser } from "@/shared/lib/supabase/session";

import { Navbar } from "./Navbar";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return <Navbar userEmail={user?.email ?? null} />;
}
