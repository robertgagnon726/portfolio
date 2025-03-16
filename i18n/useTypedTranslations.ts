import { TranslationMessages } from '@I18n/types';

export type UseTranslations<T extends keyof TranslationMessages> = (
  key: keyof TranslationMessages[T],
  ...args: any[]
) => string;
