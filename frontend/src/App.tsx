import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Dialog } from '@mui/material';
import { ArrowUp } from 'lucide-react';

// Components & Sections
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Certifications } from './sections/Certifications';
import { Education } from './sections/Education';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: '#a855f7' },
    background: {
      default: '#030303',
      paper: '#0a0a0c',
    },
    text: {
      primary: '#f4f4f7',
      secondary: '#8a8a93',
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
  }
});

const App: React.FC = () => {
  const [sysMode, setSysMode] = useState<string>('dual');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  
  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Monitor active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <div className="min-h-screen bg-[#030303] text-[#f4f4f7] selection:bg-[#6366f1]/30 selection:text-white flex flex-col justify-between">
        
        {/* Navigation bar */}
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

        {/* Section Contents */}
        <main>
          <Hero scrollToSection={scrollToSection} />
          <About />
          <Skills />
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
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Scroll to Top button */}
        {showScrollTop && (
          <button
            onClick={() => scrollToSection('hero')}
            className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-white text-black border border-white/5 shadow-xl hover:bg-white/95 hover:scale-105 transition-all cursor-pointer"
          >
            <ArrowUp size={16} />
          </button>
        )}

        {/* High-Resolution Project Sandbox Screenshot Lightbox Dialog */}
        <Dialog
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          maxWidth="lg"
          fullWidth
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#050507',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.15)',
            }
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
              <span className="font-mono text-xs text-indigo-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> HIGH-RESOLUTION PROJECT SANDBOX SCREENSHOT
              </span>
              <button 
                onClick={() => setLightboxOpen(false)} 
                className="text-[#8a8a93] hover:text-white font-mono text-xs cursor-pointer select-none bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded transition-colors"
              >
                CLOSE
              </button>
            </div>
            
            <div className="flex items-center justify-center bg-[#030303] p-2 rounded-xl border border-white/5 overflow-auto max-h-[75vh]">
              {lightboxImg && (
                <img 
                  src={lightboxImg} 
                  alt="High Resolution Project Sandbox" 
                  className="max-w-full h-auto object-contain rounded border border-white/5 shadow-lg"
                />
              )}
            </div>
          </div>
        </Dialog>
        
      </div>
    </ThemeProvider>
  );
};

export default App;
