import { Theme, Components } from '@mui/material/styles';

export const MuiAccordionDetailsOverride: Components<Theme> = {
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: 'none' },
    },
  },
};
