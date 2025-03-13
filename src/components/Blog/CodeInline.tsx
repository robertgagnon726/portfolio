import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const StyledCodeInline = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  color: theme.palette.mode === 'light' ? green[800] : green[400],
  padding: theme.spacing(0, 0.5),
  borderRadius: 6,
  fontFamily: theme.typography.fontFamily,
}));
