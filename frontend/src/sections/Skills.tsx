import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { SKILL_CATEGORIES } from '../constants';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-b border-white/5 relative z-10 bg-[#030303]">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2 text-center">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
            TECHNICAL BENTO
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Core Capabilities
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mx-auto mt-2"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#8a8a93] uppercase group-hover:text-indigo-400 transition-colors">
                    {category.name}
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-60"></span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 text-xs font-mono bg-white/[0.02] border border-white/5 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
