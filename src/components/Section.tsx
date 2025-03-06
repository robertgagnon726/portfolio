import { SectionHeader } from '@Components/SectionHeader';
import { Container, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

interface SectionProps {
  sectionId: string;
  title: string;
  subtitle: string;
  containerGap?: number;
}

export const Section = ({ sectionId, title, subtitle, children, containerGap }: PropsWithChildren<SectionProps>) => {
  return (
    <StyledContainer id={sectionId} containerGap={containerGap}>
      <SectionHeader title={title} subtitle={subtitle} />
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'containerGap',
})<{ containerGap?: number }>(({ theme, containerGap }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: containerGap !== undefined ? containerGap : theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(16),
    gap: containerGap !== undefined ? containerGap : theme.spacing(6),
  },
}));
