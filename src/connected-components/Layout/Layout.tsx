'use client';

import { AlertProvider } from '@Components/Alert';
import { PropsWithChildren } from 'react';
import BGAppBar from '@Components/BGAppBar';

/**
 * Layout component renders the main layout of the application to be used across multiple routes in the routing layer.
 */
export function Layout({ children }: PropsWithChildren) {
  return (
    <AlertProvider>
      <BGAppBar />
      {children}
    </AlertProvider>
  );
}
