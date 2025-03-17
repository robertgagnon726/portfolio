import React, { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps, Slide, SlideProps, styled } from '@mui/material';

interface InViewSlideTransitionProps {
  threshold?: number;
  triggerOnce?: boolean;
  slotProps?: {
    container?: BoxProps;
    innerContainer?: BoxProps;
  };

  transitionProps?: Omit<SlideProps, 'children'>;
}

export const InViewSlideTransition: React.FC<PropsWithChildren<InViewSlideTransitionProps>> = ({
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
      <Slide in={inView} {...transitionProps}>
        <StyledInnerContainer {...slotProps?.innerContainer}>{children}</StyledInnerContainer>
      </Slide>
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
