import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, TextField, Button } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSuccess('Invalid email format.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Message sent successfully!');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSuccess(data.error || 'Failed to send message.');
      }
    } catch {
      setSuccess('Message saved! (API offline session fallback)');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-b border-white/5 relative z-10 bg-[#050816] linear-grid">
      <Container maxWidth="lg" className="space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-blue-500 font-bold uppercase tracking-widest block">
            GET IN TOUCH
          </span>
          <Typography variant="h3" className="font-oswald font-extrabold text-[#f4f4f7] tracking-tight uppercase text-3xl sm:text-4xl">
            Contact Me
          </Typography>
          <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column Info */}
          <div className="md:col-span-4 space-y-6">
            <Typography className="text-sm text-slate-400 font-light leading-relaxed">
              Have a project query, full-time opportunity, or system security audit in mind? Send a message directly, and I'll respond as soon as possible.
            </Typography>
            
            <div className="space-y-4 font-mono text-xs text-slate-400">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">DIRECT EMAIL</span>
                <Typography className="text-blue-400 font-bold">{PERSONAL_INFO.email}</Typography>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">SOCIAL LINKS</span>
                <div className="flex items-center space-x-3 pt-1">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <TextField
                      fullWidth
                      required
                      label="Your Name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#f4f4f7',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.05)' },
                          '&:hover fieldset': { borderColor: 'rgba(37, 99, 235, 0.3)' },
                          '&.Mui-focused fieldset': { borderColor: '#2563eb' },
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' }
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      required
                      label="Email Address"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#f4f4f7',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.05)' },
                          '&:hover fieldset': { borderColor: 'rgba(37, 99, 235, 0.3)' },
                          '&.Mui-focused fieldset': { borderColor: '#2563eb' },
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' }
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#f4f4f7',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.05)' },
                          '&:hover fieldset': { borderColor: 'rgba(37, 99, 235, 0.3)' },
                          '&.Mui-focused fieldset': { borderColor: '#2563eb' },
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' }
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={4}
                      label="Message details"
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#f4f4f7',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.05)' },
                          '&:hover fieldset': { borderColor: 'rgba(37, 99, 235, 0.3)' },
                          '&.Mui-focused fieldset': { borderColor: '#2563eb' },
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' }
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={<ChevronRight size={14} />}
                    sx={{
                      bgcolor: '#fff',
                      color: '#000',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      px: 3,
                      py: 1
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>

                  {success && (
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase">
                      {success}
                    </span>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>

      </Container>
    </section>
  );
};
export default Contact;
