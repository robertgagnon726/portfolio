import { Layout } from '@Connected-components/Layout/Layout';
import Awards from '@Features/Awards/Awards';
import EngineeringPhilosophy from '@Features/EngineeringPhilosophy/EngineeringPhilosophy';
import Experience from '@Features/Experience/Experience';
import Hero from '@Features/Hero/Hero';
import PersonalInterests from '@Features/PersonalInterests/PersonalInterests';
import PreferredTechStack from '@Features/PreferredTechStack/PreferredTechStack';
import Referrals from '@Features/Referrals/Referrals';
import { Divider } from '@mui/material';

function AppHome() {
  return (
    <Layout>
      <Hero />
      <Referrals />
      <Divider />
      <EngineeringPhilosophy />
      <Divider />
      <Awards />
      <Divider />
      <Experience />
      <Divider />
      <PersonalInterests />
      <Divider />
      <PreferredTechStack />
    </Layout>
  );
}

export default AppHome;
