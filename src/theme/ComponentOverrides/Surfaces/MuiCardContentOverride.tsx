import { Theme, Components } from '@mui/material/styles';

export const MuiCardContentOverride: Components<Theme> = {
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        '&:last-child': { paddingBottom: 0 },
      },
    },
  },
};
