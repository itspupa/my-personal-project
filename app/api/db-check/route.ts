import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query<{ now: string }>('SELECT NOW() as now');
    return NextResponse.json({
      ok: true,
      time: res.rows[0]?.now,
    });
  } catch (error) {
    console.error('DB check failed:', error);
    return NextResponse.json(
      { ok: false, error: 'Database connection failed' },
      { status: 500 },
    );
  }
}

