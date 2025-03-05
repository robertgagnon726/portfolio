import { Theme, Components } from '@mui/material/styles';

export const MuiCardActionsOverride: Components<Theme> = {
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
};
