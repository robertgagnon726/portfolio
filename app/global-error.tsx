'use client';

import NextError from 'next/error';
import { useEffect } from 'react';
import { Logger } from '../src/observability/Logger';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Logger.error(error, 'Global error');
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
