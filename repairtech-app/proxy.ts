import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isValidAdminEdgeToken } from "./lib/auth-edge";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = await isValidAdminEdgeToken(token);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (
      !authenticated &&
      request.nextUrl.pathname !== "/admin/login"
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/api/repairs") &&
    request.method === "PATCH"
  ) {
    if (!authenticated) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/repairs/:path*"],
};
