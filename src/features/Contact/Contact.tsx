'use client';

import Grid from '@mui/material/Grid2';
import { Button, Stack, styled } from '@mui/material';
import { useTypedTranslations } from '@I18n/useTypedTranslations';
import { Section } from '@Components/Section';
import { LinkedIn } from '@mui/icons-material';
import { ContactForm } from '@Features/Contact/ContactForm';

export default function Contact() {
  const t = useTypedTranslations('Contact');

  return (
    <Section sectionId="contact" title={t('title')} subtitle={t('subtitle')}>
      <StyledStack spacing={3}>
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<LinkedIn />}
              color="primary"
              size="small"
              component="a"
              fullWidth
              href="https://www.linkedin.com/in/bobby-gagnon-b669b8102"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('connectOnLinkedIn')}
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </StyledStack>
    </Section>
  );
}

const StyledStack = styled(Stack)(() => ({
  width: '100%',
}));
