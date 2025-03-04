import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en-US', 'es'],
  defaultLocale: 'en-US',
  localePrefix: 'as-needed',
});
