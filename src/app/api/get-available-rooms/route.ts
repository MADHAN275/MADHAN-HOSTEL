import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const allRooms = {
  single: Array.from({ length: 15 }, (_, i) => `1${(i + 1).toString().padStart(2, '0')}`),
  double: Array.from({ length: 10 }, (_, i) => `2${(i + 1).toString().padStart(2, '0')}`),
  four: Array.from({ length: 15 }, (_, i) => `3${(i + 1).toString().padStart(2, '0')}`),
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('LOGIN');
    const collection = db.collection('ROOM_ALLOCATION');

    const bookings = await collection.find({}).toArray();
    
    // Count bookings for each room
    const roomCounts: { [key: string]: number } = {};
    bookings.forEach((booking) => {
      const roomNum = booking.roomNumber;
      if (roomNum) {
        roomCounts[roomNum] = (roomCounts[roomNum] || 0) + 1;
      }
    });

    const availableRooms = {
      single: allRooms.single.filter((room) => (roomCounts[room] || 0) < 1),
      double: allRooms.double.filter((room) => (roomCounts[room] || 0) < 2),
      four: allRooms.four.filter((room) => (roomCounts[room] || 0) < 4),
    };

    return NextResponse.json({ availableRooms }, { status: 200 });
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    return NextResponse.json({ message: 'Error fetching available rooms' }, { status: 500 });
  }
}