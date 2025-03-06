'use client';

import Stack from '@mui/material/Stack';
import { Box, Divider, styled, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export interface Promotion {
  title: string;
  year: string;
  highlights: string;
}

interface CompanyPromotionsProps {
  promotions: Promotion[];
}

export const CompanyPromotions = ({ promotions }: CompanyPromotionsProps) => {
  return (
    <>
      {promotions.map((promotion) => (
        <StyledContainer key={promotion.title}>
          <StyledDivider orientation="vertical" flexItem />
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center">
              <ArrowUpwardIcon />

              <Typography variant="h6">{`Promoted to ${promotion.title} (${promotion.year})`}</Typography>
            </Stack>
            <StyledPromotionText variant="subtitle2" color="textSecondary">
              {promotion.highlights}
            </StyledPromotionText>
          </Stack>
        </StyledContainer>
      ))}
    </>
  );
};

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  gap: theme.spacing(1),
}));

const StyledDivider = styled(Divider)(() => ({
  borderRightWidth: '2px',
}));

const StyledPromotionText = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(0.5),
}));
