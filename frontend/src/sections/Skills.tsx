import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { SKILL_CATEGORIES } from '../constants';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categoriesList = ['ALL', ...SKILL_CATEGORIES.map(c => c.name)];

  const filteredCategories = selectedCategory === 'ALL'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.name === selectedCategory);

  return (
    <section id="skills" className="py-24 border-b border-white/5 relative z-10 bg-[#050816]">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2 text-center">
          <span className="font-mono text-xs text-blue-500 font-bold uppercase tracking-widest block">
            TECHNICAL BENTO
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Core Capabilities
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mt-2"></div>
        </div>

        {/* Tab Selection Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto font-mono text-[9px] sm:text-xs z-30">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600/10 text-cyan-400 border-blue-500/30'
                  : 'bg-slate-900 text-slate-500 border-transparent hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-blue-500/20 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#8a8a93] uppercase group-hover:text-cyan-400 transition-colors">
                      {category.name}
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60"></span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono bg-slate-900 border border-white/5 rounded-lg text-slate-400 hover:text-white hover:border-blue-500/30 hover:shadow-[0_0_12px_rgba(37,99,235,0.15)] transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
};
export default Skills;
