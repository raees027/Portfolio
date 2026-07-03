import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { ArrowLeft, Cpu, ShieldAlert, Award } from 'lucide-react';
import { CASE_STUDIES } from '../constants/caseStudies';

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = CASE_STUDIES[Number(id)];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050816] text-[#f4f4f7] flex items-center justify-center font-mono p-6">
        <div className="text-center space-y-4 max-w-md">
          <ShieldAlert size={40} className="text-red-400 mx-auto animate-pulse" />
          <Typography variant="h5" className="font-bold uppercase tracking-wider">Project Audit Failed</Typography>
          <Typography className="text-xs text-slate-500">Case study index '{id}' was not found in the portfolio repository. Check index values.</Typography>
          <Link 
            to="/" 
            className="inline-block mt-4 px-5 py-2.5 rounded-full bg-white text-black font-sans font-bold text-xs uppercase hover:bg-white/95 transition-all"
          >
            Return to Port
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-[#f4f4f7] py-24 select-none">
      {/* Background spotlights */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30vh] right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <Container maxWidth="md" className="space-y-12 relative z-10">
        {/* Navigation Head */}
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Terminal
          </Link>
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${
            project.type === 'dev' 
              ? 'bg-blue-500/10 text-cyan-400 border border-blue-500/20' 
              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
          }`}>
            {project.type === 'dev' ? 'MERN Developer Build' : 'Cyber Security Analyzer'}
          </span>
        </div>

        {/* Title Group */}
        <div className="space-y-4">
          <h1 className="font-oswald text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-[#8a8a93] uppercase tracking-tight">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base font-mono text-cyan-400">
            // {project.subtitle}
          </p>
        </div>

        {/* Tech Stack Capsule row */}
        <div className="flex flex-wrap gap-2 py-2 border-y border-white/[0.04]">
          {project.tech.map((t) => (
            <span 
              key={t}
              className="px-2.5 py-1 text-[10px] font-mono rounded bg-[#0f172a] border border-white/5 text-slate-400 uppercase font-bold"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Case Study Detailed Breakdown */}
        <div className="space-y-10 font-sans text-sm text-slate-350 leading-relaxed font-light">
          
          {/* Section: Problem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#f4f4f7] uppercase flex items-center gap-2">
              <ShieldAlert size={14} className="text-red-400" /> [01] Problem Statement
            </h4>
            <p>{project.problem}</p>
          </div>

          {/* Section: Research */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#f4f4f7] uppercase flex items-center gap-2">
              <Cpu size={14} className="text-cyan-400" /> [02] Research & Diagnostics
            </h4>
            <p>{project.research}</p>
          </div>

          {/* Section: Planning */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#f4f4f7] uppercase flex items-center gap-2">
              <Award size={14} className="text-purple-400" /> [03] Planning & Architecture
            </h4>
            <p>{project.planning}</p>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.04] text-xs font-mono leading-relaxed space-y-1.5 text-slate-400 mt-2">
              <div className="text-cyan-400 font-bold uppercase text-[9px] tracking-wider">// SYSTEM ARCHITECTURE STATE</div>
              <p>{project.architecture}</p>
            </div>
          </div>

          {/* Section: Implementation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#f4f4f7] uppercase flex items-center gap-2">
              <Cpu size={14} className="text-blue-400" /> [04] Technical Implementation
            </h4>
            <p>{project.implementation}</p>
          </div>

          {/* Code Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#f4f4f7] uppercase">
                [05] Repository Snippet
              </h4>
              <span className="text-[9px] font-mono text-slate-500">TYPESCRIPT / JAVA</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-white/[0.04] overflow-x-auto text-[11px] font-mono leading-relaxed text-emerald-400 scrollbar-none">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>

          {/* Section: Results */}
          <div className="space-y-3 border-t border-white/[0.04] pt-8">
            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <Award size={14} className="text-emerald-400" /> [06] Key Results & Metrics
            </h4>
            <p>{project.results}</p>
          </div>

          {/* Section: Retrospective */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#f4f4f7] uppercase">
              [07] Retrospective & Lessons Learned
            </h4>
            <p>{project.lessons}</p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Return to Home
          </Link>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/raees027" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/30 transition-colors flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

      </Container>
    </div>
  );
};
