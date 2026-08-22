import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isValidAdminEdgeToken } from "./lib/auth-edge";
import {
  STAFF_COOKIE_NAME,
  isValidStaffEdgeToken,
} from "./lib/staff-auth-edge";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = await isValidAdminEdgeToken(token);

  const staffToken = request.cookies.get(STAFF_COOKIE_NAME)?.value;
  const staffAuthenticated = await isValidStaffEdgeToken(staffToken);

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

  if (request.nextUrl.pathname.startsWith("/staff")) {
    if (
      !staffAuthenticated &&
      request.nextUrl.pathname !== "/staff/login"
    ) {
      return NextResponse.redirect(
        new URL("/staff/login", request.url)
      );
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/api/staff") &&
    request.nextUrl.pathname !== "/api/staff/login" &&
    request.nextUrl.pathname !== "/api/staff/logout" &&
    !staffAuthenticated
  ) {
    return NextResponse.json(
      { error: "Staff authentication required." },
      { status: 401 }
    );
  }

  if (
    request.nextUrl.pathname === "/api/repairs" &&
    request.method === "GET"
  ) {
    if (!authenticated && !staffAuthenticated) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }
  }

  if (
    request.nextUrl.pathname === "/api/repairs" &&
    request.method === "PATCH"
  ) {
    if (!authenticated) {
      return NextResponse.json(
        { error: "Admin authentication required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/api/staff/:path*",
    "/api/repairs/:path*",
  ],
};
