import { query } from './db';

export type NotificationType = 'comment' | 'mention';

export interface RawNotification {
  id: string;
  user_id: string;
  actor_id: string;
  type: NotificationType;
  post_id: string | null;
  comment_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function createNotification(params: {
  userId: string;
  actorId: string;
  type: NotificationType;
  postId?: string;
  commentId?: string;
  message: string;
}) {
  await query(
    `INSERT INTO notifications (user_id, actor_id, type, post_id, comment_id, message)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      params.userId,
      params.actorId,
      params.type,
      params.postId ?? null,
      params.commentId ?? null,
      params.message,
    ],
  );
}

export async function getNotificationsForUser(userId: string, limit = 20) {
  const res = await query<{
    id: string;
    type: NotificationType;
    message: string;
    created_at: string;
    is_read: boolean;
    actor_name: string;
    actor_avatar: string | null;
  }>(
    `SELECT n.id,
            n.type,
            n.message,
            n.created_at,
            n.is_read,
            u.name AS actor_name,
            p.avatar_url AS actor_avatar
     FROM notifications n
     JOIN users u ON u.id = n.actor_id
     LEFT JOIN profiles p ON p.user_id = u.id
     WHERE n.user_id = $1
     ORDER BY n.created_at DESC
     LIMIT $2`,
    [userId, limit],
  );

  return res.rows;
}

export async function hasUnreadNotifications(userId: string): Promise<boolean> {
  const res = await query<{ exists: boolean }>(
    `SELECT EXISTS(
       SELECT 1 FROM notifications
       WHERE user_id = $1 AND is_read = FALSE
     ) AS exists`,
    [userId],
  );

  return res.rows[0]?.exists ?? false;
}

export async function markNotificationRead(userId: string, notificationId: string) {
  await query(
    `UPDATE notifications
     SET is_read = TRUE
     WHERE id = $1 AND user_id = $2`,
    [notificationId, userId],
  );
}

export async function markAllNotificationsRead(userId: string) {
  await query(
    `UPDATE notifications
     SET is_read = TRUE
     WHERE user_id = $1 AND is_read = FALSE`,
    [userId],
  );
}

