import { Theme, Components } from '@mui/material/styles';
import { gray } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiLinearProgressOverride: Components<Theme> = {
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};
