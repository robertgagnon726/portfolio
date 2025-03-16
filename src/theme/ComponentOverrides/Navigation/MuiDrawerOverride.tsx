import { Theme, Components } from '@mui/material/styles';

export const MuiDrawerOverride: Components<Theme> = {
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
};
