'use client';

import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { AlertProvider } from '@Components/Alert';
import { Header } from '@Connected-components/Layout/Header';
import { PropsWithChildren, useEffect } from 'react';
import { Box } from '@mui/material';
import { Logger } from '../../observability/Logger';

/**
 * Layout component renders the main layout of the application to be used across multiple routes in the routing layer.
 */
export function Layout({ children }: PropsWithChildren) {
  // TODO BG - remove these validations when done
  useEffect(() => {
    Logger.info('Layout rendered');
    Logger.debug('Layout rendered with children', { children });
    Logger.warn('Layout rendered with children', { children });
    try {
      throw new Error('Layout error');
    } catch (error) {
      Logger.error(error, 'Layout error');
    }
  }, []);

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
