'use client';

import { InViewSlideTransition } from '@Components/InViewSlideTransition';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  const tCommon = useTranslations('Common');
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        alignItems: 'center',

        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, ${theme.palette.primary.light}, transparent)`,
        ...theme.applyStyles('dark', {
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, ${theme.palette.primary.dark}, transparent)`,
        }),
      })}
    >
      <StyledContainer>
        <StyledContainerStack spacing={2} useFlexGap>
          <InViewSlideTransition
            threshold={0.1}
            transitionProps={{ timeout: 500, direction: 'right' }}
            slotProps={{
              innerContainer: { sx: { display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
            }}
          >
            <Typography variant="h1">
              {`Hello, I'm Bobby`}&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={(theme) => ({
                  fontSize: 'inherit',
                  color: 'primary.main',
                  ...theme.applyStyles('dark', {
                    color: 'primary.light',
                  }),
                })}
              >
                Gagnon
              </Typography>
              .
            </Typography>
          </InViewSlideTransition>
          <InViewSlideTransition threshold={0.1} transitionProps={{ timeout: 500, direction: 'left' }}>
            <Typography variant="h2">{`I'm a full-stack software engineer.`}</Typography>
          </InViewSlideTransition>
          <InViewSlideTransition
            slotProps={{
              innerContainer: { sx: { justifyContent: 'center' } },
            }}
            threshold={0.1}
            transitionProps={{ timeout: 500, direction: 'right' }}
          >
            <StyledSubtitle color="textSecondary">{t('subtitle')}</StyledSubtitle>
          </InViewSlideTransition>
          <StyledCTAStack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap>
            <InViewSlideTransition threshold={0.1} transitionProps={{ timeout: 500, direction: 'left' }}>
              <StyledContactButton variant="contained" color="primary" size="small" component="a" href="#contact">
                {tCommon('contact')}
              </StyledContactButton>
            </InViewSlideTransition>
          </StyledCTAStack>
        </StyledContainerStack>
      </StyledContainer>
    </Box>
  );
}

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(14),
  paddingBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(12),
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: '80%',
    textAlign: 'center',
  },
}));

const StyledContainerStack = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },
}));

const StyledCTAStack = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '350px',
  },
}));

const StyledContactButton = styled(Button)<ButtonProps<'a'>>(() => ({
  width: '100%',
}));
