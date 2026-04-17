import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];
const publicPaths = ["/callback", "/auth/callback"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = authPaths.some(path => pathname.startsWith(path));
  const isPublicPage = publicPaths.some(path => pathname.startsWith(path));

  // If it's a public page like auth callback, let it pass
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Dashboard is anything that isn't auth or public
  // We also exclude Next.js internal paths and static assets
  const isDashboardPage = !isAuthPage && !isPublicPage && !pathname.startsWith("/_next") && !pathname.includes(".");

  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

