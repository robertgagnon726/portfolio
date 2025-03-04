import { styled } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface FullScreenLoaderProps {
  open: boolean;
}

/**
 * FullScreenLoader component displays a full-screen loading indicator.
 */
export function FullScreenLoader({ open }: FullScreenLoaderProps) {
  return (
    <div>
      <StyledBackdrop open={open}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
    </div>
  );
}

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}));
