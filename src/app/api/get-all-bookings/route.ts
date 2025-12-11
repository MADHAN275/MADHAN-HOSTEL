import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('LOGIN');
    const collection = db.collection('ROOM_ALLOCATION');

    const bookings = await collection.find({}).toArray();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 });
  }
}
