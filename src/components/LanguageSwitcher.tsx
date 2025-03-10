'use client';

import { usePathname, useRouter } from '@I18n/navigation';
import { useTypedTranslations } from '@I18n/useTypedTranslations';
import { MenuItem, FormControl, Select, SelectChangeEvent, styled } from '@mui/material';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTypedTranslations('LanguageSwitcher');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;

    router.push(pathname, { locale: newLocale });
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
