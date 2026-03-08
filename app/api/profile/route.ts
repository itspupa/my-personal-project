import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await requireUser();

    const avatarResult = await query<{ avatar_url: string | null }>(
      'SELECT avatar_url FROM profiles WHERE user_id = $1',
      [user.id],
    );

    const avatar = avatarResult.rows[0]?.avatar_url ?? null;

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        avatar,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 },
      );
    }
    console.error('Profile GET error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { name, username, avatar } = body ?? {};

    if (!name && !username && typeof avatar === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Nothing to update' },
        { status: 400 },
      );
    }

    if (username) {
      const check = await query(
        'SELECT 1 FROM users WHERE username = $1 AND id <> $2 LIMIT 1',
        [username, user.id],
      );
      if (check.rowCount && check.rowCount > 0) {
        return NextResponse.json(
          { success: false, error: 'Username already taken' },
          { status: 409 },
        );
      }
    }

    const userRes = await query(
      `UPDATE users
       SET name = COALESCE($1, name),
           username = COALESCE($2, username)
       WHERE id = $3
       RETURNING id, email, name, username`,
      [name ?? null, username ?? null, user.id],
    );

    const updatedUser = userRes.rows[0];

    let finalAvatar: string | null = null;

    if (typeof avatar !== 'undefined') {
      const avatarText = avatar === null ? null : String(avatar);

      await query(
        `INSERT INTO profiles (user_id, avatar_url)
         VALUES ($1, $2)
         ON CONFLICT (user_id)
         DO UPDATE SET avatar_url = EXCLUDED.avatar_url, updated_at = NOW()`,
        [updatedUser.id, avatarText],
      );

      finalAvatar = avatarText;
    } else {
      const avatarResult = await query<{ avatar_url: string | null }>(
        'SELECT avatar_url FROM profiles WHERE user_id = $1',
        [updatedUser.id],
      );
      finalAvatar = avatarResult.rows[0]?.avatar_url ?? null;
    }

    return NextResponse.json({
      success: true,
      data: {
        ...updatedUser,
        avatar: finalAvatar,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 },
      );
    }
    console.error('Profile PUT error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}


