import { Layout } from '@Connected-components/Layout/Layout';
import Awards from '@Features/Awards/Awards';
import EngineeringPhilosophy from '@Features/EngineeringPhilosophy/EngineeringPhilosophy';
import Hero from '@Features/Hero/Hero';
import Testimonials from '@Features/Testimonials/Testimonials';
import { Divider } from '@mui/material';

function AppHome() {
  return (
    <Layout>
      <Hero />
      <Testimonials />
      <Divider />
      <EngineeringPhilosophy />
      <Divider />
      <Awards />
    </Layout>
  );
}

export default AppHome;
