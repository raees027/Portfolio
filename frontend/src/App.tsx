import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Dialog } from '@mui/material';
import { ArrowUp } from 'lucide-react';

// Components & Pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { CommandPalette } from './components/CommandPalette';
import { AIAssistant } from './components/AIAssistant';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2563eb' },      // Electric Blue
    secondary: { main: '#8b5cf6' },    // Electric Purple
    background: {
      default: '#050816',
      paper: '#0f172a',
    },
    text: {
      primary: '#f4f4f7',
      secondary: '#94a3b8',
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
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState<boolean>(false);
  
  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Monitor active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'dashboard', 'projects', 'experience', 'contact'];
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

  // Global Keyboard event handler for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    // If not on Home page, redirect to home page first
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.href = '#/';
      // Wait for route change to finish, then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <Router>
        <div className="min-h-screen bg-[#050816] text-[#f4f4f7] selection:bg-blue-600/30 selection:text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Background grid lines */}
          <div className="absolute inset-0 linear-grid pointer-events-none opacity-20 z-0" />
          
          {/* Navigation bar */}
          <Navbar 
            activeSection={activeSection} 
            scrollToSection={scrollToSection} 
            onOpenCmdPalette={() => setCmdPaletteOpen(true)} 
          />

          {/* Router switch viewports */}
          <main className="relative z-10 flex-grow">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    scrollToSection={scrollToSection}
                    sysMode={sysMode}
                    setSysMode={setSysMode}
                    setLightboxImg={setLightboxImg}
                    setLightboxOpen={setLightboxOpen}
                  />
                } 
              />
              <Route path="/project/:id" element={<CaseStudy />} />
              <Route path="*" element={<Home scrollToSection={scrollToSection} sysMode={sysMode} setSysMode={setSysMode} setLightboxImg={setLightboxImg} setLightboxOpen={setLightboxOpen} />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Custom dialog panels */}
          <CommandPalette 
            isOpen={cmdPaletteOpen} 
            onClose={() => setCmdPaletteOpen(false)} 
            scrollToSection={scrollToSection}
            setSysMode={setSysMode}
          />

          <AIAssistant />

          {/* Floating Scroll to Top button */}
          {showScrollTop && (
            <button
              onClick={() => scrollToSection('hero')}
              className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-white text-black border border-white/5 shadow-xl hover:bg-white/95 hover:scale-105 transition-all cursor-pointer"
              aria-label="Scroll back to top"
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
                backgroundColor: '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 0 40px rgba(37, 99, 235, 0.15)',
              }
            }}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                <span className="font-mono text-xs text-blue-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> HIGH-RESOLUTION PROJECT SANDBOX SCREENSHOT
                </span>
                <button 
                  onClick={() => setLightboxOpen(false)} 
                  className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer select-none bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded transition-colors"
                >
                  CLOSE
                </button>
              </div>
              
              <div className="flex items-center justify-center bg-[#050816] p-2 rounded-xl border border-white/5 overflow-auto max-h-[75vh]">
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
      </Router>
    </ThemeProvider>
  );
};

export default App;
