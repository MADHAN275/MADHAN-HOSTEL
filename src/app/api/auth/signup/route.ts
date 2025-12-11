import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { name, age, email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db('LOGIN');

    const existingResident = await db.collection('LOGIN_DETAILS').findOne({ email });
    if (existingResident) {
      return NextResponse.json(
        { message: 'Resident with this email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('LOGIN_DETAILS').insertOne({
      name,
      age,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Resident created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
