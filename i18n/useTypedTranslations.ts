import { TranslationMessages } from '@I18n/types';
import { useTranslations } from 'next-intl';

export type UseTranslations<T extends keyof TranslationMessages> = (
  key: keyof TranslationMessages[T],
  ...args: any[]
) => string;

export function useTypedTranslations<T extends keyof TranslationMessages>(namespace: T) {
  return useTranslations(namespace) as UseTranslations<T>;
}
