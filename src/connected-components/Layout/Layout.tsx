'use client';

import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { AlertProvider } from '@Components/Alert';
import { Header } from '@Connected-components/Layout/Header';
import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

// TODO BG - create a custom eslint rule to enforce that styled components start with `Styled`
// TODO BG - create a custom eslint that enforce styled components use the callback notation
// TODO BG - create a custom eslint rule to prevent usage of the sx prop inline
// TODO BG - add eslint rule to limit lines per file
// TODO BG - add husky to enforce linting, compile, and tests on commit
// TODO BG - setup CICD with something other than ADO as this will be a public repo
// TODO BG - add eslint rule to prevent usage of the style prop
// TODO BG - remove all dead code
// TODO BG - add eslint rule to prevent todo comments. They should be added to the PM system

// TODO BG - features to add: dark mode toggle, fullscreen mode, language switcher, a11y features, and theme switcher

/**
 * Layout component renders the main layout of the application to be used across multiple routes in the routing layer.
 */
export function Layout({ children }: PropsWithChildren) {
  return (
    <AlertProvider>
      <StyledAppBarContainer>
        <AppBar position="fixed">
          <Header />
        </AppBar>
        <StyledMain>{children}</StyledMain>
      </StyledAppBarContainer>
    </AlertProvider>
  );
}

const StyledAppBarContainer = styled(Box)(() => ({
  display: 'flex',
}));

const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[200],
}));
