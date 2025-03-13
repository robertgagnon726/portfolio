export type Locale = (typeof locales)[number];

export const locales = ['en-us', 'es'] as const;
export const defaultLocale: Locale = 'en-us';
