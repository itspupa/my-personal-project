import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getCurrentUser, requireUser } from '@/lib/auth';
import { createNotification } from '@/lib/notifications';

export async function GET(
  _req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const { postId } = params;
    const res = await query<{
      id: string;
      content: string;
      created_at: string;
      user_name: string;
    }>(
      `SELECT c.id,
              c.content,
              c.created_at,
              u.name AS user_name
       FROM comments c
       JOIN users u ON u.id = c.user_id
       WHERE c.post_id = $1
       ORDER BY c.created_at ASC`,
      [postId],
    );

    return NextResponse.json({
      success: true,
      data: res.rows.map((row) => ({
        id: row.id,
        content: row.content,
        createdAt: row.created_at,
        userName: row.user_name,
      })),
    });
  } catch (error) {
    console.error('Comments GET error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const user = await requireUser();
    const { postId } = params;
    const body = await req.json();
    const { content } = body ?? {};

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 },
      );
    }

    const res = await query<{
      id: string;
      content: string;
      created_at: string;
    }>(
      `INSERT INTO comments (user_id, post_id, content)
       VALUES ($1, $2, $3)
       RETURNING id, content, created_at`,
      [user.id, postId, content.trim()],
    );

    const row = res.rows[0];

    // สร้าง notification สำหรับคนที่ถูกแท็กด้วย @username
    const mentions = Array.from(
      new Set(
        (content.match(/@([a-zA-Z0-9_.]+)/g) || []).map((m) =>
          m.slice(1).toLowerCase(),
        ),
      ),
    );

    if (mentions.length > 0) {
      const placeholders = mentions.map((_, i) => `$${i + 1}`).join(',');
      const usersRes = await query<{ id: string; username: string }>(
        `SELECT id, username
         FROM users
         WHERE LOWER(username) IN (${placeholders})`,
        mentions,
      );

      await Promise.all(
        usersRes.rows
          .filter((u) => u.id !== user.id)
          .map((mentioned) =>
            createNotification({
              userId: mentioned.id,
              actorId: user.id,
              type: 'mention',
              postId,
              commentId: row.id,
              message: `${user.name} mentioned you in a comment`,
            }),
          ),
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: row.id,
          content: row.content,
          createdAt: row.created_at,
          userName: user.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 },
      );
    }
    console.error('Comments POST error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

