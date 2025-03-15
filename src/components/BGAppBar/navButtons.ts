import { UseTranslations } from '@I18n/useTypedTranslations';

export const getNavButtons = (t: UseTranslations<'Common'>) => {
  return [
    {
      label: t('referrals'),
      href: '/#referrals',
    },
    {
      label: t('philosophy'),
      href: '/#philosophy',
    },
    {
      label: t('awards'),
      href: '/#awards',
    },
    {
      label: t('experience'),
      href: '/#experience',
    },
    {
      label: t('interests'),
      href: '/#personal-interests',
    },
    {
      label: t('stack'),
      href: '/#preferred-tech-stack',
    },
    {
      label: t('techISpeak'),
      href: '/#tech-i-speak',
    },
    {
      label: t('blog'),
      href: '/blog',
    },
  ];
};
