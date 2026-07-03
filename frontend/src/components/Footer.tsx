import React from 'react';
import { Container } from '@mui/material';
import { PERSONAL_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#030303] text-center font-mono text-[10px] text-[#8a8a93] relative z-10">
      <Container maxWidth="lg" className="space-y-4">
        <div>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name.toUpperCase()}. ALL RIGHTS RESERVED.</div>
      </Container>
    </footer>
  );
};
