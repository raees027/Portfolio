import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { ACHIEVEMENTS } from '../constants';
import { ShieldCheck, Cpu, Code, BrainCircuit } from 'lucide-react';

export const About: React.FC = () => {
  const journeyStages = [
    { title: "Java Full Stack", desc: "Spring Boot backend microservices and relational Oracle database management systems.", icon: <Code size={14} className="text-blue-400" /> },
    { title: "Frontend Development", desc: "Building modular component layers using React, Vite, TypeScript, and Tailwind CSS.", icon: <Cpu size={14} className="text-cyan-400" /> },
    { title: "Cybersecurity Ops", desc: "TCS Analyst roles - auditing codes, tracing SYN logs, and analyzing packet data alerts.", icon: <ShieldCheck size={14} className="text-purple-400" /> },
    { title: "Artificial Intelligence", desc: "Developing OpenAI assistant APIs and implementing Pinecone vector store RAG systems.", icon: <BrainCircuit size={14} className="text-pink-400" /> },
    { title: "Future AI Security Engineer", desc: "Building defense layers to guard LLMs against prompt injections and data leaks.", icon: <ShieldCheck size={14} className="text-emerald-400 text-glow-emerald" /> }
  ];

  return (
    <section id="about" className="py-24 border-b border-white/5 relative z-10 bg-[#050816] linear-grid">
      <Container maxWidth="lg" className="space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bio */}
          <div className="md:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs text-blue-500 font-bold uppercase tracking-widest block">
                  JOURNEY PATHWAY
                </span>
                <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
                  Muhammed Raees Pareed
                </Typography>
                <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2"></div>
              </div>

              <Typography variant="body1" className="text-slate-400 leading-relaxed font-light text-sm sm:text-base">
                Software Engineer with experience in building responsive and scalable web applications using React.js, JavaScript, and Node.js. Skilled in developing reusable UI components, integrating REST APIs, and optimizing frontend performance.
              </Typography>
              <Typography variant="body1" className="text-slate-400 leading-relaxed font-light text-sm sm:text-base">
                Currently serving as an <strong className="text-white font-semibold">Assistant System Engineer (Cybersecurity Analyst)</strong> at TCS, I execute security audits, trace packet transactions, and monitor SIEM telemetry logs. I construct defenses to guard fullstack MERN structures from injection and cross-site scripting vectors.
              </Typography>
            </motion.div>
          </div>

          {/* Right Column: High-contrast Metrics grid */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4 h-full"
            >
              {ACHIEVEMENTS.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.01] transition-all"
                >
                  <div className="font-oswald text-4xl font-extrabold text-slate-200 leading-none">
                    {stat.value}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Technical Timeline Journey */}
        <div className="space-y-8 pt-8 border-t border-white/[0.04]">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">PROGRESSION MAP</span>
            <Typography variant="h5" className="font-oswald font-bold uppercase tracking-tight text-xl sm:text-2xl text-slate-200">
              Technical Evolution
            </Typography>
          </div>

          {/* Timeline Node Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {journeyStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card p-5 rounded-xl border border-white/5 flex flex-col justify-between space-y-3 relative hover:border-blue-500/20"
              >
                {/* Connector Arrow */}
                {idx < 4 && (
                  <div className="hidden md:block absolute top-[40%] -right-3.5 z-20 text-slate-700 font-bold select-none text-xs">
                    →
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-slate-900 border border-white/5 rounded-lg">
                    {stage.icon}
                  </div>
                  <span className="font-mono text-[9px] font-bold text-slate-600">0{idx + 1}</span>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-xs text-slate-200 uppercase tracking-wide">
                    {stage.title}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-light leading-normal">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};
export default About;
