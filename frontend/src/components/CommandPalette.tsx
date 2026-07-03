import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Globe, Mail, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

interface CommandItem {
  id: string;
  category: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
  setSysMode: (mode: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  scrollToSection,
  setSysMode
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = useMemo(() => [
    // Navigation
    { id: 'nav-hero', category: 'Navigation', label: 'Go to Home', icon: <Hash size={14} />, action: () => scrollToSection('hero') },
    { id: 'nav-about', category: 'Navigation', label: 'Go to About Me', icon: <Hash size={14} />, action: () => scrollToSection('about') },
    { id: 'nav-skills', category: 'Navigation', label: 'Go to Technical Skills', icon: <Hash size={14} />, action: () => scrollToSection('skills') },
    { id: 'nav-projects', category: 'Navigation', label: 'Go to Featured Projects', icon: <Hash size={14} />, action: () => scrollToSection('projects') },
    { id: 'nav-telemetry', category: 'Navigation', label: 'Go to Telemetry & Coding Dashboard', icon: <Hash size={14} />, action: () => scrollToSection('dashboard') },
    { id: 'nav-experience', category: 'Navigation', label: 'Go to Professional Timeline', icon: <Hash size={14} />, action: () => scrollToSection('experience') },
    { id: 'nav-certs', category: 'Navigation', label: 'Go to Credentials & Certifications', icon: <Hash size={14} />, action: () => scrollToSection('certifications') },
    { id: 'nav-education', category: 'Navigation', label: 'Go to Academic Track', icon: <Hash size={14} />, action: () => scrollToSection('education') },
    { id: 'nav-terminal', category: 'Navigation', label: 'Go to soc_terminal_session.sh', icon: <Hash size={14} />, action: () => scrollToSection('terminal') },
    { id: 'nav-contact', category: 'Navigation', label: 'Go to Get In Touch', icon: <Hash size={14} />, action: () => scrollToSection('contact') },

    // Actions & Themes
    { id: 'mode-dual', category: 'Mode Configuration', label: 'Enable Dual Core Core Grid', icon: <Cpu size={14} className="text-cyan-400" />, action: () => setSysMode('dual') },
    { id: 'mode-dev', category: 'Mode Configuration', label: 'Switch to Developer Mode (Indigo)', icon: <Cpu size={14} className="text-indigo-400" />, action: () => setSysMode('dev') },
    { id: 'mode-sec', category: 'Mode Configuration', label: 'Switch to Security Operations Mode (Purple)', icon: <ShieldAlert size={14} className="text-purple-400" />, action: () => setSysMode('sec') },

    // Connections
    { id: 'link-github', category: 'Connections', label: 'Open GitHub Profile (@raees027)', icon: <Globe size={14} />, action: () => window.open('https://github.com/raees027', '_blank') },
    { id: 'link-linkedin', category: 'Connections', label: 'Open LinkedIn Profile', icon: <Globe size={14} />, action: () => window.open('https://www.linkedin.com/in/raees-muhammed-/', '_blank') },
    { id: 'link-email', category: 'Connections', label: 'Send Direct Email (raeeskp02@gmail.com)', icon: <Mail size={14} />, action: () => window.open('mailto:raeeskp02@gmail.com') }
  ], [scrollToSection, setSysMode]);

  // Filter commands
  const filteredItems = useMemo(() => {
    return commandItems.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, commandItems]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;
    setSelectedIndex(0);
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Adjust scroll position of list when using arrows
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const selectedEl = listEl.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Spotlight Frame */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-slate-950/90 border border-white/[0.06] rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(37,99,235,0.25)] flex flex-col z-10"
          >
            {/* Input Wrapper */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/[0.04]">
              <Search size={18} className="text-slate-500 mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or query..."
                className="w-full bg-transparent border-0 outline-none text-sm text-[#f4f4f7] placeholder-slate-500 font-sans focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-[10px] font-mono font-bold text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded ml-2 select-none">ESC</span>
            </div>

            {/* List Body */}
            <div 
              ref={listRef}
              className="max-h-[300px] overflow-y-auto p-2 space-y-2 scrollbar-none"
            >
              {filteredItems.length > 0 ? (
                // Group by categories
                Object.entries(
                  filteredItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {} as Record<string, typeof filteredItems>)
                ).map(([category, items]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                      {category}
                    </div>
                    {items.map((item) => {
                      const absoluteIndex = filteredItems.findIndex(f => f.id === item.id);
                      const isSelected = absoluteIndex === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          data-index={absoluteIndex}
                          onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                          className={`w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-xs cursor-pointer select-none font-sans transition-all duration-150 ${
                            isSelected 
                              ? 'bg-white/[0.03] text-white border-l-2 border-cyber-accent pl-2.5' 
                              : 'text-slate-400 hover:text-white border-l-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isSelected ? 'text-cyber-accent' : 'text-slate-500'}>
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {isSelected && (
                            <span className="text-[9px] font-mono font-bold text-cyber-accent flex items-center gap-1">
                              RUN <ArrowRight size={10} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Bottom Footer Help */}
            <div className="flex justify-between items-center px-4 py-2.5 bg-slate-900/40 border-t border-white/[0.04] text-[9px] font-mono text-slate-500">
              <div className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>⏎ select</span>
              </div>
              <div>Muhammed Raees Pareed | Product Shell v1.0</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
