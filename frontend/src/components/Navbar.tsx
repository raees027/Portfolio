import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Search } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  onOpenCmdPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  scrollToSection,
  onOpenCmdPalette
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'dashboard', label: 'Telemetry' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Timeline' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass-nav">
      {/* Scroll Progress Indicator Bar */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="font-mono text-xs font-bold tracking-widest text-[#f4f4f7] cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          RAEES.DEV
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
                activeSection === link.id
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-[#8a8a93] hover:text-white border border-transparent'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Search Command Trigger & Social */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Spotlight Palette Button (Linear-style search box) */}
          <button 
            onClick={onOpenCmdPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-[10px] text-slate-400 hover:text-white hover:border-blue-500/30 transition-all cursor-pointer font-mono select-none"
            title="Open Command Menu (Ctrl + K)"
          >
            <Search size={12} className="text-slate-500" />
            <span>Search</span>
            <span className="bg-slate-800 border border-slate-700 px-1 py-0.5 rounded text-[8px] font-bold">Ctrl+K</span>
          </button>

          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#8a8a93] hover:text-white transition-colors">
            <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#8a8a93] hover:text-white transition-colors">
            <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#8a8a93] hover:text-white transition-colors">
            <Mail size={15} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={onOpenCmdPalette}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white cursor-pointer"
          >
            <Search size={14} />
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#8a8a93] hover:text-white cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#050816]/95 border-b border-white/5 py-4 px-6 flex flex-col space-y-3 z-45">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsOpen(false);
              }}
              className={`py-2 text-left text-sm font-medium tracking-wide transition-all cursor-pointer ${
                activeSection === link.id ? 'text-white' : 'text-[#8a8a93]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex space-x-6 pt-4 border-t border-white/5">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#8a8a93] hover:text-white transition-colors flex items-center gap-1.5 text-xs">
              <svg className="w-[13px] h-[13px] fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg> GitHub
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#8a8a93] hover:text-white transition-colors flex items-center gap-1.5 text-xs">
              <svg className="w-[12px] h-[12px] fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg> LinkedIn
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#8a8a93] hover:text-white transition-colors flex items-center gap-1.5 text-xs">
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
