import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, HardDrive, Award, Code } from 'lucide-react';

const Metrics = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: 'LEETCODE PROFILE',
      value: '50+ DSA SOLVED',
      icon: <Code className="text-cyber-glow" size={20} />,
      desc: 'Data Structures & Algos',
      shadow: 'shadow-glow-cyan'
    },
    {
      label: 'THREAT CONSOLE',
      value: 'STATUS: SECURE',
      icon: <ShieldCheck className="text-cyber-success" size={20} />,
      desc: 'IDS Status: MONITORING',
      shadow: 'shadow-glow-green'
    },
    {
      label: 'MERN REPOSITORIES',
      value: '2 PRODUCTION READY',
      icon: <HardDrive className="text-cyber-violet" size={20} />,
      desc: 'API status: ONLINE',
      shadow: 'shadow-glow-violet'
    },
    {
      label: 'CERTIFICATION MARKS',
      value: '3 COMPLETED',
      icon: <Award className="text-cyber-warning" size={20} />,
      desc: 'Continuous Learning: ON',
      shadow: 'shadow-glow-warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`glass-panel p-4 flex items-center justify-between border border-cyber-border rounded-lg ${stat.shadow} bg-slate-900/40 relative overflow-hidden`}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] tracking-widest text-gray-500 font-mono font-bold uppercase">{stat.label}</span>
            <span className="text-lg font-bold text-gray-100 font-sans tracking-wide">{stat.value}</span>
            <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-success animate-ping"></span>
              {stat.desc}
            </span>
          </div>
          <div className="p-2.5 bg-slate-950/60 rounded-md border border-slate-800">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
