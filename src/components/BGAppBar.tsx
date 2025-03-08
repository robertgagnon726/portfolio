import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorSchemeIconDropdown from '@Src/theme/ColorSchemeIconDropdown';
import { useTypedTranslations } from '@I18n/useTypedTranslations';

export default function BGAppBar() {
  const t = useTypedTranslations('Common');
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navButtons = [
    {
      label: t('philosophy'),
      href: '#philosophy',
    },
    {
      label: t('referrals'),
      href: '#referrals',
    },
    {
      label: t('awards'),
      href: '#awards',
    },
    {
      label: t('stack'),
      href: '#preferred-tech-stack',
    },
    {
      label: t('interests'),
      href: '#personal-interests',
    },
    {
      label: t('highlights'),
      href: '#career-highlights',
    },
    {
      label: t('experience'),
      href: '#experience',
    },
    {
      label: t('services'),
      href: '#services',
    },
    {
      label: t('blog'),
      href: '#blog',
    },
  ];

  return (
    <StyledAppBar position="fixed" enableColorOnDark>
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <StyledNavItemsContainer>
            <StyledNavItemsInnerContainer>
              {navButtons.map((button) => (
                <Button key={button.label} variant="text" color="info" size="small" component="a" href={button.href}>
                  {button.label}
                </Button>
              ))}
            </StyledNavItemsInnerContainer>
          </StyledNavItemsContainer>
          <StyledCTAContainer>
            <Button color="primary" variant="contained" size="small">
              {t('contact')}
            </Button>
            <ColorSchemeIconDropdown />
          </StyledCTAContainer>
          <StyledMenuContainer>
            <ColorSchemeIconDropdown size="medium" />
            <IconButton aria-label={t('menuButton')} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <StyledDrawerContentContainer>
                <StyledCloseButtonContainer>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </StyledCloseButtonContainer>

                {navButtons.map((button) => (
                  <MenuItem key={button.label} component="a" href={button.href} onClick={toggleDrawer(false)}>
                    {button.label}
                  </MenuItem>
                ))}
                <StyledDivider />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    {t('contact')}
                  </Button>
                </MenuItem>
              </StyledDrawerContentContainer>
            </Drawer>
          </StyledMenuContainer>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)(() => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  marginTop: 'calc(var(--template-frame-height, 0px) + 28px)',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(0, 3),
}));

const StyledDrawerContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const StyledCloseButtonContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const StyledMenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const StyledCTAContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: theme.spacing(1),
  alignItems: 'center',

  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledNavItemsInnerContainer = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledNavItemsContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));
