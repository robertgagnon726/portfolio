import { Theme, Components } from '@mui/material/styles';

export const MuiPaginationItemOverride: Components<Theme> = {
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: theme.palette.grey[900],
        },
        ...theme.applyStyles('dark', {
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: theme.palette.grey[50],
          },
        }),
      }),
    },
  },
};
