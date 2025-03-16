import { Theme, Components } from '@mui/material/styles';

export const MuiIconOverride: Components<Theme> = {
  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: () => ({
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      }),
    },
  },
};
