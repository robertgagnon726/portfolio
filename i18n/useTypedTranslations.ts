import { TranslationMessages } from '@I18n/types';
import { useTranslations } from 'next-intl';

export function useTypedTranslations<T extends keyof TranslationMessages>(namespace: T) {
  return useTranslations(namespace) as (key: keyof TranslationMessages[T], ...args: any[]) => string;
}
