import { Theme, Components } from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';
import { gray } from '@Src/theme/themePrimitives/themePrimitives';

export const MuiTabOverride: Components<Theme> = {
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '6px 8px',
        marginBottom: '8px',
        textTransform: 'none',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: 'transparent',
        ':hover': {
          color: theme.palette.text.primary,
          backgroundColor: gray[100],
          borderColor: gray[200],
        },
        [`&.${tabClasses.selected}`]: {
          color: gray[900],
        },
        ...theme.applyStyles('dark', {
          ':hover': {
            color: theme.palette.text.primary,
            backgroundColor: gray[800],
            borderColor: gray[700],
          },
          [`&.${tabClasses.selected}`]: {
            color: '#fff',
          },
        }),
      }),
    },
  },
};
