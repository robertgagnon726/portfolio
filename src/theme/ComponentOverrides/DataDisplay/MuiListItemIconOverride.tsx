import { Theme, Components } from '@mui/material/styles';

export const MuiListItemIconOverride: Components<Theme> = {
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
};
