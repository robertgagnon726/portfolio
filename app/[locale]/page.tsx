import { Layout } from '@Connected-components/Layout/Layout';
import { useTypedTranslations } from '../../i18n/useTypedTranslations';

function AppHome() {
  const t = useTypedTranslations('HomePage');
  return <Layout>{t('title')}</Layout>;
}

export default AppHome;
