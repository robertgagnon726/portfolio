import { useTranslations } from 'next-intl';
import { TranslationMessages } from './types';

export function useTypedTranslations<T extends keyof TranslationMessages>(namespace: T) {
  return useTranslations(namespace) as (key: keyof TranslationMessages[T], ...args: any[]) => string;
}
