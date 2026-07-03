import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronRight, Cpu, Shield, Zap, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { Typography } from '@mui/material';
import { Canvas3D } from '../components/Canvas3D';

const TITLES = [
  "Frontend Developer",
  "Cybersecurity Analyst",
  "AI Enthusiast",
  "React Developer",
  "Problem Solver",
  "Continuous Learner"
];

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-[#050816] select-none z-10 radial-ambient">
      
      {/* 3D Particle System Sphere Background */}
      <Canvas3D />

      {/* Top Header Labels */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-between items-center w-full z-30 font-mono text-[9px] sm:text-xs text-slate-500 tracking-widest uppercase mt-16"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          {PERSONAL_INFO.tcsDetails.toUpperCase()}
        </div>
        <button 
          onClick={() => scrollToSection('about')} 
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          EXPLORE JOURNEY <span className="text-[14px]">→</span>
        </button>
      </motion.div>

      {/* Centered Hero Content Wrapper */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center py-20 z-10">
        
        {/* Live Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/[0.04] mb-6 shadow-lg text-[10px] font-mono tracking-wide"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-400 font-medium">🟢 Available for Opportunities</span>
        </motion.div>

        {/* Dynamic Name and Rotating Subtitles */}
        <div className="relative flex flex-col items-center justify-center w-full select-none z-10 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[8vw] sm:text-[6vw] font-black tracking-tighter leading-none uppercase select-none z-10 bg-gradient-to-r from-white via-blue-500 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(37,99,235,0.08)]"
          >
            Muhammed Raees Pareed
          </motion.h1>

          {/* Animated Rotating Subtitles */}
          <div className="h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="font-mono text-base sm:text-lg font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"
              >
                <Sparkles size={14} className="text-purple-400" />
                {TITLES[titleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Achievement Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-2.5 justify-center mt-8 max-w-xl px-4 z-20"
        >
          {[
            { label: 'React Developer', icon: <Zap size={10} className="text-blue-400" /> },
            { label: 'Cybersecurity Analyst', icon: <Shield size={10} className="text-purple-400" /> },
            { label: 'MERN Developer', icon: <Cpu size={10} className="text-cyan-400" /> },
            { label: 'AI Enthusiast', icon: <Sparkles size={10} className="text-pink-400" /> }
          ].map((pill, idx) => (
            <div 
              key={idx}
              className="glass-card px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/5 shadow-md hover:border-blue-500/20 hover:scale-105 transition-all text-[9px] sm:text-[10px] font-mono text-slate-300 font-bold uppercase"
            >
              {pill.icon}
              <span>{pill.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bio Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-center max-w-lg px-4 z-20"
        >
          <Typography className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            I design and build secure, scalable, and intelligent digital experiences by combining modern frontend engineering, cybersecurity, and artificial intelligence.
          </Typography>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full z-30 font-mono text-[9px] sm:text-xs text-slate-500 tracking-widest uppercase pb-4"
      >
        <div>{PERSONAL_INFO.name}</div>
        
        {/* Call to Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollToSection('projects')} 
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black font-sans font-bold hover:bg-white/90 hover:scale-102 active:scale-98 transition-all cursor-pointer text-xs uppercase shadow-lg shadow-white/5"
          >
            View Projects <ChevronRight size={13} />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 border border-white/5 text-[#f4f4f7] font-sans font-bold hover:bg-[#151f38] hover:scale-102 active:scale-98 transition-all cursor-pointer text-xs uppercase shadow-md"
          >
            Contact Me <Mail size={13} />
          </button>
        </div>

        <div>{PERSONAL_INFO.title.split(' | ')[0]}</div>
      </motion.div>
    </section>
  );
};

export default Hero;
