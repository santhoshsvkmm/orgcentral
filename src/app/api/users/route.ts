import { NextResponse } from 'next/server';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Basic in-memory storage for users
const users: User[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser = await request.json();

  // Generate a unique ID (basic timestamp + random number)
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const userWithId = { ...newUser, id };
  users.push(userWithId);

  return NextResponse.json(userWithId, { status: 201 });
}