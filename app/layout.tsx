import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline, GlobalStyles, StyledEngineProvider } from '@mui/material';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { ReduxProvider } from '@Redux/ReduxProvider';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Theme from '@Src/theme/Theme';
import { Interpolation, type Theme as MuiTheme } from '@mui/material';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Bobby | Crafting SaaS, Startups, & Scalable Software',
    description:
      "Building SaaS products, scaling startups, and solving complex software challenges. Let's turn ideas into impact with well-crafted, high-performance software.",
    icons: {
      icon: '/favicon.svg',
    },
    openGraph: {
      title: 'Bobby | Crafting SaaS, Startups, & Scalable Software',
      description:
        "Building SaaS products, scaling startups, and solving complex software challenges. Let's turn ideas into impact with well-crafted, high-performance software.",
      url: 'https://bobbygagnon.com',
      type: 'website',
      images: [
        {
          url: 'https://bobbygagnon.com/images/portfolio-preview-1200x630.png',
          width: 1200,
          height: 630,
          alt: "Preview image of Bobby's SaaS and software expertise",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bobby | Crafting SaaS, Startups, & Scalable Software',
      description:
        "Building SaaS products, scaling startups, and solving complex software challenges. Let's turn ideas into impact with well-crafted, high-performance software.",
      images: ['https://bobbygagnon.com/images/portfolio-preview.png'],
    },
  };
}

/**
 * RootLayout component that sets up the main layout for the application.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
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
