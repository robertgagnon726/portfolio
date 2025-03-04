import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { level, message, stack, props } = await request.json();

  // Log server-side so Vercel captures it
  console.log('[LOG API]', { level, message, stack, props });

  return NextResponse.json({ success: true });
}
