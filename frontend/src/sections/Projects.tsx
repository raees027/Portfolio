import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Typography } from '@mui/material';
import { ExternalLink } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';

// Import movie screenshots
import movieMainImg from '../assets/movie_main.png';
import movieLoginImg from '../assets/movie_login.png';
import movieWatchlistImg from '../assets/movie_watchlist.png';
import movieFilterImg from '../assets/movie_filter.png';
import movieAdminImg from '../assets/movie_admin.png';

interface ProjectsProps {
  sysMode: string;
  setSysMode: (mode: string) => void;
  setLightboxImg: (img: string | null) => void;
  setLightboxOpen: (open: boolean) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  sysMode, 
  setSysMode, 
  setLightboxImg, 
  setLightboxOpen 
}) => {
  const [movieTab, setMovieTab] = useState<string>('main');

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => sysMode === 'dual' || p.type === sysMode
  );

  return (
    <section id="projects" className="py-24 border-b border-white/5 relative z-10 bg-[#030303]">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Header with Mode Toggle */}
        <div className="flex flex-wrap justify-between items-center gap-6 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest block">
              PORTFOLIO SHOWCASE
            </span>
            <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
              Projects
            </Typography>
            <div className="h-[2px] w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mt-2"></div>
          </div>

          {/* Mode Selector System Toggle */}
          <div className="inline-flex p-1 bg-white/[0.02] border border-white/5 rounded-full font-mono text-[10px] gap-1 z-30">
            {[
              { id: 'dual', label: 'DUAL CORE' },
              { id: 'dev', label: 'DEVELOPMENT' },
              { id: 'sec', label: 'SECURITY' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setSysMode(m.id)}
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  sysMode === m.id 
                    ? m.id === 'dev' 
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-[#8a8a93] hover:text-white border border-transparent'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating Row Showcase */}
        <div className="space-y-28">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Grid container spacing={6} className="items-center" direction={isEven ? 'row' : 'row-reverse'}>
                  
                  {/* Column 1: Project Details */}
                  <Grid item xs={12} md={5} className="space-y-5">
                    <div className="space-y-2">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${
                        project.type === 'dev' 
                          ? 'bg-indigo-500/10 text-indigo-450 border border-indigo-500/20' 
                          : 'bg-purple-500/10 text-purple-450 border border-purple-500/20'
                      }`}>
                        {project.type === 'dev' ? 'MERN Developer Build' : 'Cyber Security Analyzer'}
                      </span>
                      
                      <Typography variant="h4" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-2xl sm:text-3xl">
                        {project.title}
                      </Typography>
                    </div>
                    
                    <Typography variant="body1" className="text-[#8a8a93] font-light leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </Typography>
                    
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#8a8a93] pl-4 list-disc marker:text-indigo-500 font-light leading-relaxed">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[9px] font-mono rounded bg-white/[0.02] border border-white/5 text-[#8a8a93] uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 text-xs font-mono font-bold text-slate-350 transition-colors"
                      >
                        <svg className="w-[12px] h-[12px] fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg> Source Code
                      </a>
                    </div>
                  </Grid>

                  {/* Column 2: Visual Mockup Showcase */}
                  <Grid item xs={12} md={7}>
                    <div className="relative group glass-card rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl border border-white/5">
                      
                      {/* Browser Toolbar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0c] border-b border-white/[0.04]">
                        <div className="flex space-x-1.5">
                          <div className={`w-2 h-2 rounded-full ${project.type === 'dev' ? 'bg-indigo-500' : 'bg-purple-500'}`}></div>
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                        </div>
                        <div className="px-6 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] font-mono text-gray-500 select-none">
                          https://{project.title.toLowerCase().replace(/\s+/g, '-')}.raees.dev
                        </div>
                        <div className="w-4 h-4"></div>
                      </div>

                      {/* Project 1: Cinemas tabbed screenshots */}
                      {project.id === 1 && (
                        <div className="p-4 bg-black/40 flex flex-col space-y-4">
                          {/* Tabs */}
                          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-2 border-b border-white/[0.04]">
                            {[
                              { id: 'main', label: '🎬 Main Grid' },
                              { id: 'login', label: '🔐 Login' },
                              { id: 'watchlist', label: '📋 Watch List' },
                              { id: 'filter', label: '🔍 Filtered' },
                              { id: 'admin', label: '⚙️ Admin Panel' }
                            ].map(t => (
                              <button
                                key={t.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMovieTab(t.id);
                                }}
                                className={`px-3 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                                  movieTab === t.id 
                                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                                    : 'bg-white/[0.02] text-[#8a8a93] hover:text-white border border-transparent'
                                }`}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>

                          {/* Screenshot Frame */}
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              const imgMap: { [key: string]: string } = {
                                main: movieMainImg,
                                login: movieLoginImg,
                                watchlist: movieWatchlistImg,
                                filter: movieFilterImg,
                                admin: movieAdminImg
                              };
                              setLightboxImg(imgMap[movieTab]);
                              setLightboxOpen(true);
                            }}
                            className="relative rounded-xl overflow-hidden h-60 sm:h-72 bg-[#050507] border border-white/5 flex items-center justify-center cursor-zoom-in group/showcase"
                          >
                            {movieTab === 'main' && <img src={movieMainImg} alt="Cinemas Main Page" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {movieTab === 'login' && <img src={movieLoginImg} alt="Cinemas Login Form" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {movieTab === 'watchlist' && <img src={movieWatchlistImg} alt="Cinemas Watch List" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {movieTab === 'filter' && <img src={movieFilterImg} alt="Cinemas Filtered State" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {movieTab === 'admin' && <img src={movieAdminImg} alt="Cinemas Admin Panel" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            
                            <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.6)] pointer-events-none" />
                            
                            <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/5 text-[8px] font-mono text-indigo-400 opacity-60 group-hover/showcase:opacity-100 transition-opacity uppercase tracking-wider">
                              🔍 Click to enhance resolution
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Project 2: Threat Radar simulator */}
                      {project.id === 2 && (
                        <div className="p-6 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-6 select-none relative">
                          {/* Left Radar Widget */}
                          <div className="relative w-32 h-32 rounded-full border border-purple-500/25 bg-[#050507] flex items-center justify-center overflow-hidden flex-shrink-0">
                            <div className="absolute w-[75%] h-[75%] rounded-full border border-dashed border-purple-500/10"></div>
                            <div className="absolute w-[45%] h-[45%] rounded-full border border-dashed border-purple-500/10"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-purple-500/20 animate-radar-sweep origin-center rounded-full pointer-events-none"></div>
                            <div className="absolute top-[30%] left-[65%] w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]"></div>
                            <div className="absolute top-[70%] left-[25%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7] animate-ping"></div>
                            <span className="text-[8px] font-mono text-purple-400 font-bold">RADAR_IDS</span>
                          </div>

                          {/* Right Telemetry Panel */}
                          <div className="flex-1 w-full space-y-3 font-mono text-xs">
                            <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1.5">
                              <span className="text-slate-500">THREAT_LEVEL:</span>
                              <span className="text-purple-400 font-bold">0.02 (LOW)</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1.5">
                              <span className="text-slate-500">PORTS_AUDITED:</span>
                              <span className="text-slate-350 font-bold">64,532</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-500">SNORT_INTEGRITY:</span>
                              <span className="text-indigo-400 font-bold">OPTIMIZED</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Generic Mockup for projects 3, 4, 5 */}
                      {project.id >= 3 && (
                        <div className="p-8 bg-black/40 flex flex-col justify-center items-center h-52 text-center space-y-2">
                          <span className="text-3xl">💻</span>
                          <h5 className="font-mono text-xs font-semibold text-[#f4f4f7] uppercase tracking-wider">
                            SECURE SYSTEM SANDBOX ACTIVE
                          </h5>
                          <p className="text-[10px] text-[#8a8a93] max-w-sm leading-normal">
                            Codebase configured for production delivery. Database endpoints audited for secure REST data serialization.
                          </p>
                        </div>
                      )}

                    </div>
                  </Grid>

                </Grid>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};
