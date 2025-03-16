import { Theme, Components } from '@mui/material/styles';

export const MuiFormLabelOverride: Components<Theme> = {
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
};
