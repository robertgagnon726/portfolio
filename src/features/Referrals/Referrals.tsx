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
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@sanity/icons';
import { InViewFadeTransition } from '@Components/InViewTransition';

const referrals = [
  {
    avatar: <Avatar alt="Ethan Horne" src="/images/ethan-horne.jpeg" />,
    name: 'Ethan Horne',
    occupation: 'Senior Product Analyst & Growth Marketer',
    paragraphs: [
      "I've had the privilege of working alongside Bobby, and I can confidently say he is one of the best teammates I have ever had. His commitment to excellence is unmatched. He takes extreme ownership of every project he touches, ensuring not just success but continuous improvement.",
      'Bobby strikes the perfect balance between working hard and keeping things fun. He is one of the most productive engineers I have worked with, yet he also brings an energy that makes collaboration enjoyable. Beyond his technical skills, Bobby genuinely cares about his work and his coworkers, always looking for ways to support the team.',
      'He is also constantly exploring new technologies to enhance efficiency and elevate our product. His curiosity and drive make him an invaluable asset to any team.',
    ],
    company: {
      name: 'Opendorse',
      url: 'https://biz.opendorse.com/',
    },
  },
  {
    avatar: <Avatar alt="Adam Rothenberger" src="/images/adam-rothenberger.jpeg" />,
    name: 'Adam Rothenberger',
    occupation: 'Software Quality Assurance Engineer',
    paragraphs: [
      'Bobby is an exceptional software engineer, and I learned a great deal from his expertise and problem-solving abilities. As the QA Engineer on his team, I often worked closely with him to troubleshoot and resolve issues.',
      'From day one, Bobby’s technical skills were evident. He not only developed complex systems but also took the time to ensure those systems were built with scalability, performance, and maintainability in mind. His attention to detail and ability to write clean, efficient code made him an invaluable asset to our team.',
      "What truly stood out about Bobby was his collaborative nature. He was always open to feedback, quick to address concerns, and incredibly patient when helping me understand the technical intricacies of the features we were testing. Bobby's ability to communicate complex technical concepts in a clear and approachable manner made him a pleasure to work with, especially when debugging or fine-tuning code.",
      'Beyond his technical acumen, Bobby’s positive attitude and professionalism were infectious. He consistently contributed to a positive team dynamic and worked tirelessly to meet deadlines while maintaining high-quality standards. His leadership and ability to mentor junior engineers were also noteworthy, as he guided the team with both technical knowledge and a supportive attitude.',
      'I have no doubt that Bobby will continue to excel in his career at Opendorse, and I would highly recommend him to anyone seeking a skilled, dependable, and innovative software engineer. It was an absolute privilege to work alongside him, and I look forward to seeing all that he accomplishes in the future.',
    ],
    company: { name: 'Innovative Systems', url: 'https://www.innovsys.com/' },
  },
  {
    avatar: <Avatar alt="Santiago Murtaugh" src="/images/santiago-murtaugh.jpeg" />,
    name: 'Santiago Murtaugh',
    occupation: 'Director of Engineering',
    paragraphs: [
      'Bobby is the rare combination of talent, hard work, and a desire to grow.',
      'He tackled hard and complex problems for our team, produced a high amount of work every single sprint without sacrificing quality, and challenged himself to grow in and out of work by learning new technologies and working on personal projects.',
      'Bobby will thrive in an environment with high expectations where he will be continuously challenged to to grow.',
    ],
    company: {
      name: 'Medalogix',
      url: 'https://medalogix.com/',
    },
  },
];

export default function Referrals() {
  const t = useTranslations('Referrals');

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
                        {isExpanded ? 'View Less' : 'View More'}
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
