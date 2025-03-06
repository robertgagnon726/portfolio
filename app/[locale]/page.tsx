import { Layout } from '@Connected-components/Layout/Layout';
import EngineeringPhilosophy from '@Features/EngineeringPhilosophy/EngineeringPhilosophy';
import Hero from '@Features/Hero/Hero';
import Testimonials from '@Features/Testimonials/Testimonials';

function AppHome() {
  return (
    <Layout>
      <Hero />
      <Testimonials />
      <EngineeringPhilosophy />
    </Layout>
  );
}

export default AppHome;
