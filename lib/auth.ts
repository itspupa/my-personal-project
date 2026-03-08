import crypto from 'crypto';
import { cookies } from 'next/headers';
import { query } from './db';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string | null;
  created_at: string;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  username: string | null;
}

const SESSION_COOKIE = 'session_id';
const SESSION_DAYS = 7;

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  const candidate = hashPassword(password);
  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(hash));
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const res = await query<User>(
    'SELECT id, email, name, username, created_at FROM users WHERE email = $1',
    [email],
  );
  return res.rows[0] ?? null;
}

export async function findUserWithPasswordByEmail(
  email: string,
): Promise<(User & { password_hash: string }) | null> {
  const res = await query<User & { password_hash: string }>(
    'SELECT id, email, name, username, created_at, password_hash FROM users WHERE email = $1',
    [email],
  );
  return res.rows[0] ?? null;
}

export async function createUser(params: {
  email: string;
  name: string;
  username?: string | null;
  password: string;
}): Promise<User> {
  const password_hash = hashPassword(params.password);
  const res = await query<User>(
    `INSERT INTO users (email, name, username, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, username, created_at`,
    [params.email, params.name, params.username ?? null, password_hash],
  );
  return res.rows[0];
}

export async function createSession(userId: string): Promise<string> {
  const expires = new Date();
  expires.setDate(expires.getDate() + SESSION_DAYS);

  const res = await query<{ id: string }>(
    `INSERT INTO sessions (user_id, expires_at)
     VALUES ($1, $2)
     RETURNING id`,
    [userId, expires.toISOString()],
  );

  const sessionId = res.rows[0].id;

  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  });

  return sessionId;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return;

  await query('DELETE FROM sessions WHERE id = $1', [sessionId]);
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const cookieStore = cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const res = await query<User>(
    `SELECT u.id, u.email, u.name, u.username, u.created_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = $1 AND s.expires_at > NOW()`,
    [sessionId],
  );

  const user = res.rows[0];
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
  };
}

export async function requireUser(): Promise<PublicUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

