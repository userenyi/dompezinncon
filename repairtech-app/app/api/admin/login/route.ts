import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, getAdminToken } from "../../../../lib/auth";

export async function POST(request: Request) {
  console.log("ADMIN AUTH ENV:", {
    passwordConfigured: Boolean(process.env.ADMIN_PASSWORD),
    passwordLength: process.env.ADMIN_PASSWORD?.length ?? 0,
    secretConfigured: Boolean(process.env.ADMIN_SESSION_SECRET),
    secretLength: process.env.ADMIN_SESSION_SECRET?.length ?? 0,
  });
  try {
    const body = await request.json();
    const password = String(body.password ?? "");

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin authentication is not configured." },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin password." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, getAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Unable to process login." },
      { status: 500 }
    );
  }
}
