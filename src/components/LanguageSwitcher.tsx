'use client';

import { Locale } from '@I18n/config';
import { setUserLocale } from '@I18n/locale';
import { MenuItem, FormControl, Select, SelectChangeEvent, styled } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('LanguageSwitcher');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value as Locale;

    setUserLocale(newLocale);
  };

  return (
    <StyledFormControl variant="standard" fullWidth>
      <Select value={locale} onChange={handleChange}>
        <MenuItem value="en-us">{t('english')}</MenuItem>
        <MenuItem value="es">{t('spanish')}</MenuItem>
      </Select>
    </StyledFormControl>
  );
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  padding: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    padding: 0,
  },
}));
