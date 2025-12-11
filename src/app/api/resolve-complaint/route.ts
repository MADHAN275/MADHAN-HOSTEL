import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("complaints")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: "resolved" } });

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: "Complaint resolved" });
    } else {
      return NextResponse.json(
        { message: "Complaint not found or already resolved" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error resolving complaint:", error);
    return NextResponse.json(
      { message: "Error resolving complaint" },
      { status: 500 }
    );
  }
}
