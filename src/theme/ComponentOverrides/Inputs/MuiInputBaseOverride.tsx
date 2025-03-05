import { Theme, Components } from '@mui/material/styles';
import { gray } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiInputBaseOverride: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
          opacity: 0.7,
          color: gray[500],
        },
      },
    },
  },
};
