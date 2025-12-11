import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();
    const client = await clientPromise;

    if (role === 'admin') {
      const db = client.db('LOGIN');
      const admin = await db.collection('admins').findOne({ email });
      if (admin && (await bcrypt.compare(password, admin.password))) {
        return NextResponse.json({ message: 'Admin login successful' });
      } else {
        return NextResponse.json(
          { message: 'Invalid admin credentials' },
          { status: 401 }
        );
      }
    } else if (role === 'resident') {
      const db = client.db('LOGIN');
      const resident = await db.collection('LOGIN_DETAILS').findOne({ email });
      if (resident && (await bcrypt.compare(password, resident.password))) {
        return NextResponse.json({ message: 'Resident login successful' });
      } else {
        return NextResponse.json(
          { message: 'Invalid resident credentials' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
