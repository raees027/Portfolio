import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Play } from 'lucide-react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: 'SOC Terminal Initialized.', type: 'info' },
    { text: 'Type "help" or click the chips below to query the database.', type: 'success' },
    { text: '', type: 'input' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const commands = {
    help: 'Available commands: whoami, skills, projects, certs, leetcode, hack, clear',
    whoami: `Name: Muhammed Raees Pareed
Role: Software Engineer & Cybersecurity Analyst
Location: Bangalore, India
Focus: Developing highly scalable web apps (MERN) and building secure systems.
Current: Assistant System Engineer (Cyber Security Analyst) at TCS.`,
    skills: `Languages: Java, JavaScript, Python, C++
Frontend: React.js, HTML5, CSS3, TypeScript
Backend: Node.js, Express.js, REST APIs, MongoDB, SQL
Tools: Docker, Kubernetes, Git, Postman, Linux`,
    projects: `1. Movie Dashboard: Full-stack MERN project featuring pagination, secure JWT auth, and search optimizations.
2. SOC Dashboard: React dashboard showing real-time security events, event logs, and an interactive shell interface.`,
    certs: `- Agile for Practitioners (TCS)
- React JS Essential Training (LinkedIn Learning)
- Web Design and Development (LinkedIn Learning)`,
    leetcode: `[SUCCESS] LeetCode Profile Verified:
- Total Solved: 50+ problems
- Topics: Arrays, HashMaps, Two-Pointers, Sliding Window, String manipulation.
- Focus: Optimization and space/time complexity analysis.`,
    hack: `[SYSTEM_ALERT] Initiating penetration testing simulation...
[INFO] Scanning target ports on 127.0.0.1...
[OK] Port 22 (SSH) - OPEN
[OK] Port 80 (HTTP) - OPEN
[OK] Port 443 (HTTPS) - OPEN
[OK] Port 5000 (API) - OPEN
[WARN] Found out-of-date packages in local dependency tree.
[SUCCESS] Scan complete. Vulnerabilities remediated: 0.`
  };

  const handleCommand = (cmdText) => {
    const trimmedCmd = cmdText.trim().toLowerCase();
    let newHistory = [...history];
    
    // Add user input to history
    newHistory.push({ text: `visitor@soc-terminal:~$ ${cmdText}`, type: 'input' });

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd in commands) {
      const output = commands[trimmedCmd];
      // Split output by newline to print line by line
      output.split('\n').forEach(line => {
        let type = 'info';
        if (line.includes('[SUCCESS]') || line.includes('[OK]')) type = 'success';
        else if (line.includes('[SYSTEM_ALERT]') || line.includes('[WARN]')) type = 'warning';
        else if (line.includes('Name:') || line.includes('Languages:')) type = 'highlight';
        newHistory.push({ text: line, type });
      });
    } else if (trimmedCmd === '') {
      // Empty input
    } else {
      newHistory.push({ text: `Command not found: "${cmdText}". Type "help" for a list of commands.`, type: 'error' });
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

  const handleChipClick = (cmd) => {
    handleCommand(cmd);
  };

  // Scroll to bottom on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex flex-col h-[400px] glass-panel border border-cyber-border rounded-lg overflow-hidden scanline-effect shadow-lg">
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-cyber-border">
        <div className="flex items-center space-x-2">
          <TermIcon size={16} className="text-cyber-glow" />
          <span className="font-mono text-xs font-semibold text-gray-400">soc_terminal_session.sh</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80"></div>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-1.5 bg-black/45">
        {history.map((line, idx) => {
          let color = 'text-gray-300';
          if (line.type === 'input') color = 'text-cyber-glow font-medium';
          else if (line.type === 'success') color = 'text-cyber-success';
          else if (line.type === 'warning') color = 'text-cyber-warning';
          else if (line.type === 'error') color = 'text-cyber-error';
          else if (line.type === 'highlight') color = 'text-cyber-violet';

          return (
            <div key={idx} className={`${color} whitespace-pre-wrap leading-relaxed`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Suggestion Chips (UI/UX Friendly) */}
      <div className="px-4 py-2.5 bg-slate-900/60 border-t border-cyber-border flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-500 font-mono font-medium">Quick Query:</span>
        {['whoami', 'skills', 'projects', 'certs', 'leetcode', 'hack'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleChipClick(cmd)}
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-slate-800 hover:bg-cyber-glow/15 hover:text-cyber-glow border border-slate-700 hover:border-cyber-glow transition-all duration-200"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={() => handleChipClick('clear')}
          className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-slate-800 text-red-400 hover:bg-red-500/10 hover:border-red-400/50 border border-slate-700 transition-all duration-200 ml-auto"
        >
          clear
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex bg-slate-950 border-t border-cyber-border items-center">
        <span className="pl-4 text-cyber-success font-mono text-sm font-semibold select-none">visitor@soc-terminal:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          className="flex-1 px-2 py-3 bg-transparent border-0 outline-none text-cyber-success font-mono text-sm focus:ring-0 focus:ring-offset-0"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-slate-900 border-l border-cyber-border text-cyber-glow hover:bg-cyber-glow/10 transition-colors"
        >
          <Play size={14} className="fill-current" />
        </button>
      </form>
    </div>
  );
};

export default Terminal;
