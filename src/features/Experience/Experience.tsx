'use client';

import Stack from '@mui/material/Stack';
import { Box, Card, CardContent, Chip, Divider, styled, Typography } from '@mui/material';
import { useTypedTranslations } from '@I18n/useTypedTranslations';
import { Section } from '@Components/Section';
import { CompanyHighlights } from '@Features/Experience/CompanyHighlights';
import { CompanyPromotions } from '@Features/Experience/CompanyPromotions';
import { MultiChips } from '@Components/MultiChips/MultiChips';
import { getExperienceTimeline } from '@Features/Experience/timeline';
import { useMemo } from 'react';

export default function Experience() {
  const t = useTypedTranslations('Experience');

  const timelineItems = useMemo(() => getExperienceTimeline(t), [t]);

  return (
    <Section sectionId="experience" title={t('title')} subtitle={t('subtitle')} containerGap={0}>
      <StyledContainer>
        {timelineItems.map((item, index) => {
          return (
            <Box key={`${item.currentPosition}-${item.company}`} width={'100%'} justifyContent="center">
              <Stack alignItems="center">
                <StyledChip label={item.timeframe} />
                <StyledDivider orientation="vertical" />
                <StyledCard>
                  <StyledCardContent>
                    <Stack direction="row" justifyContent={'space-between'}>
                      <Stack direction="row" alignItems="center" flexGrow={1} gap={2}>
                        <StyledIconCard>{item.compnanyIcon}</StyledIconCard>
                        <Stack>
                          <Typography variant="h5">{item.currentPosition}</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            {item.company}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        {item.tags.map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </Stack>
                    </Stack>
                    <CompanyPromotions promotions={item.promotions} />
                    <MultiChips labels={item.technologies} />
                    <CompanyHighlights highlights={item.highlights} />
                  </StyledCardContent>
                </StyledCard>
                {index < timelineItems.length - 1 && <StyledTopTimelineDivider orientation="vertical" />}
              </Stack>
            </Box>
          );
        })}
      </StyledContainer>
    </Section>
  );
}

const StyledTopTimelineDivider = styled(Divider)(({ theme }) => ({
  height: theme.spacing(3),
  borderRightWidth: '2px',
  [theme.breakpoints.up('sm')]: {
    height: theme.spacing(6),
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderRightWidth: '2px',
  height: theme.spacing(3),
}));

const StyledCard = styled(Card)(() => ({
  width: '100%',
}));

const StyledIconCard = styled(Card)(() => ({
  borderRadius: `6px`,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  padding: theme.spacing(2),
}));
