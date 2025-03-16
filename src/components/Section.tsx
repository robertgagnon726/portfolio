import { SectionHeader } from '@Components/SectionHeader';
import { Container, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

interface SectionProps {
  sectionId: string;
  title?: string;
  subtitle?: string;
  containerGap?: number;
  alignItems?: AlignItems;
  /** If true, extra top spacing is applied to make the first section of a page look better */
  firstOnPage?: boolean;
}

export const Section = ({
  sectionId,
  title,
  subtitle,
  children,
  containerGap,
  alignItems = 'center',
  firstOnPage = false,
}: PropsWithChildren<SectionProps>) => {
  return (
    <StyledContainer id={sectionId} firstOnPage={firstOnPage} containerGap={containerGap} alignItems={alignItems}>
      {!!title && !!subtitle && <SectionHeader title={title} subtitle={subtitle} />}
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'containerGap' && prop !== 'alignItems' && prop !== 'firstOnPage',
})<{ containerGap?: number; alignItems?: AlignItems; firstOnPage?: boolean }>(
  ({ theme, firstOnPage, containerGap, alignItems }) => ({
    paddingTop: firstOnPage ? theme.spacing(12) : theme.spacing(4),
    paddingBottom: theme.spacing(8),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    gap: containerGap !== undefined ? containerGap : theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: firstOnPage ? theme.spacing(12) : theme.spacing(12),
      paddingBottom: theme.spacing(16),
      gap: containerGap !== undefined ? containerGap : theme.spacing(6),
    },
  }),
);
