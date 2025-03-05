'use client';

import { styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

export const Header = () => {
  return <StyledToolbar />;
};

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));
