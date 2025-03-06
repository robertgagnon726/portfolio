import { Layout } from '@Connected-components/Layout/Layout';
import Hero from '@Features/Hero/Hero';
import Testimonials from '@Features/Testimonials/Testimonials';

function AppHome() {
  return (
    <Layout>
      <Hero />
      <Testimonials />
    </Layout>
  );
}

export default AppHome;
