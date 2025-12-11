import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("LOGIN");
    const complaints = await db
      .collection("COMPLANITS")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json(
      { message: "Error fetching complaints" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { roomNumber } = await req.json();
    const client = await clientPromise;
    const db = client.db("LOGIN");
    const complaints = await db
      .collection("COMPLANITS")
      .find({ "room.roomNumber": roomNumber })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json(
      { message: "Error fetching complaints" },
      { status: 500 }
    );
  }
}
