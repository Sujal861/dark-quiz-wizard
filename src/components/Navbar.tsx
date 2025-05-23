import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <img 
            src="/quiz-logo.svg" 
            alt="Quiz Wizard Logo" 
            className="h-10 w-auto hover:scale-105 transition-transform duration-300"
          />
          <span className="font-bold text-xl font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Quiz Wizard
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm">
            History
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
