import { Theme, Components } from '@mui/material/styles';
import { gray } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiAccordionSummaryOverride: Components<Theme> = {
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        borderRadius: 8,
        '&:hover': { backgroundColor: gray[50] },
        '&:focus-visible': { backgroundColor: 'transparent' },
        ...theme.applyStyles('dark', {
          '&:hover': { backgroundColor: gray[800] },
        }),
      }),
    },
  },
};
