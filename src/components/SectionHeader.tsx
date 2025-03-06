import { Box, styled, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <StyledTitleContainer>
      <Typography component="h2" variant="h4" gutterBottom>
        {title}
      </Typography>
      <StyledSubtitle variant="body1">{subtitle}</StyledSubtitle>
    </StyledTitleContainer>
  );
};

const StyledTitleContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',

  [theme.breakpoints.up('md')]: {
    width: '60%',
    textAlign: 'center',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}));
