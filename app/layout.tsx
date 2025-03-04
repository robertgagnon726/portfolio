import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ReduxProvider } from '@Redux/ReduxProvider';
import theme from '../src/theme';

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Bobby | Crafting SaaS, Startups, & Scalable Software',
    description:
      'Building SaaS products, scaling startups, and solving complex software challenges. Let’s turn ideas into impact with well-crafted, high-performance software.',
  };
}

/**
 * RootLayout component that sets up the main layout for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <body style={{ margin: '0px' }} suppressHydrationWarning>
            <ReduxProvider>{children}</ReduxProvider>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
