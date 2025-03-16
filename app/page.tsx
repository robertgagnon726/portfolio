import { Layout } from '@Connected-components/Layout/Layout';
import Awards from '@Features/Awards/Awards';
import Contact from '@Features/Contact/Contact';
import EngineeringPhilosophy from '@Features/EngineeringPhilosophy/EngineeringPhilosophy';
import Experience from '@Features/Experience/Experience';
import Hero from '@Features/Hero/Hero';
import PersonalInterests from '@Features/PersonalInterests/PersonalInterests';
import PreferredTechStack from '@Features/PreferredTechStack/PreferredTechStack';
import Projects from '@Features/Projects/Projects';
import Referrals from '@Features/Referrals/Referrals';
import TechISpeak from '@Features/TechISpeak/TechISpeak';
import { Divider } from '@mui/material';

function AppHome() {
  return (
    <Layout>
      <Hero />
      <Divider />
      <EngineeringPhilosophy />
      <Referrals />
      <Divider />
      <Awards />
      <Divider />
      <Experience />
      <Divider />
      <PersonalInterests />
      <Divider />
      <PreferredTechStack />
      <Divider />
      <TechISpeak />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
    </Layout>
  );
}

export default AppHome;
