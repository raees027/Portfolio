import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Play } from 'lucide-react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: 'visitor@soc-session:~$ help', type: 'input' },
    { text: 'SOC Terminal Session Initialized.', type: 'info' },
    { text: 'Type "help" or click the chips below to query portfolio records.', type: 'success' },
    { text: 'Try running "hack" to trigger active network sweep logging.', type: 'warning' },
    { text: 'You can also execute JS math/logic: try typing "run Math.sqrt(81) * 5".', type: 'info' },
    { text: '', type: 'input' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);
  const isInitialMount = useRef(true);

  const commands = {
    help: 'Available commands: whoami, skills, projects, certs, hack, run [js_code], clear',
    whoami: `Muhammed Raees Pareed
Role: Assistant System Engineer & Cybersecurity Analyst at TCS
Location: Bangalore, India
Focus: Core MERN stack architectures, web security audits, and threat telemetry analysis.`,
    skills: `Languages: JavaScript, TypeScript (Basic), Python, Java, C++
Frontend: React.js, HTML5, CSS3, Material UI, Responsive UI Development
Backend: Node.js, Express.js, REST APIs
Databases: MongoDB, SQL
Operations: Git, GitHub, Postman, Docker, Kubernetes, Linux command CLI`,
    projects: `1. Cinemas Movie Dashboard: Fullstack MERN movies platform featuring modular UI components, watchlist records, and pagination.
2. ScamShield: Fullstack security scanner and reporter platform blocking fraudulent UPIs, phone numbers, and URLs (React Native/Expo & Express/PostgreSQL).`,
    certs: `- React JS Essential Training (LinkedIn Learning) verified credentials.
- Introduction to Web Design and Development (LinkedIn Learning) verified credentials.
- Process: Agile for Practitioners Assessment (TCS / Agile) verified credentials.`,
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

    if (trimmedCmd.startsWith('run ')) {
      const code = cmdText.substring(4);
      try {
        // Safe evaluation in local context (purely client-side sandboxed return)
        const result = Function(`"use strict"; return (${code})`)();
        newHistory.push({ text: `=> ${result !== undefined ? result : 'undefined'}`, type: 'success' });
      } catch (err) {
        newHistory.push({ text: `[ERROR] ${err.message}`, type: 'error' });
      }
      setHistory(newHistory);
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Scroll to bottom
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className="w-full glass-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-96 relative z-10">
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0c] border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <TermIcon size={13} className="text-blue-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#8a8a93] uppercase">soc_terminal_session.sh</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
        </div>
      </div>

      {/* Terminal Output Logs */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-none bg-[#050816]/20">
        {history.map((log, idx) => (
          <div 
            key={idx} 
            className={`leading-relaxed whitespace-pre-wrap ${
              log.type === 'input' ? 'text-slate-200' :
              log.type === 'success' ? 'text-emerald-400 font-bold' :
              log.type === 'warning' ? 'text-purple-400 font-bold' :
              log.type === 'error' ? 'text-rose-500' :
              log.type === 'highlight' ? 'text-cyan-400 font-bold' : 'text-slate-400 font-light'
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Command input prompt form */}
      <form onSubmit={handleSubmit} className="flex items-center border-t border-white/[0.04] bg-[#050816]/40 px-4 py-2.5">
        <span className="font-mono text-xs text-blue-500 font-bold mr-2 select-none">visitor@soc-session:~$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type command...'
          className="flex-grow bg-transparent border-0 outline-none text-slate-200 font-mono text-xs focus:ring-0 focus:ring-offset-0 placeholder-slate-700"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button type="submit" className="text-slate-500 hover:text-white cursor-pointer select-none">
          <Play size={12} fill="currentColor" />
        </button>
      </form>

      {/* Suggestion Quick Chips */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-white/[0.02] flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
        {['whoami', 'skills', 'projects', 'certs', 'hack', 'clear'].map(cmd => (
          <button 
            key={cmd}
            onClick={() => handleChipClick(cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-[9px] font-mono text-slate-500 hover:text-white hover:border-blue-500/20 transition-all cursor-pointer font-bold uppercase"
          >
            {cmd}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Terminal;
