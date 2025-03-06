'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { styled } from '@mui/material';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import { useTypedTranslations } from '@I18n/useTypedTranslations';
import { Section } from '@Components/Section';

export default function EngineeringPhilosophy() {
  const t = useTypedTranslations('EngineeringPhilosophy');

  const items = [
    {
      icon: <VolunteerActivismRoundedIcon />,
      title: t('radicalEmpathyTitle'),
      description: t('radicalEmpathyDescription'),
    },
    {
      icon: <EngineeringRoundedIcon />,
      title: t('developerExperienceTitle'),
      description: t('developerExperienceDescription'),
    },
    {
      icon: <HandshakeRoundedIcon />,
      title: t('ownershipWithGenerosityTitle'),
      description: t('ownershipWithGenerosityDescription'),
    },
    {
      icon: <SchemaRoundedIcon />,
      title: t('technicalForesightTitle'),
      description: t('technicalForesightDescription'),
    },
    {
      icon: <PrecisionManufacturingRoundedIcon />,
      title: t('relentlessAutomationTitle'),
      description: t('relentlessAutomationDescription'),
    },
    {
      icon: <RecordVoiceOverRoundedIcon />,
      title: t('transparentCommunicationTitle'),
      description: t('transparentCommunicationDescription'),
    },
    {
      icon: <Diversity3RoundedIcon />,
      title: t('mentorshipTitle'),
      description: t('mentorshipDescription'),
    },
    {
      icon: <ThumbUpAltRoundedIcon />,
      title: t('kindnessTitle'),
      description: t('kindnessDescription'),
    },
  ];

  return (
    <Section sectionId="philosophy" title={t('title')} subtitle={t('subtitle')}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <StyledStack direction="column" component={Card} spacing={1} useFlexGap>
              <StyledIconContainer>{item.icon}</StyledIconContainer>
              <div>
                <Typography gutterBottom fontWeight={500}>
                  {item.title}
                </Typography>
                <StyledItemDescription variant="body2">{item.description}</StyledItemDescription>
              </div>
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
