'use client';

import { useTypedTranslations } from '@I18n/useTypedTranslations';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export default function Hero() {
  const t = useTypedTranslations('Hero');
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',

        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <StyledContainer>
        <StyledContainerStack spacing={2} useFlexGap>
          <StyledTitle variant="h1">
            Bobby&nbsp;
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
          </StyledTitle>
          <StyledSubtitle color="textSecondary">{t('subtitle')}</StyledSubtitle>
          <StyledCTAStack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap>
            <StyledContactButton
              variant="contained"
              color="primary"
              size="small"
              component="a"
              href="https://www.linkedin.com/in/bobby-gagnon-b669b8102"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('connect')}
            </StyledContactButton>
          </StyledCTAStack>
        </StyledContainerStack>
        <StyledBox id="image" />
      </StyledContainer>
    </Box>
  );
}

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(14),
  paddingBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(12),
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: 'clamp(3rem, 10vw, 3.5rem)',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: '80%',
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
