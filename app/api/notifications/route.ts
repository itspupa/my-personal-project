import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import {
  getNotificationsForUser,
  hasUnreadNotifications,
  markAllNotificationsRead,
} from '@/lib/notifications';

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const url = new URL(req.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 20, 50) : 20;

    const [items, unread] = await Promise.all([
      getNotificationsForUser(user.id, limit),
      hasUnreadNotifications(user.id),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        hasUnread: unread,
        items: items.map((n) => ({
          id: n.id,
          name: n.actor_name,
          avatar:
            n.actor_avatar ??
            'https://api.dicebear.com/9.x/identicon/svg?seed=' + encodeURIComponent(n.actor_name),
          message: n.message,
          timestamp: n.created_at,
          isRead: n.is_read,
        })),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 },
      );
    }
    console.error('Notifications GET error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const { action } = body ?? {};

    if (action === 'mark_all_read') {
      await markAllNotificationsRead(user.id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 },
      );
    }
    console.error('Notifications POST error', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

