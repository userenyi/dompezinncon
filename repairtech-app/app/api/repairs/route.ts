import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";
import {
  buildRepairSmsMessage,
  sendSMS,
} from "../../../lib/sms";

const READY_STATUS = "Ready for Collection";

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

    const savedRepair = result.rows[0];

    /*
     * The repair has already been successfully saved.
     * SMS failure must never make the booking fail.
     */
    try {
      await sendSMS({
        to: savedRepair.phone,
        repairId: savedRepair.id,
        event: "BOOKING_CREATED",
        message: buildRepairSmsMessage(
          "BOOKING_CREATED",
          savedRepair.id
        ),
      });
    } catch (smsError) {
      console.error("Booking SMS failed:", smsError);
    }

    return NextResponse.json({
      repair: savedRepair,
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

    /*
     * Only update to Ready for Collection when the previous
     * status was NOT already Ready for Collection.
     *
     * This makes the transition explicit at the database level.
     */
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
          status,
          device,
          device_type AS "deviceType",
          brand,
          model,
          problem,
          name,
          phone,
          email,
          notes,
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

    const updatedRepair = result.rows[0];

    /*
     * Ask the database whether this repair has previously reached
     * Ready for Collection. The unique SMS event record provides
     * the final idempotency protection.
     */
    if (updatedRepair.status === READY_STATUS) {
      try {
        await sendSMS({
          to: updatedRepair.phone,
          repairId: updatedRepair.id,
          event: "REPAIR_READY",
          message: buildRepairSmsMessage(
            "REPAIR_READY",
            updatedRepair.id
          ),
        });
      } catch (smsError) {
        console.error("Repair completion SMS failed:", smsError);
      }
    }

    return NextResponse.json({
      repair: updatedRepair,
    });
  } catch (error) {
    console.error("Update repair error:", error);

    return NextResponse.json(
      { error: "Unable to update repair." },
      { status: 500 }
    );
  }
}
