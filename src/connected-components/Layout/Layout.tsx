'use client';

import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { AlertProvider } from '@Components/Alert';
import { Header } from '@Connected-components/Layout/Header';
import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

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
  marginTop: theme.spacing(8),
}));
