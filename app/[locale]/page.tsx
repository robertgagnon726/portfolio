import { Layout } from '@Connected-components/Layout/Layout';
import { useTypedTranslations } from '@I18n/useTypedTranslations';

function AppHome() {
  const t = useTypedTranslations('HomePage');
  return <Layout>{t('title')}</Layout>;
}

export default AppHome;
