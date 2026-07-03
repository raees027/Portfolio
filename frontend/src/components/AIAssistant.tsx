import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: "Hello! I'm **Raees AI**, a virtual product assistant trained on Muhammed Raees Pareed's portfolio data. Ask me anything about his technical skills, projects, certifications, or professional experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Tell me about Raees",
    "What technologies does he know?",
    "Show portfolio projects",
    "Certifications",
    "Career goals"
  ];

  // Predefined Answers Repository
  const portfolioQA: { keywords: string[]; answer: string }[] = [
    {
      keywords: ['about', 'raees', 'whoami', 'who is', 'muhammed'],
      answer: `**Muhammed Raees Pareed** is an Assistant System Engineer at **Tata Consultancy Services (TCS)** since May 2024.
      
He bridges the gap between **Frontend Development** (Vite, React, TypeScript, Tailwind) and **Cybersecurity Analytics** (SIEM logs auditing, threat feeds scanning).
- **Core Focus**: Designing secure MERN stacks, implementing client-side pagination structures, guarding REST API endpoints, and orchestrating vector embeddings for RAG systems.`
    },
    {
      keywords: ['skills', 'technologies', 'languages', 'tech', 'stack'],
      answer: `Raees operates across multiple technical dimensions:
      
- **Frontend Layer**: React.js, TypeScript, JavaScript, Tailwind CSS, Material UI, Redux Toolkit, Vite, HTML5/CSS3.
- **Backend Services**: Node.js, Express.js, Java, Spring Boot, REST APIs.
- **Databases & Cache**: MySQL, Oracle DB, MongoDB.
- **Tools & Operations**: Git, Docker, Postman, Linux command consoles.
- **AI & Data Ops**: OpenAI APIs, Pinecone Vector DB, LangChain schemas.`
    },
    {
      keywords: ['projects', 'portfolio', 'showcase'],
      answer: `Here are the key featured projects built by Raees:
      
1. **SOC Threat Radar Analyzer**: Interactive network logs dashboard with a terminal console to simulate active incident sweeps and port scan mitigations (React, Express, Recharts).
2. **Cinemas Movie Dashboard**: MERN database search platform featuring JWT authenticated watchlist storage and debounced query optimization.
3. **Flight Reservation System**: Java Spring Boot backend with JPA optimistic locking to resolve ticket double-booking conditions (React, MySQL).
4. **Vehicle Insurance System**: Oracle-based Spring MVC workflow mapping calculator models (Java, PL/SQL).
5. **RAG Agent AI Project**: OpenAI document chunking assistant with vector store lookup context filters (Pinecone, LangChain).`
    },
    {
      keywords: ['certifications', 'certs', 'verified', 'credentials'],
      answer: `Raees holds verified certifications across frontend development and cybersecurity:
      
- **Java Full Stack Enterprise ILP**: TCS Academy credentials.
- **Cybersecurity Analyst Bootcamp**: TCS Academy incident management training.
- **React Essential Training**: Verified LinkedIn Learning credentials.
- **Generative AI Foundations & RAG Architectures**: Ongoing curriculum.`
    },
    {
      keywords: ['goals', 'career', 'future', 'objective'],
      answer: `His future career objective is to become a **Senior AI Security Engineer**.
      
He aims to build secure systems and design defense frameworks that guard generative AI models against exploitation vectors (such as prompt injections, training data contamination, and adversarial leaks).`
    },
    {
      keywords: ['contact', 'email', 'hire', 'linkedin', 'github'],
      answer: `You can reach out to Muhammed Raees Pareed via the following channels:
      
- **Email**: [raeeskp02@gmail.com](mailto:raeeskp02@gmail.com)
- **LinkedIn**: [in/raees-muhammed-](https://www.linkedin.com/in/raees-muhammed-/)
- **GitHub**: [github.com/raees027](https://github.com/raees027)
- **Location**: Bangalore, India / Cochin, Kerala.`
    },
    {
      keywords: ['tcs', 'experience', 'work', 'job', 'assistant'],
      answer: `Raees has been working as an **Assistant System Engineer** at **TCS** since May 2024.
      
**Key Contributions**:
- Maintained reusable UI components for secure dashboard layers using React.
- Audited repository codes to remediate exploit patterns.
- Managed port scanning logs and automated alerting grids.
- Completed fullstack training in Spring Boot enterprise architectures.`
    }
  ];

  const handleQuery = (textQuery: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: textQuery };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const cleanQuery = textQuery.trim().toLowerCase();

    // Find best answer matching keywords
    let match = portfolioQA.find(qa => 
      qa.keywords.some(keyword => cleanQuery.includes(keyword))
    );

    let replyText = "I'm sorry, I couldn't find a specific portfolio answer for that query. Try asking about his **skills**, **projects**, **certifications**, **experience at TCS**, or **career goals**!";

    if (match) {
      replyText = match.answer;
    }

    setTimeout(() => {
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: replyText };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleQuery(input);
    setInput('');
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-[90] font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-wider shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <Bot size={16} className="group-hover:rotate-12 transition-transform" />
          <span>ASK RAEES AI</span>
          <Sparkles size={12} className="text-cyan-300 animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[330px] sm:w-[380px] h-[480px] bg-slate-950/95 border border-white/[0.06] rounded-2xl shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Ask Raees AI</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] text-slate-400 font-mono">PORTFOLIO DATA SHELL</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/[0.02] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-none bg-[#050816]/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-900 text-[#e2e8f0] rounded-bl-none border border-white/[0.03]'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div className="markdown-content space-y-1.5 prose prose-invert prose-xs">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 text-[#e2e8f0] rounded-2xl rounded-bl-none border border-white/[0.03] px-4 py-3 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips */}
            <div className="px-4 py-2 bg-slate-950 border-t border-white/[0.02] flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuery(q)}
                  className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 hover:text-white border border-white/[0.04] transition-all cursor-pointer flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-white/[0.04] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about skills, projects, contact..."
                className="flex-1 bg-slate-900/60 border border-white/[0.04] rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500/50 transition-colors"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
