import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Please define it in .env.local');
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query<T = unknown>(text: string, params?: unknown[]) {
  const res = await pool.query<T>(text, params);
  return res;
}

