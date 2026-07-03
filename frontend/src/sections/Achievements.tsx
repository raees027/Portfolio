import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { ACHIEVEMENTS } from '../constants';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 border-b border-white/5 relative z-10 bg-[#030303]">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2 text-center">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
            METRIC STATS
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Achievements
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mx-auto mt-2"></div>
        </div>

        {/* Counter cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 text-center flex flex-col justify-center space-y-3"
            >
              <div className="font-oswald text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 leading-none">
                {item.value}
              </div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#8a8a93] uppercase">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
