import { Theme, Components } from '@mui/material/styles';

export const MuiTabsOverride: Components<Theme> = {
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 'fit-content' },
      indicator: ({ theme }) => ({
        backgroundColor: theme.palette.grey[800],
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.grey[200],
        }),
      }),
    },
  },
};
