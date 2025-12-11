import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { residentId, roomType, roomNumber } = await req.json();
    const client = await clientPromise;
    const db = client.db('LOGIN');
    const roomAllocationCollection = db.collection('ROOM_ALLOCATION');
    const residentsCollection = db.collection('LOGIN_DETAILS');

    // Check if the resident has already booked a room
    const existingBooking = await roomAllocationCollection.findOne({ residentId });
    if (existingBooking) {
      return NextResponse.json({ message: 'You have already booked a room' }, { status: 400 });
    }

    // Get resident's name
    const resident = await residentsCollection.findOne({ email: residentId });
    if (!resident) {
      return NextResponse.json({ message: 'Resident not found' }, { status: 404 });
    }
    const { name } = resident;

    // Check if the room is full
    const currentOccupancy = await roomAllocationCollection.countDocuments({ roomNumber });
    let capacity = 0;
    if (roomType === 'single') capacity = 1;
    else if (roomType === 'double') capacity = 2;
    else if (roomType === 'four') capacity = 4;

    if (capacity > 0 && currentOccupancy >= capacity) {
      return NextResponse.json({ message: 'Room is full' }, { status: 400 });
    }

    // Create the new booking
    await roomAllocationCollection.insertOne({
      residentId,
      name,
      roomType,
      roomNumber,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Room booked successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error booking room:', error);
    return NextResponse.json({ message: 'Error booking room' }, { status: 500 });
  }
}
