import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Dashboard } from '../sections/Dashboard';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Certifications } from '../sections/Certifications';
import { Education } from '../sections/Education';
import { Achievements } from '../sections/Achievements';
import { Contact } from '../sections/Contact';
import Terminal from '../components/Terminal';

interface HomeProps {
  scrollToSection: (id: string) => void;
  sysMode: string;
  setSysMode: (mode: string) => void;
  setLightboxImg: (img: string | null) => void;
  setLightboxOpen: (open: boolean) => void;
}

export const Home: React.FC<HomeProps> = ({
  scrollToSection,
  sysMode,
  setSysMode,
  setLightboxImg,
  setLightboxOpen
}) => {
  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on initial page mount if no specific hash is set
    if (window.location.hash === '' || window.location.hash === '#/') {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <Hero scrollToSection={scrollToSection} sysMode={sysMode} />
      <About />
      <Skills />
      <Dashboard />
      <Projects 
        sysMode={sysMode} 
        setSysMode={setSysMode} 
        setLightboxImg={setLightboxImg} 
        setLightboxOpen={setLightboxOpen} 
      />
      <Experience />
      <Certifications />
      <Education />
      <Achievements />
      
      {/* Interactive CLI Terminal Section */}
      <section id="terminal" className="py-24 border-b border-white/5 bg-[#050816] relative z-10">
        <Container maxWidth="md" className="space-y-8">
          <div className="space-y-2 text-center">
            <span className="font-mono text-xs text-blue-500 font-bold uppercase tracking-widest block">
              SECURE SESSION CLI
            </span>
            <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
              System Command Console
            </Typography>
            <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mt-2"></div>
          </div>
          <Terminal />
        </Container>
      </section>

      <Contact />
    </>
  );
};
export default Home;
