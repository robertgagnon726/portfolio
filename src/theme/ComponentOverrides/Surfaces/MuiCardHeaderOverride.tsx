import { Theme, Components } from '@mui/material/styles';

export const MuiCardHeaderOverride: Components<Theme> = {
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
};
