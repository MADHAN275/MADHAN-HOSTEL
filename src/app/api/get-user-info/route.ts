import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('LOGIN');
    const user = await db.collection('LOGIN_DETAILS').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return only necessary info
    return NextResponse.json({ 
      user: {
        name: user.name,
        email: user.email
      } 
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
