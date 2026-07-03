import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

const securityData = [
  { time: '16:00', 'Blocked Scans': 12, 'Auth Failures': 34 },
  { time: '17:00', 'Blocked Scans': 18, 'Auth Failures': 45 },
  { time: '18:00', 'Blocked Scans': 42, 'Auth Failures': 98 },
  { time: '19:00', 'Blocked Scans': 15, 'Auth Failures': 24 },
  { time: '20:00', 'Blocked Scans': 28, 'Auth Failures': 56 },
  { time: '21:00', 'Blocked Scans': 35, 'Auth Failures': 62 }
];

const skillData = [
  { name: 'React.js', rating: 90, color: '#06b6d4' },
  { name: 'Node.js', rating: 85, color: '#8b5cf6' },
  { name: 'MongoDB', rating: 80, color: '#10b981' },
  { name: 'Express.js', rating: 85, color: '#f59e0b' },
  { name: 'Security Auditing', rating: 75, color: '#ef4444' },
  { name: 'Docker / K8s', rating: 70, color: '#64748b' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950 border border-cyber-border p-3 rounded shadow-lg font-mono text-xs">
        <p className="text-gray-400 font-semibold mb-1">{`Time Frame: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Security Telemetry (Line Chart) */}
      <div className="glass-panel p-5 border border-cyber-border rounded-lg bg-slate-900/30 flex flex-col h-[320px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">TELEMETRY: SECURITY THREAT LOGS</span>
          <span className="text-[10px] font-mono text-cyber-success bg-cyber-success/10 px-2 py-0.5 rounded border border-cyber-success/20">LIVE DATA</span>
        </div>
        <div className="flex-1 w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={securityData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              <Line type="monotone" dataKey="Blocked Scans" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="Auth Failures" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tech Stack Competency (Bar Chart) */}
      <div className="glass-panel p-5 border border-cyber-border rounded-lg bg-slate-900/30 flex flex-col h-[320px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">METRICS: SKILLS FREQUENCY</span>
          <span className="text-[10px] font-mono text-cyber-violet bg-cyber-violet/10 px-2 py-0.5 rounded border border-cyber-violet/20">MERN + SECURITY</span>
        </div>
        <div className="flex-1 w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.05)" />
              <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={100} />
              <Tooltip cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }} formatter={(value) => [`${value}% Skill Depth`, 'Competency']} wrapperStyle={{ fontFamily: 'monospace', fontSize: '11px' }} />
              <Bar dataKey="rating" radius={[0, 4, 4, 0]} barSize={12}>
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
