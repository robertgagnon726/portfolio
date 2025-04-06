'use client';

import { Card, CardContent, Grid2, Stack, styled, Typography } from '@mui/material';
import { Section } from '@Components/Section';
import { ReactLogo } from '@Src/icons/ReactLogo';
import { NextjsLogo } from '@Src/icons/NextjsLogo';
import { NestJSLogo } from '@Src/icons/NestJSLogo';
import { TypeScriptLogo } from '@Src/icons/TypeScriptLogo';
import { ORMLogo } from '@Src/icons/ORMLogo';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { useTranslations } from 'next-intl';

export default function PreferredTechStack() {
  const t = useTranslations('PreferredTechStack');

  const techs = [
    {
      title: t('reactTitle'),
      description: t('reactDescription'),
      icon: <ReactLogo />,
    },
    {
      title: t('nextjsTitle'),
      description: t('nextjsDescription'),
      icon: <NextjsLogo />,
    },
    {
      title: t('nestjsTitle'),
      description: t('nestjsDescription'),
      icon: <NestJSLogo />,
    },
    {
      title: t('typescriptTitle'),
      description: t('typescriptDescription'),
      icon: <TypeScriptLogo />,
    },
    {
      title: t('ormTitle'),
      description: t('ormDescription'),
      icon: <ORMLogo />,
    },
    {
      title: t('cloudTitle'),
      description: t('cloudDescription'),
      icon: <CloudQueueIcon />,
    },
  ];

  return (
    <Section sectionId="preferred-tech-stack" title={t('title')} subtitle={t('subtitle')} containerGap={0}>
      <StyledContainer container spacing={2}>
        {techs.map((tech) => (
          <StyledCardContainer size={{ xs: 12, sm: 6, md: 4 }} key={tech.title}>
            <StyledCard>
              <StyledCardContent>
                <Stack direction="row" spacing={2}>
                  {tech.icon}
                  <Typography variant="h5">{tech.title}</Typography>
                </Stack>
                <StyledDescription variant="subtitle2" color="textSecondary">
                  {tech.description}
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
