import { Theme, Components } from '@mui/material/styles';
import { brand } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiSvgIconOverride: Components<Theme> = {
  MuiSvgIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        fill: theme.palette.mode === 'dark' ? brand[400] : brand[600],
      }),
    },
  },
};
