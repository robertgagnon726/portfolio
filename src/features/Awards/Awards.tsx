'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { styled } from '@mui/material';
import { useTypedTranslations } from '@I18n/useTypedTranslations';
import { LowesLogo } from '@Src/icons/LowesLogo';
import { OpendorseLogo } from '@Src/icons/OpendorseLogo';
import { CSSObject } from '@emotion/styled';
import { EmojiEvents, MilitaryTech } from '@mui/icons-material';
import { Section } from '@Components/Section';

export default function Awards() {
  const t = useTypedTranslations('Awards');

  const items = [
    {
      icon: <EmojiEvents />,
      title: t('award1Title'),
      company: 'Lowes Home Improvement',
      description: t('award1Description'),
      issuedYear: '2020',
      companyIcon: <LowesLogo sx={logoStyle} />,
      cardIcon: <ThumbUpAltRoundedIcon />,
    },
    {
      icon: <MilitaryTech />,
      title: t('award2Title'),
      company: 'Opendorse',
      description: t('award2Description'),
      issuedYear: '2023',
      companyIcon: <OpendorseLogo sx={logoStyle} />,
      cardIcon: <ThumbUpAltRoundedIcon />,
    },
    {
      icon: <MilitaryTech />,
      title: t('award3Title'),
      company: 'Opendorse',
      description: t('award3Description'),
      issuedYear: '2024',
      companyIcon: <OpendorseLogo sx={logoStyle} />,
      cardIcon: <ThumbUpAltRoundedIcon />,
    },
  ];

  return (
    <Section sectionId="awards" title={t('title')} subtitle={t('subtitle')}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <StyledStack direction="column" component={Card} spacing={1} useFlexGap>
              <StyledIconContainer>{item.icon}</StyledIconContainer>
              <Stack flex={1}>
                <Typography gutterBottom fontWeight={500}>
                  {item.title}
                </Typography>
                <StyledItemDescription variant="body2">{item.description}</StyledItemDescription>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Typography variant="body1" fontWeight={600}>
                  {item.company}
                </Typography>
                {item.companyIcon}
              </Stack>
            </StyledStack>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

const StyledStack = styled(Stack)<StackProps>(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(3),
  height: '100%',

  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[800],
    borderColor: 'hsla(220, 25%, 25%, 0.3)',
  }),
}));

const StyledIconContainer = styled(Box)(() => ({
  opacity: '50%',
}));

const StyledItemDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}));

const logoStyle: CSSObject = {
  height: 32,
  width: 'auto',
  opacity: 0.3,
};
