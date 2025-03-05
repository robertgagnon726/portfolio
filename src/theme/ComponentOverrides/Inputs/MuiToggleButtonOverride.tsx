import { Theme, Components } from '@mui/material/styles';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { brand, gray } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiToggleButtonOverride: Components<Theme> = {
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        ...theme.applyStyles('dark', {
          color: gray[400],
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
        }),
      }),
    },
  },
};
