import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { Award, CheckCircle } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 border-b border-white/5 relative z-10 bg-[#030303]">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2 text-center">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
            VERIFIED CREDENTIALS
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Certifications
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mx-auto mt-2"></div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-white/5 hover:border-indigo-500/20 hover:bg-white/[0.01]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
                    <Award size={18} />
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold">
                    <CheckCircle size={8} /> VERIFIED
                  </div>
                </div>

                <h5 className="font-bold text-sm text-[#f4f4f7] leading-snug">
                  {cert.name}
                </h5>
              </div>

              <div className="space-y-0.5 border-t border-white/[0.04] pt-3">
                <p className="text-[10px] font-mono text-[#8a8a93] uppercase font-bold">
                  {cert.issuer}
                </p>
                <p className="text-[9px] text-[#8a8a93]">
                  {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};
