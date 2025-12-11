import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('LOGIN');
    const residentsCollection = db.collection('LOGIN_DETAILS');

    const residents = await residentsCollection.aggregate([
      {
        $lookup: {
          from: 'ROOM_ALLOCATION',
          localField: 'email',
          foreignField: 'residentId',
          as: 'room'
        }
      },
      {
        $unwind: {
          path: '$room',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          room: {
            $cond: {
              if: { $ifNull: ['$room', false] },
              then: {
                roomType: '$room.roomType',
                roomNumber: '$room.roomNumber'
              },
              else: null
            }
          }
        }
      }
    ]).toArray();

    return NextResponse.json(residents, { status: 200 });
  } catch (error) {
    console.error('Error fetching residents:', error);
    return NextResponse.json({ message: 'Error fetching residents' }, { status: 500 });
  }
}
