import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createUser, findUserByEmail, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, username } = body ?? {};

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password and name are required' },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 },
      );
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 },
      );
    }

    if (username) {
      const usernameCheck = await query(
        'SELECT 1 FROM users WHERE username = $1 LIMIT 1',
        [username],
      );
      if (usernameCheck.rowCount && usernameCheck.rowCount > 0) {
        return NextResponse.json(
          { success: false, error: 'Username already taken' },
          { status: 409 },
        );
      }
    }

    const user = await createUser({ email, password, name, username });
    await createSession(user.id);

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Register error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

