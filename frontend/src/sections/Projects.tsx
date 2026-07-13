import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { PROJECTS_DATA } from '../constants';

// Import movie screenshots
import movieMainImg from '../assets/movie_main.png';
import movieLoginImg from '../assets/movie_login.png';
import movieWatchlistImg from '../assets/movie_watchlist.png';
import movieFilterImg from '../assets/movie_filter.png';
import movieAdminImg from '../assets/movie_admin.png';

// Import ScamShield screenshots
import scamWebImg from '../assets/scamshield_web.png';
import scamExplainImg from '../assets/scamshield_explain.png';
import scamExtensionImg from '../assets/scamshield_extension.png';
import scamMobileHomeImg from '../assets/scamshield_mobile_home.jpg';
import scamMobileReportImg from '../assets/scamshield_mobile_report.jpg';
import scamMobileStatsImg from '../assets/scamshield_mobile_stats.jpg';

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
  const [scamTab, setScamTab] = useState<string>('web');

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => sysMode === 'dual' || p.type === sysMode
  );

  return (
    <section id="projects" className="py-24 border-b border-white/5 relative z-10 bg-[#050816]">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Header with Mode Toggle */}
        <div className="flex flex-wrap justify-between items-center gap-6 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <span className="font-mono text-xs text-blue-500 font-bold uppercase tracking-widest block">
              PORTFOLIO SHOWCASE
            </span>
            <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
              Featured Projects
            </Typography>
            <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2"></div>
          </div>

          {/* Mode Selector System Toggle */}
          <div className="inline-flex p-1 bg-slate-900 border border-white/5 rounded-full font-mono text-[10px] gap-1 z-30">
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
                      ? 'bg-blue-600/20 text-cyan-400 border border-blue-500/30' 
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-slate-500 hover:text-white border border-transparent'
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
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Column 1: Project Details */}
                  <div className="w-full md:w-[45%] space-y-5">
                    <div className="space-y-2">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${
                        project.type === 'dev' 
                          ? 'bg-blue-500/10 text-cyan-450 border border-blue-500/20' 
                          : 'bg-purple-500/10 text-purple-450 border border-purple-500/20'
                      }`}>
                        {project.type === 'dev' ? 'MERN Developer Build' : 'Cyber Security Analyzer'}
                      </span>
                      
                      <Typography variant="h4" className="font-oswald font-extrabold text-slate-100 tracking-tight uppercase text-2xl sm:text-3xl">
                        {project.title}
                      </Typography>
                    </div>
                    
                    <Typography variant="body1" className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </Typography>
                    
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400 pl-4 list-disc marker:text-blue-500 font-light leading-relaxed">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 border border-white/5 text-slate-500 uppercase font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Dynamic Case Studies deep links */}
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <Link 
                        to={`/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-mono font-bold text-white transition-all shadow-md"
                      >
                        View Case Study →
                      </Link>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 border border-white/5 hover:border-blue-500/30 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors"
                      >
                        Source Code
                      </a>
                    </div>
                  </div>

                  {/* Column 2: Visual Mockup Showcase */}
                  <div className="w-full md:w-[55%]">
                    <div className="relative group glass-card rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl border border-white/5">
                      
                      {/* Browser Toolbar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0c] border-b border-white/[0.04]">
                        <div className="flex space-x-1.5">
                          <div className={`w-2 h-2 rounded-full ${project.type === 'dev' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
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
                                    ? 'bg-blue-600/20 text-cyan-400 border border-blue-500/30' 
                                    : 'bg-slate-900 text-slate-500 hover:text-white border border-transparent'
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
                            
                            <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/5 text-[8px] font-mono text-cyan-400 opacity-60 group-hover/showcase:opacity-100 transition-opacity uppercase tracking-wider">
                              🔍 Click to enhance resolution
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Project 2: ScamShield tabbed screenshots */}
                      {project.id === 2 && (
                        <div className="p-4 bg-black/40 flex flex-col space-y-4">
                          {/* Tabs */}
                          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-2 border-b border-white/[0.04]">
                            {[
                              { id: 'web', label: '🖥️ Web Dashboard' },
                              { id: 'mobile-home', label: '📱 Mobile Home' },
                              { id: 'mobile-report', label: '📋 Mobile Report' },
                              { id: 'mobile-stats', label: '📊 Mobile Stats' },
                              { id: 'extension', label: '🔌 Extension Popup' },
                              { id: 'explain', label: '🔍 Scam Handles' }
                            ].map(t => (
                              <button
                                key={t.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setScamTab(t.id);
                                }}
                                className={`px-3 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                                  scamTab === t.id 
                                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                                    : 'bg-slate-900 text-slate-500 hover:text-white border border-transparent'
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
                                web: scamWebImg,
                                'mobile-home': scamMobileHomeImg,
                                'mobile-report': scamMobileReportImg,
                                'mobile-stats': scamMobileStatsImg,
                                extension: scamExtensionImg,
                                explain: scamExplainImg
                              };
                              setLightboxImg(imgMap[scamTab]);
                              setLightboxOpen(true);
                            }}
                            className={`relative rounded-xl overflow-hidden h-60 sm:h-72 bg-[#050507] border border-white/5 flex items-center justify-center cursor-zoom-in group/showcase transition-all duration-300 ${
                              scamTab.startsWith('mobile-')
                                ? 'w-[110px] sm:w-[130px] mx-auto shadow-[0_0_25px_rgba(168,85,247,0.1)] border-purple-500/20'
                                : 'w-full'
                            }`}
                          >
                            {scamTab === 'web' && <img src={scamWebImg} alt="ScamShield Web Dashboard" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {scamTab === 'mobile-home' && <img src={scamMobileHomeImg} alt="ScamShield Mobile Home" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {scamTab === 'mobile-report' && <img src={scamMobileReportImg} alt="ScamShield Mobile Report" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {scamTab === 'mobile-stats' && <img src={scamMobileStatsImg} alt="ScamShield Mobile Stats" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {scamTab === 'extension' && <img src={scamExtensionImg} alt="ScamShield Extension Popup" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            {scamTab === 'explain' && <img src={scamExplainImg} alt="ScamShield Impersonation Handles" className="w-full h-full object-contain transition-transform duration-500 group-hover/showcase:scale-[1.01]" />}
                            
                            <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.6)] pointer-events-none" />
                            
                            <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/5 text-[8px] font-mono text-purple-400 opacity-60 group-hover/showcase:opacity-100 transition-opacity uppercase tracking-wider">
                              🔍 Click to enhance resolution
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Generic Mockup for projects 3, 4, 5 */}
                      {project.id >= 3 && (
                        <div className="p-8 bg-black/40 flex flex-col justify-center items-center h-52 text-center space-y-2">
                          <span className="text-3xl">💻</span>
                          <h5 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
                            SECURE SYSTEM SANDBOX ACTIVE
                          </h5>
                          <p className="text-[10px] text-slate-500 max-w-sm leading-normal">
                            Codebase configured for production delivery. Database endpoints audited for secure REST data serialization.
                          </p>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};
export default Projects;
