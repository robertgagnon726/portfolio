import { Theme, Components } from '@mui/material/styles';

export const MuiInputAdornmentOverride: Components<Theme> = {
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.grey[500],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[400],
        }),
      }),
    },
  },
};
