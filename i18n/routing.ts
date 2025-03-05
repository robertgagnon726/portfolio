import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en-us', 'es'],
  defaultLocale: 'en-us',
  localePrefix: 'as-needed',
});
