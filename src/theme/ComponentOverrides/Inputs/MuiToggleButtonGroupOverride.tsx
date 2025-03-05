import { alpha, Theme, Components } from '@mui/material/styles';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { brand, gray } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiToggleButtonGroupOverride: Components<Theme> = {
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },
};
