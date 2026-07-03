import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, FileText, Cpu, Shield, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { Typography } from '@mui/material';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-[#030303] select-none z-10 radial-ambient linear-grid">
      
      {/* Top Header Labels */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="flex justify-between items-center w-full z-30 font-mono text-[9px] sm:text-xs text-[#8a8a93] tracking-widest uppercase mt-16"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          {PERSONAL_INFO.tcsDetails.toUpperCase()}
        </div>
        <button 
          onClick={() => scrollToSection('about')} 
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          EXPLORE JOURNEY <span className="text-[14px]">→</span>
        </button>
      </motion.div>

      {/* Middle Interactive Typography & floating specs (No Avatar) */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center py-20 z-10">
        {/* Ambient Glows */}
        <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-[100px] pointer-events-none z-0" />
        
        {/* Giant Centered spec name layout */}
        <div className="relative flex flex-col items-center justify-center w-full select-none z-10">
          {/* Background text outline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 1.2, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="absolute font-oswald text-[18vw] sm:text-[14vw] font-bold text-white tracking-tighter leading-none select-none z-0 uppercase pointer-events-none"
          >
            RAEES
          </motion.div>

          {/* Foreground solid text with specular gradient */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="font-oswald text-[16vw] sm:text-[12vw] font-bold tracking-tighter leading-none uppercase select-none z-10 bg-gradient-to-b from-[#f4f4f7] via-[#e5dfd3] to-[#8a8a93] bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(255,255,255,0.03)]"
          >
            RAEES
          </motion.h1>
        </div>

        {/* Floating Cybernetic Capability Tags (Creative & Attractive!) */}
        {/* Tag 1: MERN Stack */}
        <motion.div 
          initial={{ opacity: 0, x: -30, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="absolute top-[15%] left-[5%] sm:left-[15%] z-20 glass-card px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5 shadow-lg pointer-events-auto hover:border-indigo-500/30 hover:scale-105 transition-all"
        >
          <Zap size={12} className="text-indigo-400" />
          <span className="font-mono text-[9px] sm:text-[10px] text-[#f4f4f7] font-bold tracking-wider uppercase">MERN Fullstack</span>
        </motion.div>

        {/* Tag 2: Cyber Security */}
        <motion.div 
          initial={{ opacity: 0, x: 30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[20%] right-[5%] sm:right-[15%] z-20 glass-card px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5 shadow-lg pointer-events-auto hover:border-purple-500/30 hover:scale-105 transition-all"
        >
          <Shield size={12} className="text-purple-400" />
          <span className="font-mono text-[9px] sm:text-[10px] text-[#f4f4f7] font-bold tracking-wider uppercase">Cyber Security</span>
        </motion.div>

        {/* Tag 3: AI Systems */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="absolute top-[20%] right-[10%] sm:right-[20%] z-20 glass-card px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5 shadow-lg pointer-events-auto hover:border-pink-500/30 hover:scale-105 transition-all"
        >
          <Cpu size={12} className="text-pink-400" />
          <span className="font-mono text-[9px] sm:text-[10px] text-[#f4f4f7] font-bold tracking-wider uppercase">AI Engineering</span>
        </motion.div>

        {/* Centered Specs Panel details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center max-w-xl px-4 z-20 space-y-4"
        >
          <Typography className="text-sm sm:text-base font-mono text-[#8a8a93] uppercase tracking-wider font-semibold">
            {PERSONAL_INFO.title}
          </Typography>
          <Typography className="text-xs sm:text-sm text-[#8a8a93] font-light leading-relaxed max-w-md mx-auto">
            Assistant System Engineer at TCS. Defending MERN applications from exploit vectors, designing robust REST APIs, and curating RAG pipelines.
          </Typography>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full z-30 font-mono text-[9px] sm:text-xs text-[#8a8a93] tracking-widest uppercase pb-4"
      >
        <div>{PERSONAL_INFO.name}</div>
        
        {/* Call to Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollToSection('projects')} 
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-white text-black font-sans font-bold hover:bg-white/90 hover:scale-102 transition-all cursor-pointer text-xs uppercase"
          >
            Projects <ChevronRight size={13} />
          </button>
          <a 
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#111115] border border-white/5 text-[#f4f4f7] font-sans font-bold hover:bg-[#1a1a24] hover:scale-102 transition-all cursor-pointer text-xs uppercase"
          >
            Resume <FileText size={13} />
          </a>
        </div>

        <div>{PERSONAL_INFO.title.split(' | ')[0]}</div>
      </motion.div>
    </section>
  );
};
