import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db('LOGIN');
    const collection = db.collection('ROOM_ALLOCATION');

    await collection.deleteMany({});

    return NextResponse.json({ message: 'All room allocations have been cleared' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing room allocations:', error);
    return NextResponse.json({ message: 'Error clearing room allocations' }, { status: 500 });
  }
}
