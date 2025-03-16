import { Theme, Components } from '@mui/material/styles';

export const MuiStepConnectorOverride: Components<Theme> = {
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        flex: 1,
        borderRadius: '99px',
      }),
    },
  },
};
