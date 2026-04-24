import { NextRequest, NextResponse } from "next/server";
import { COOKIES, ROUTES } from "@/constant";

const authPaths = [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.FORGOT_PASSWORD, ROUTES.RESET_PASSWORD];
const publicPaths = [ROUTES.CALLBACK];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = authPaths.some(path => pathname.startsWith(path));
  const isPublicPage = publicPaths.some(path => pathname.startsWith(path));

  if (isPublicPage) {
    return NextResponse.next();
  }

  const isDashboardPage = !isAuthPage && !isPublicPage && !pathname.startsWith("/_next");

  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(ROUTES.PROJECTS, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

