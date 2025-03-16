'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { typography } from '@Src/theme/themePrimitives/typography';
import { colorSchemes } from '@Src/theme/themePrimitives/colorSchemes';
import shadows from '@mui/material/styles/shadows';
import { shape } from '@Src/theme/themePrimitives/themePrimitives';
import { DataDisplayComponents } from '@Src/theme/ComponentOverrides/DataDisplay';
import { FeedbackComponents } from '@Src/theme/ComponentOverrides/Feedback';
import { InputsComponents } from '@Src/theme/ComponentOverrides/Inputs';
import { NavigationComponents } from '@Src/theme/ComponentOverrides/Navigation';
import { SurfacesComponents } from '@Src/theme/ComponentOverrides/Surfaces';
import { Fragment, ReactNode, useMemo } from 'react';

interface ThemeProps {
  children: ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function Theme(props: ThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          components: {
            ...DataDisplayComponents,
            ...FeedbackComponents,
            ...InputsComponents,
            ...NavigationComponents,
            ...SurfacesComponents,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <Fragment>{children}</Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
