'use client';

import { Box, Card, CardContent, CardMedia, Chip, Grid2, styled, Tab, Tabs, Typography } from '@mui/material';
import { Section } from '@Components/Section';
import { useTranslations } from 'next-intl';
import { ReactNode, SyntheticEvent, useMemo, useState } from 'react';
import { InViewFadeTransition } from '@Components/InViewTransition';
import { v4 } from 'uuid';
import { Project, getProjects } from '@Features/Projects/projectsData';
import { AnimatePresence, motion } from 'framer-motion';
import { MediaCarousel } from '@Components/MediaCarousel/MediaCarousel';

export default function Projects() {
  const t = useTranslations('Projects');

  const projects = useMemo(() => getProjects(t), [t]);

  const [value, setValue] = useState(0);
  const [openImages, setOpenImages] = useState<string[]>([]);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleMediaOpen = (imgUrls: string[]) => {
    setOpenImages(imgUrls);
  };

  const handleMediaClose = () => {
    setOpenImages([]);
  };

  return (
    <Section sectionId="projects" title={t('title')} subtitle={t('subtitle')}>
      <StyledContainer container spacing={2}>
        <InViewFadeTransition
          slotProps={{
            container: { width: '100%', display: 'flex' },
            innerContainer: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
          }}
          transitionProps={{ timeout: 500 }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Passion Projects" />
            <Tab label="Open Source" />
            <Tab label="Revenue Projects" />
            <Tab label="Company Projects" />
          </Tabs>
          <AnimatePresence mode="wait">
            {value === 0 && (
              <TabPanel
                key="tab0"
                index={0}
                value={value}
                projects={projects.passionProjects}
                handleMediaOpen={handleMediaOpen}
              />
            )}

            {value === 1 && (
              <TabPanel
                key="tab1"
                index={1}
                value={value}
                projects={projects.openSourceProjects}
                handleMediaOpen={handleMediaOpen}
              />
            )}

            {value === 2 && (
              <TabPanel
                key="tab2"
                index={2}
                value={value}
                projects={projects.revenueProjects}
                handleMediaOpen={handleMediaOpen}
              />
            )}

            {value === 3 && (
              <TabPanel
                key="tab3"
                index={3}
                value={value}
                projects={projects.companyProjects}
                handleMediaOpen={handleMediaOpen}
              />
            )}
          </AnimatePresence>
        </InViewFadeTransition>
      </StyledContainer>
      <MediaCarousel mediaUrls={openImages} handleClose={handleMediaClose} />
    </Section>
  );
}

interface TabPanelProps {
  handleMediaOpen: (mediaUrls: string[]) => void;
  children?: ReactNode;
  index: number;
  value: number;
  projects: Project[];
}

function TabPanel(props: TabPanelProps) {
  const { projects, handleMediaOpen } = props;

  return (
    <StyledTabPanel
      role="tabpanel"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <StyledPanelContainer>
        <Grid2 container spacing={2}>
          {projects.map((project) => (
            <Grid2 key={v4()} size={{ xs: 12, sm: 6, md: 4 }} display="flex">
              <ProjectCard project={project} handleMediaOpen={handleMediaOpen} />
            </Grid2>
          ))}
        </Grid2>
      </StyledPanelContainer>
    </StyledTabPanel>
  );
}

interface ProjectCardProps {
  project: Project;
  handleMediaOpen: (imgUrls: string[]) => void;
}

const ProjectCard = ({
  project: { title, description, technologies, mediaUrls },
  handleMediaOpen,
}: ProjectCardProps) => {
  return (
    <>
      <StyledCard>
        {mediaUrls.length > 0 && (
          <StyledCardMedia image={mediaUrls[0]} title={title} onClick={() => handleMediaOpen(mediaUrls)} />
        )}
        <StyledCardContent hasMedia={mediaUrls.length > 0}>
          <Grid2 container spacing={1} alignItems="center">
            <Grid2 size={12}>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </Grid2>
            <Grid2 size={12} display="flex" gap={1} flexWrap="wrap">
              {technologies.map((tech, index) => (
                <Chip key={index} label={tech} variant="outlined" />
              ))}
            </Grid2>
          </Grid2>
        </StyledCardContent>
      </StyledCard>
    </>
  );
};

const StyledPanelContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(() => ({
  width: '100%',
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  height: 140,
  cursor: 'pointer',
}));

const StyledTabPanel = styled(motion.div)(() => ({
  width: '100%',
}));

const StyledContainer = styled(Grid2)(() => ({
  width: '100%',
}));

const StyledCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== 'hasMedia',
})<{ hasMedia: boolean }>(({ theme, hasMedia }) => ({
  paddingTop: hasMedia ? theme.spacing(1) : 'initial',
}));
