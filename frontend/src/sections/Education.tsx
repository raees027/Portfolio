import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { GraduationCap } from 'lucide-react';
import { EDUCATION_TIMELINE } from '../constants';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 border-b border-white/5 relative z-10 bg-[#030303] linear-grid">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
            ACADEMIC TRACK
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Education & Learning
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mt-2"></div>
        </div>

        {/* Education Timeline */}
        <div className="border-l border-white/5 ml-4 pl-6 relative space-y-12">
          {EDUCATION_TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-indigo-500 flex items-center justify-center">
                <GraduationCap size={10} className="text-indigo-450" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <Typography variant="h6" className="font-bold text-[#f4f4f7] uppercase text-base sm:text-lg font-sans">
                      {item.degree}
                    </Typography>
                    <Typography variant="subtitle2" className="text-[#8a8a93] font-mono text-xs">
                      {item.institution}
                    </Typography>
                  </div>
                  <Typography className="text-[#8a8a93] font-mono text-xs font-semibold">
                    {item.period}
                  </Typography>
                </div>

                <Typography variant="body2" className="text-[#8a8a93] font-light max-w-3xl leading-relaxed text-xs sm:text-sm">
                  {item.description}
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
