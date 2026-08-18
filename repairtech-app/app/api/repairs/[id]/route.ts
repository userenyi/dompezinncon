import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const normalizedId = decodeURIComponent(id).trim().toUpperCase();

    if (!normalizedId) {
      return NextResponse.json(
        { error: "Tracking ID is required." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
        SELECT
          id,
          device,
          device_type AS "deviceType",
          brand,
          model,
          problem,
          name,
          phone,
          email,
          notes,
          status,
          message,
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM repairs
        WHERE id = $1
        LIMIT 1
      `,
      [normalizedId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Repair not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      repair: result.rows[0],
    });
  } catch (error) {
    console.error("Find repair error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve repair." },
      { status: 500 }
    );
  }
}
