import { Theme, Components } from '@mui/material/styles';

export const MuiPaperOverride: Components<Theme> = {
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
};
