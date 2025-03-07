'use client';

import { Card, CardContent, Grid2, Stack, styled, Typography } from '@mui/material';
import { useTypedTranslations } from '@I18n/useTypedTranslations';
import { Section } from '@Components/Section';
import { GamesOutlined, GolfCourse, Movie, Pool, RvHookup, TheaterComedy } from '@mui/icons-material';

export default function PersonalInterests() {
  const t = useTypedTranslations('PersonalInterests');

  const interests = [
    {
      title: t('gamingTitle'),
      description: t('gamingDescription'),
      icon: <GamesOutlined />,
    },
    {
      title: t('golfTitle'),
      description: t('golfDescription'),
      icon: <GolfCourse />,
    },
    {
      title: t('poolPartiesTitle'),
      description: t('poolPartiesDescription'),
      icon: <Pool />,
    },
    {
      title: t('roadTripsTitle'),
      description: t('roadTripsDescription'),
      icon: <RvHookup />,
    },
    {
      title: t('comedyTitle'),
      description: t('comedyDescription'),
      icon: <TheaterComedy />,
    },
    {
      title: t('cinemaAndTVTitle'),
      description: t('cinemaAndTVDescription'),
      icon: <Movie />,
    },
  ];

  return (
    <Section sectionId="experience" title={t('title')} subtitle={t('subtitle')} containerGap={0}>
      <StyledContainer container spacing={2}>
        {interests.map((interest) => (
          <StyledCardContainer size={{ xs: 12, sm: 6, md: 4 }} key={interest.title}>
            <StyledCard>
              <StyledCardContent>
                <Stack direction="row" spacing={2}>
                  {interest.icon}
                  <Typography variant="h5">{interest.title}</Typography>
                </Stack>
                <StyledDescription variant="subtitle2" color="textSecondary">
                  {interest.description}
                </StyledDescription>
              </StyledCardContent>
            </StyledCard>
          </StyledCardContainer>
        ))}
      </StyledContainer>
    </Section>
  );
}

const StyledContainer = styled(Grid2)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  width: '100%',
  display: 'flex',

  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
  },
}));

const StyledCardContainer = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const StyledCardContent = styled(CardContent)(() => ({
  flexGrow: 1,
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
