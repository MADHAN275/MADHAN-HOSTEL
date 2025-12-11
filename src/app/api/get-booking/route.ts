import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { residentId } = await req.json();
    if (!residentId) {
      return NextResponse.json({ message: 'residentId is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('LOGIN');
    const collection = db.collection('ROOM_ALLOCATION');

    const booking = await collection.findOne({ residentId });

    if (booking) {
      // Find roommates
      const roommatesDocs = await collection.find({
        roomNumber: booking.roomNumber,
        roomType: booking.roomType,
        residentId: { $ne: residentId }
      }).toArray();

      const roommateIds = roommatesDocs.map(r => r.residentId);

      const usersCollection = db.collection('LOGIN_DETAILS');
      const roommatesDetails = await usersCollection.find({
        email: { $in: roommateIds }
      }).project({ name: 1, email: 1, _id: 0 }).toArray();

      return NextResponse.json({ 
        booking, 
        roommates: roommatesDetails 
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No booking found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ message: 'Error fetching booking' }, { status: 500 });
  }
}