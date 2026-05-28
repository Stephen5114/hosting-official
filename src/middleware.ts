import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh", "es", "ja"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname starts with static folders or next internals to avoid infinite loops
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Check if the pathname is missing any locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale prefix
  if (pathnameIsMissingLocale) {
    // 1. Read custom preference cookie
    const cookieLang = request.cookies.get("vibe-hosting-lang")?.value;
    
    // Validate that cookie value is a supported locale
    let locale = locales.find((l) => l === cookieLang);

    if (!locale) {
      // 2. Fall back to Accept-Language header
      const acceptLang = request.headers.get("accept-language") || "";
      if (acceptLang.includes("zh")) {
        locale = "zh";
      } else if (acceptLang.includes("es")) {
        locale = "es";
      } else if (acceptLang.includes("ja")) {
        locale = "ja";
      } else {
        locale = defaultLocale;
      }
    }

    // Redirect to the URL with the locale segment
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring _next, api, static files, images
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
