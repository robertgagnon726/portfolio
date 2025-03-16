'use client';

import { Card, CardContent, Chip, Grid2, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';
import { Section } from '@Components/Section';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { getTechList } from '@Features/TechISpeak/techList';
import { useTranslations } from 'next-intl';
import { InViewFadeTransition } from '@Components/InViewTransition';

export default function TechISpeak() {
  const t = useTranslations('TechISpeak');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTechs = getTechList(t)
    .map((category) => {
      const filteredItems = category.items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
      return { ...category, items: filteredItems };
    })
    .filter(
      (category) =>
        category.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase()) || category.items.length > 0,
    );

  return (
    <Section sectionId="tech-i-speak" title={t('title')} subtitle={t('subtitle')} containerGap={0}>
      <StyledContainer
        container
        spacing={2}
        size={12}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <StyledTextField
            variant="outlined"
            placeholder="Search technologies & services..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <StyledCardsContainer container gap={2} flexWrap="wrap">
          {filteredTechs.map((tech) => (
            <StyledCardContainer size={{ xs: 12, sm: 6, md: 4 }} key={tech.categoryTitle}>
              <InViewFadeTransition threshold={0.5}>
                <StyledCard>
                  <CardContent>
                    <Stack direction="row" spacing={2} mb={2}>
                      <Typography variant="h5">{tech.categoryTitle}</Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {tech.items.map((item) => (
                        <Chip label={item} key={item} />
                      ))}
                    </Stack>
                  </CardContent>
                </StyledCard>
              </InViewFadeTransition>
            </StyledCardContainer>
          ))}
        </StyledCardsContainer>
      </StyledContainer>
    </Section>
  );
}

const StyledContainer = styled(Grid2)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
  },
}));

const StyledCardsContainer = styled(Grid2)(() => ({
  width: '100%',
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));
