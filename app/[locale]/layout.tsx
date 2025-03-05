import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ReduxProvider } from '@Redux/ReduxProvider';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@I18n/routing';
import theme from '@Src/theme';

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
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const bodyStyle = {
    margin: '0px',
  };

  return (
    <html lang={locale} className={montserrat.className}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <body style={bodyStyle} suppressHydrationWarning>
            <NextIntlClientProvider messages={messages}>
              <ReduxProvider>{children}</ReduxProvider>
            </NextIntlClientProvider>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
