import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      device,
      deviceType,
      brand,
      model,
      problem,
      name,
      phone,
      email = "",
      notes = "",
    } = body;

    if (
      !id ||
      !deviceType ||
      !brand ||
      !model ||
      !problem ||
      !name ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Missing required repair information." },
        { status: 400 }
      );
    }

    const message =
      "Your repair request has been received. A technician will review your device and update the repair status.";

    const result = await pool.query(
      `
        INSERT INTO repairs (
          id,
          device,
          device_type,
          brand,
          model,
          problem,
          name,
          phone,
          email,
          notes,
          status,
          message
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12
        )
        RETURNING *
      `,
      [
        id,
        device,
        deviceType,
        brand,
        model,
        problem,
        name,
        phone,
        email,
        notes,
        "Request Received",
        message,
      ]
    );

    return NextResponse.json({
      repair: result.rows[0],
    });
  } catch (error) {
    console.error("Create repair error:", error);

    return NextResponse.json(
      { error: "Unable to create repair request." },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
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
        ORDER BY created_at DESC
      `
    );

    return NextResponse.json({
      repairs: result.rows,
    });
  } catch (error) {
    console.error("Load repairs error:", error);

    return NextResponse.json(
      { error: "Unable to load repairs." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, message } = body;

    if (!id || !status || !message) {
      return NextResponse.json(
        { error: "Repair ID, status, and message are required." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
        UPDATE repairs
        SET
          status = $1,
          message = $2,
          updated_at = NOW()
        WHERE id = $3
        RETURNING
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
      `,
      [status, message, id.trim().toUpperCase()]
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
    console.error("Update repair error:", error);

    return NextResponse.json(
      { error: "Unable to update repair." },
      { status: 500 }
    );
  }
}
