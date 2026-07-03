import React from 'react';

export const GithubCalendar: React.FC = () => {
  // Generate mock contribution calendar data for 53 weeks x 7 days
  const weeks = 28; // Reduced columns to render beautifully on card layouts without overflows
  const days = 7;
  
  // Set up random seed so calendar grid layout is stable
  const getContributionColor = (col: number, row: number) => {
    // Stable pseudo-random based on col and row
    const val = (Math.sin(col * 12.9898 + row * 78.233) * 43758.5453) % 1;
    const absVal = Math.abs(val);

    if (absVal < 0.4) {
      return 'bg-slate-900 border-white/[0.02]'; // No contributions
    } else if (absVal < 0.7) {
      return 'bg-emerald-950/40 border-emerald-900/10'; // Low
    } else if (absVal < 0.88) {
      return 'bg-emerald-800/40 border-emerald-700/20'; // Medium
    } else if (absVal < 0.96) {
      return 'bg-emerald-600/60 border-emerald-500/20'; // High
    } else {
      return 'bg-emerald-400 border-emerald-300/20'; // Very High
    }
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold tracking-widest text-[#8a8a93] uppercase">GITHUB CONTRIBUTION GRAPH</span>
        </div>
        <a 
          href="https://github.com/raees027" 
          target="_blank" 
          rel="noreferrer"
          className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 font-bold uppercase transition-colors"
        >
          @raees027 →
        </a>
      </div>

      {/* Grid wrapper */}
      <div className="overflow-x-auto scrollbar-none py-1">
        <div className="flex flex-row gap-[3px] min-w-[380px] justify-center items-center">
          {Array.from({ length: weeks }).map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-[3px]">
              {Array.from({ length: days }).map((_, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`w-[10px] h-[10px] rounded-[1.5px] border ${getContributionColor(colIdx, rowIdx)} transition-colors duration-300 hover:scale-110 hover:border-emerald-400`}
                  title={`Contributions: stable query logs`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats details bar */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.04] text-center font-mono">
        <div className="space-y-0.5">
          <div className="text-[10px] text-slate-500 font-bold uppercase">YEAR TOTAL</div>
          <div className="text-sm font-black text-slate-200">1,482 commits</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] text-slate-500 font-bold uppercase">ACTIVE STREAK</div>
          <div className="text-sm font-black text-emerald-400">42 days</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] text-slate-500 font-bold uppercase">REPOSITORIES</div>
          <div className="text-sm font-black text-slate-200">24 active</div>
        </div>
      </div>
    </div>
  );
};
