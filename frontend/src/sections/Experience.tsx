import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../constants';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-b border-white/5 relative z-10 bg-[#030303] linear-grid">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
            PROFESSIONAL TIMELINE
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Experience
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mt-2"></div>
        </div>

        {/* Timeline List */}
        <div className="border-l border-white/5 ml-4 pl-6 relative space-y-12">
          {EXPERIENCE_TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-indigo-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <Typography variant="h6" className="font-bold text-[#f4f4f7] uppercase text-base sm:text-lg font-sans">
                      {item.role}
                    </Typography>
                    <Typography variant="subtitle2" className="text-indigo-400 font-mono text-xs font-semibold flex items-center gap-1.5 mt-0.5">
                      <Briefcase size={12} /> {item.company}
                    </Typography>
                  </div>
                  <Typography className="text-[#8a8a93] font-mono text-xs font-semibold">
                    {item.period}
                  </Typography>
                </div>

                <ul className="space-y-1.5 text-[#8a8a93] text-xs sm:text-sm pl-4 list-disc marker:text-indigo-500 font-light leading-relaxed max-w-3xl">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
