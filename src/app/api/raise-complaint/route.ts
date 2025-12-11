import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { residentId, description } = await req.json();
    const client = await clientPromise;
    const db = client.db("LOGIN"); // Use LOGIN database

    const resident = await db
      .collection("LOGIN_DETAILS")
      .findOne({ email: residentId });

    if (!resident) {
      return NextResponse.json(
        { message: "Resident not found" },
        { status: 404 }
      );
    }

    const booking = await db
      .collection("ROOM_ALLOCATION")
      .findOne({ residentId: residentId });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    await db.collection("COMPLANITS").insertOne({
      resident: resident, // Store full resident details
      room: {
        roomNumber: booking.roomNumber,
        // Add other booking/room details if needed
      },
      description,
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Complaint raised" });
  } catch (error) {
    console.error("Error raising complaint:", error);
    return NextResponse.json(
      { message: "Error raising complaint" },
      { status: 500 }
    );
  }
}
