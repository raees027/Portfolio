import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Metrics from '../components/Metrics';
import Charts from '../components/Charts';
import { GithubCalendar } from '../components/GithubCalendar';
import { Activity, Wifi } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  sourceIp: string;
  event: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: string;
  targetPort: number;
}

export const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/logs');
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
          setIsConnected(true);
        } else {
          throw new Error('API offline');
        }
      } catch {
        setIsConnected(false);
        // Fallback generator for mock logs if backend is offline
        generateLocalMockLogs();
      }
    };

    const generateLocalMockLogs = () => {
      const mockIp = ['185.220.101.4', '45.142.120.9', '192.168.1.15', '82.102.23.41', '198.51.100.72'];
      const mockEvents = ['SQL Injection Detected', 'SSH Brute Force Attempt', 'Port Scan Activity', 'OWASP Top 10 RCE Scan', 'Unauthorized Login Attempt'];
      const mockSeverity = ['CRITICAL', 'HIGH', 'MEDIUM', 'CRITICAL', 'HIGH'] as const;
      const mockStatus = ['BLOCKED', 'BLOCKED', 'CONTAINED', 'BLOCKED', 'RESOLVED'];
      const mockPorts = [443, 22, 80, 8080, 22];

      const entries: LogEntry[] = [];
      for (let i = 0; i < 5; i++) {
        entries.push({
          timestamp: new Date(Date.now() - i * 3600000).toISOString(),
          sourceIp: mockIp[i],
          event: mockEvents[i],
          severity: mockSeverity[i],
          status: mockStatus[i],
          targetPort: mockPorts[i]
        });
      }
      setLogs(entries);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 4000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 bg-red-950/20 border-red-800/30';
      case 'HIGH': return 'text-amber-450 bg-amber-950/20 border-amber-800/30';
      case 'MEDIUM': return 'text-purple-400 bg-purple-950/20 border-purple-800/30';
      default: return 'text-cyan-400 bg-cyan-950/20 border-cyan-800/30';
    }
  };

  return (
    <section id="dashboard" className="py-24 border-b border-white/5 relative z-10 bg-[#050816]">
      <Container maxWidth="lg" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-center gap-6 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <span className="font-mono text-xs text-cyber-accent-cyan font-bold uppercase tracking-widest block">
              SECURITY OPERATIONS CENTER
            </span>
            <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
              Real-Time Coding & Threat Dashboard
            </Typography>
            <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2"></div>
          </div>

          {/* Connection Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/[0.04] text-[10px] font-mono font-bold tracking-wide">
            <Wifi size={12} className={isConnected ? 'text-emerald-400 animate-pulse' : 'text-purple-400'} />
            <span className="text-[#8a8a93]">SOC CONNECTIVITY:</span>
            <span className={isConnected ? 'text-emerald-400' : 'text-purple-400'}>
              {isConnected ? 'ONLINE (REST API)' : 'LOCAL FALLBACK'}
            </span>
          </div>
        </div>

        {/* 1. Global Metrics Summary */}
        <Metrics />

        {/* 2. Charts (Telemetry & Competency) */}
        <Charts />

        {/* 3. Bottom Row: GitHub Contribution Calendar & Live Event Stream */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GithubCalendar />
          </div>
          
          {/* Live Incident Log Terminal view */}
          <div className="md:col-span-5">
            <div className="glass-card p-5 rounded-2xl border border-white/5 h-full flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-red-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#8a8a93] uppercase">LIVE THREAT FEED (IDS)</span>
                </div>
                <span className="text-[8px] font-mono bg-red-500/10 border border-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold">MONITORING</span>
              </div>

              {/* Feed logs lists */}
              <div className="flex-1 overflow-y-auto space-y-2 max-h-[140px] scrollbar-none font-mono text-[10px] leading-relaxed">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-3 p-2 bg-slate-950/60 rounded border border-white/[0.02]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span className="text-slate-355 font-bold">{log.sourceIp}</span>
                      </div>
                      <div className="text-slate-400">{log.event}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 border-t border-white/[0.02] pt-2">
                <span>PORT SCOPE: 22, 80, 443, 8080</span>
                <span>PACKETS AUDITED: 64k</span>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
};
export default Dashboard;
