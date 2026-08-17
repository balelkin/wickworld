import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { env, isSupabaseConfigured } from "@/shared/config/env";
import { routing, type AppLocale } from "@/i18n/routing";

import type { Database } from "./database";

function localeFromPathname(pathname: string): AppLocale {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return routing.defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}

export function withLocalePrefix(locale: AppLocale, path: string): string {
  if (locale === routing.defaultLocale) {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function copyCookies(from: NextResponse, to: NextResponse): NextResponse {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });
  return to;
}

export async function withAuthSession(
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> {
  if (!isSupabaseConfigured(env)) {
    return response;
  }

  const supabase = createServerClient<Database>(
    env.supabaseUrl,
    env.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = stripLocalePrefix(request.nextUrl.pathname);
  const locale = localeFromPathname(request.nextUrl.pathname);
  const isProjects = pathname === "/projects" || pathname.startsWith("/projects/");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isProjects && !user) {
    const redirect = NextResponse.redirect(
      new URL(withLocalePrefix(locale, "/login"), request.url),
    );
    return copyCookies(response, redirect);
  }

  if (isAuthPage && user) {
    const redirect = NextResponse.redirect(
      new URL(withLocalePrefix(locale, "/projects"), request.url),
    );
    return copyCookies(response, redirect);
  }

  return response;
}
