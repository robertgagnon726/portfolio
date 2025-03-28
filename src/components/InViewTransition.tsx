import React, { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps, Fade, FadeProps, styled, useMediaQuery, useTheme } from '@mui/material';

interface InViewFadeTransitionProps {
  threshold?: number;
  triggerOnce?: boolean;
  slotProps?: {
    container?: BoxProps;
    innerContainer?: BoxProps;
  };

  transitionProps?: Omit<FadeProps, 'children'>;
}

export const InViewFadeTransition: React.FC<PropsWithChildren<InViewFadeTransitionProps>> = ({
  children,
  threshold = 0.2,
  triggerOnce = true,
  transitionProps,
  slotProps,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const adjustedThreshold = isMobile && threshold > 0.2 ? threshold / 2 : threshold;

  const { ref, inView } = useInView({
    threshold: adjustedThreshold,
    triggerOnce,
  });

  return (
    <StyledContainer ref={ref} {...slotProps?.container}>
      <Fade in={inView} {...transitionProps}>
        <StyledInnerContainer {...slotProps?.innerContainer}>{children}</StyledInnerContainer>
      </Fade>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexGrow: 1,
}));

const StyledInnerContainer = styled(Box)(() => ({
  display: 'flex',
}));
