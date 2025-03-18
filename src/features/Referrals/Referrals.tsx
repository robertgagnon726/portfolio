'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Button, Collapse, Divider, Link, Stack, styled } from '@mui/material';
import { Section } from '@Components/Section';
import { useTranslations } from 'next-intl';
import { v4 } from 'uuid';
import { useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@sanity/icons';
import { InViewFadeTransition } from '@Components/InViewTransition';
import { UseTranslations } from '@I18n/useTypedTranslations';

export const getReferrals = (t: UseTranslations<'Referrals'>) => [
  {
    avatar: <Avatar alt="Ethan Horne" src="/images/ethan-horne.jpeg" />,
    name: 'Ethan Horne',
    occupation: t('ethanTitle'),
    paragraphs: [t('ethanReferral1'), t('ethanReferral2'), t('ethanReferral3')],
    company: {
      name: 'Opendorse',
      url: 'https://biz.opendorse.com/',
    },
  },
  {
    avatar: <Avatar alt="Adam Rothenberger" src="/images/adam-rothenberger.jpeg" />,
    name: 'Adam Rothenberger',
    occupation: t('adamTitle'),
    paragraphs: [t('adamReferral1'), t('adamReferral2'), t('adamReferral3'), t('adamReferral4'), t('adamReferral5')],
    company: { name: 'Innovative Systems', url: 'https://www.innovsys.com/' },
  },
  {
    avatar: <Avatar alt="Santiago Murtaugh" src="/images/santiago-murtaugh.jpeg" />,
    name: 'Santiago Murtaugh',
    occupation: t('santiTitle'),
    paragraphs: [t('santiReferral1'), t('santiReferral2'), t('santiReferral3')],
    company: {
      name: 'Medalogix',
      url: 'https://medalogix.com/',
    },
  },
  {
    avatar: <Avatar alt="Steve Zinn" src="/images/steve-zinn.jpeg" />,
    name: 'Steve Zinn',
    occupation: t('steveTitle'),
    paragraphs: [t('steveReferral1'), t('steveReferral2'), t('steveReferral3')],
    company: {
      name: 'Hudl',
      url: 'https://www.hudl.com/',
    },
  },
];

export default function Referrals() {
  const t = useTranslations('Referrals');
  const tComponents = useTranslations('Components');

  const referrals = useMemo(() => getReferrals(t), [t]);

  const [expandedStates, setExpandedStates] = useState(referrals.map(() => false));

  const toggleExpand = (index: number) => {
    setExpandedStates((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <Section sectionId="referrals" title={t('title')} subtitle={t('subtitle')}>
      <Grid container spacing={2}>
        {referrals.map((referral, index) => {
          const isExpanded = expandedStates[index];
          const firstParagraphs = referral.paragraphs.slice(0, 2);
          const collapsibleParagraphs = referral.paragraphs.slice(2);

          return (
            <StyledGrid size={{ xs: 12, sm: 6 }} key={index}>
              <InViewFadeTransition>
                <StyledCard variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      {firstParagraphs.map((paragraph) => (
                        <Typography key={v4()} variant="body1" gutterBottom color="textSecondary">
                          {paragraph}
                        </Typography>
                      ))}
                    </Stack>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <StyledCollapseContainer spacing={2}>
                        {collapsibleParagraphs.map((paragraph) => (
                          <Typography key={v4()} variant="body1" gutterBottom color="textSecondary">
                            {paragraph}
                          </Typography>
                        ))}
                      </StyledCollapseContainer>
                    </Collapse>
                    {referral.paragraphs.length > 2 && (
                      <StyledExpandButton
                        onClick={() => toggleExpand(index)}
                        variant="text"
                        size="small"
                        endIcon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      >
                        {isExpanded ? tComponents('viewLess') : tComponents('viewMore')}
                      </StyledExpandButton>
                    )}
                  </CardContent>
                  <Stack spacing={2}>
                    <Divider />
                    <StyledCardHeaderContainer>
                      <CardHeader avatar={referral.avatar} title={referral.name} subheader={referral.occupation} />
                      <Link href={referral.company.url} target="_blank" rel="noopener noreferrer" underline="none">
                        <Typography variant="body1" gutterBottom color="textSecondary">
                          {referral.company.name}
                        </Typography>
                      </Link>
                    </StyledCardHeaderContainer>
                  </Stack>
                </StyledCard>
              </InViewFadeTransition>
            </StyledGrid>
          );
        })}
      </Grid>
    </Section>
  );
}

const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
}));

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
}));

const StyledCardHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledCollapseContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const StyledExpandButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(0),
  '&:hover': {
    backgroundColor: 'initial',
  },
}));
