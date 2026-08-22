import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  STAFF_COOKIE_NAME,
  getStaffToken,
} from "../../../../lib/staff-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password ?? "");

    if (!process.env.STAFF_PASSWORD || !process.env.STAFF_SESSION_SECRET) {
      return NextResponse.json(
        { error: "Staff authentication is not configured." },
        { status: 500 }
      );
    }

    if (password !== process.env.STAFF_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid staff password." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set(STAFF_COOKIE_NAME, getStaffToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Staff login error:", error);

    return NextResponse.json(
      { error: "Unable to process staff login." },
      { status: 500 }
    );
  }
}
