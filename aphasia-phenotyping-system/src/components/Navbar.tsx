import React from 'react';
import { BrainCircuit, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <span className="font-semibold tracking-tight">NeuroPheno</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
