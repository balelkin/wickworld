import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { withAuthSession } from "./shared/lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  return withAuthSession(request, response);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|editor|.*\\..*).*)",
};
