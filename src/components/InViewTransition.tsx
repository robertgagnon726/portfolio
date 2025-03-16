import React, { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps, Fade, FadeProps, styled } from '@mui/material';

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
  const { ref, inView } = useInView({
    threshold,
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
