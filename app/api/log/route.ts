import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { level, message, stack, props } = await request.json();

  switch (level) {
    case 'warn':
      console.warn('[LOG API]', { level, message, stack, props });
      break;
    case 'error':
      console.error('[LOG API]', { level, message, stack, props });
      break;
    case 'debug':
      // Vercel captures console.debug too, but it merges with "Info" logs in UI
      console.debug('[LOG API]', { level, message, stack, props });
      break;
    default:
      // info or anything else
      console.log('[LOG API]', { level, message, stack, props });
      break;
  }

  return NextResponse.json({ success: true });
}
