import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline, GlobalStyles, StyledEngineProvider } from '@mui/material';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ReduxProvider } from '@Redux/ReduxProvider';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@I18n/routing';
import Theme from '@Src/theme/Theme';
import { Interpolation, type Theme as MuiTheme } from '@mui/material';

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
    <html lang={locale}>
      <AppRouterCacheProvider>
        <StyledEngineProvider injectFirst>
          <Theme>
            <GlobalStyles styles={globalStyles} />
            <CssBaseline enableColorScheme />
            <body style={bodyStyle} suppressHydrationWarning>
              <NextIntlClientProvider messages={messages}>
                <ReduxProvider>{children}</ReduxProvider>
              </NextIntlClientProvider>
            </body>
          </Theme>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </html>
  );
}

const globalStyles: Interpolation<MuiTheme> = {
  html: {
    scrollBehavior: 'smooth',
  },
};
