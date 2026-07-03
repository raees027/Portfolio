import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Typography } from '@mui/material';
import { ACHIEVEMENTS } from '../constants';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-white/5 relative z-10 bg-[#030303] linear-grid">
      <Container maxWidth="lg">
        <Grid container spacing={6} className="items-center">
          
          {/* Left Column: Bio */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
                  JOURNEY PATHWAY
                </span>
                <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
                  Muhammed Raees Pareed
                </Typography>
                <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mt-2"></div>
              </div>

              <Typography variant="body1" className="text-[#8a8a93] leading-relaxed font-light text-sm sm:text-base">
                Software Engineer with experience in building responsive and scalable web applications using React.js, JavaScript, and Node.js. Skilled in developing reusable UI components, integrating REST APIs, and optimizing frontend performance. Experienced in collaborating with cross-functional teams to deliver clean, user-friendly, and maintainable web applications.
              </Typography>
              <Typography variant="body1" className="text-[#8a8a93] leading-relaxed font-light text-sm sm:text-base">
                Currently serving as a <strong className="text-white font-semibold">Cyber Security Analyst</strong> at TCS, I execute code audits, packet trace analysis, and threat telemetry monitoring. I integrate secure coding principles to defend MERN applications from SQLi, CSRF, and injection vectors.
              </Typography>
            </motion.div>
          </Grid>

          {/* Right Column: High-contrast Metrics grid */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4 h-full"
            >
              {ACHIEVEMENTS.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-white/5 hover:border-indigo-500/20 hover:bg-white/[0.02] transition-all"
                >
                  <div className="font-oswald text-4xl font-extrabold text-[#e5dfd3] leading-none">
                    {stat.value}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono font-bold tracking-wider text-[#8a8a93] uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </section>
  );
};
