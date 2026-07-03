import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Play } from 'lucide-react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: 'visitor@soc-session:~$ help', type: 'input' },
    { text: 'SOC Terminal Session Initialized.', type: 'info' },
    { text: 'Type "help" or click the chips below to query portfolio records.', type: 'success' },
    { text: 'Try running "hack" to trigger active network sweep logging.', type: 'warning' },
    { text: '', type: 'input' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const commands = {
    help: 'Available commands: whoami, skills, projects, certs, hack, clear',
    whoami: `Muhammed Raees Pareed
Role: Assistant System Engineer & Cybersecurity Analyst at TCS
Location: Bangalore, India
Focus: Core MERN stack architectures, secure code auditing, incident telemetry analysis.`,
    skills: `Languages: Java, JavaScript, TypeScript, Python, C++
Frontend: React.js, Vite, Tailwind CSS, Material UI, Redux Toolkit
Backend: Node.js, Express.js, Spring Boot, REST APIs, JWT Auth
Databases & Cache: MongoDB, Oracle DB, MySQL
Operations: Docker, Git, Postman, Linux command consoles`,
    projects: `1. Cinemas Movie Dashboard: Fullstack MERN discovery site featuring cursor pagination and watchlist caching.
2. SOC Threat Radar: Live logs sweep dashboard featuring interactive CLI console logging ports.
3. Flight Booking System: Spring Boot relational ticket manager using optimistic transactional lock versioning.`,
    certs: `- TCS Enterprise Java Full Stack verified credentials.
- TCS Cybersecurity Operations Bootcamp certification.
- React JS Essential Training verified certificate.`,
    hack: `[SYSTEM_ALERT] Initiating penetration testing simulation...
[INFO] Scanning target ports on localhost API endpoint...
[OK] Port 22 (SSH) - ACTIVE
[OK] Port 80 (HTTP) - ACTIVE
[OK] Port 443 (HTTPS) - ACTIVE
[OK] Port 5000 (API Server) - OPEN
[SUCCESS] Dispatched simulated threat telemetry logs packet to backend console database.`
  };

  const handleCommand = async (cmdText) => {
    const trimmedCmd = cmdText.trim().toLowerCase();
    let newHistory = [...history];
    
    // Add user input to history
    newHistory.push({ text: `visitor@soc-session:~$ ${cmdText}`, type: 'input' });

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'hack') {
      // Trigger fullstack logging payload
      try {
        await fetch('http://localhost:5000/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceIp: '185.220.101.4',
            event: 'Penetration Scan Triggered via SOC CLI',
            severity: 'HIGH',
            status: 'BLOCKED',
            targetPort: 5000
          })
        });
      } catch {
        console.warn('API offline - falling back to simulated output');
      }
    }

    if (trimmedCmd in commands) {
      const output = commands[trimmedCmd];
      output.split('\n').forEach(line => {
        let type = 'info';
        if (line.includes('[SUCCESS]') || line.includes('[OK]')) type = 'success';
        else if (line.includes('[SYSTEM_ALERT]') || line.includes('[WARN]')) type = 'warning';
        else if (line.includes('Role:') || line.includes('Frontend:')) type = 'highlight';
        newHistory.push({ text: line, type });
      });
    } else if (trimmedCmd === '') {
      // No output
    } else {
      newHistory.push({ text: `Command not found: "${cmdText}". Type "help" for options.`, type: 'error' });
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    // Basic Tab auto-completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const possibleCmds = ['whoami', 'skills', 'projects', 'certs', 'hack', 'clear'];
      const match = possibleCmds.find(c => c.startsWith(input));
      if (match) {
        setInput(match);
      }
    }
  };

  const handleChipClick = (cmd) => {
    handleCommand(cmd);
  };

  // Scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex flex-col h-[400px] glass-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl bg-slate-950/40">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0c] border-b border-white/[0.04]">
        <div className="flex items-center space-x-2">
          <TermIcon size={14} className="text-cyber-accent-cyan" />
          <span className="font-mono text-[10px] font-bold text-slate-500">soc_terminal_session.sh</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
      </div>

      {/* Output Console */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-none bg-[#050816]/20">
        {history.map((line, idx) => {
          let color = 'text-slate-350';
          if (line.type === 'input') color = 'text-cyber-accent-cyan font-bold';
          else if (line.type === 'success') color = 'text-cyber-accent-cyan';
          else if (line.type === 'warning') color = 'text-amber-450';
          else if (line.type === 'error') color = 'text-red-400';
          else if (line.type === 'highlight') color = 'text-cyber-accent-purple';

          return (
            <div key={idx} className={`${color} whitespace-pre-wrap leading-relaxed`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Chips */}
      <div className="px-4 py-2 bg-[#0a0a0c]/80 border-t border-white/[0.04] flex flex-wrap gap-2 items-center text-[10px] font-mono">
        <span className="text-slate-500 font-bold">Quick Query:</span>
        {['whoami', 'skills', 'projects', 'certs', 'hack'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleChipClick(cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 hover:border-cyber-accent-cyan/30 hover:text-cyber-accent-cyan text-slate-400 font-bold transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={() => handleChipClick('clear')}
          className="px-2 py-0.5 rounded bg-slate-900 text-red-400 hover:bg-red-500/10 hover:border-red-400/50 border border-white/5 font-bold transition-colors ml-auto cursor-pointer"
        >
          clear
        </button>
      </div>

      {/* Command Input Form */}
      <form onSubmit={handleSubmit} className="flex bg-[#050816]/90 border-t border-white/[0.04] items-center">
        <span className="pl-4 text-cyber-accent-cyan font-mono text-xs font-bold select-none">visitor@soc-session:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (tab auto-completes)..."
          className="flex-1 px-2 py-3 bg-transparent border-0 outline-none text-cyber-accent-cyan font-mono text-xs focus:ring-0 focus:ring-offset-0"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-[#0a0a0c] border-l border-white/[0.04] text-cyber-accent-cyan hover:bg-cyber-accent-cyan/5 transition-colors cursor-pointer"
        >
          <Play size={10} className="fill-current" />
        </button>
      </form>
    </div>
  );
};

export default Terminal;
