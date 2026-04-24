import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

const SESSION_COOKIE = "vitem_admin_session";
const SESSION_VALUE = "authenticated";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin-login ve /api → doğrudan geç
  if (pathname === "/admin-login" || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // /admin/* → oturum kontrolü (/admin-login hariç)
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get(SESSION_COOKIE);
    if (session?.value !== SESSION_VALUE) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
    return NextResponse.next();
  }

  // Diğer tüm rotalar → i18n middleware
  return intlMiddleware(req);
}

export const config = {
  // Tüm yolları yakala; _next, api ve statik dosyaları hariç tut
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
