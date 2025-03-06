import { SectionHeader } from '@Components/SectionHeader';
import { Container, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

interface SectionProps {
  sectionId: string;
  title: string;
  subtitle: string;
}

export const Section = ({ sectionId, title, subtitle, children }: PropsWithChildren<SectionProps>) => {
  return (
    <StyledContainer id={sectionId}>
      <SectionHeader title={title} subtitle={subtitle} />
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(16),
    gap: theme.spacing(6),
  },
}));
