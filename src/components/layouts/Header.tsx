import { Moon, Sun, BookOpen, GraduationCap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full w-9 h-9"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full flex items-center justify-between px-4 md:px-8">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative flex items-center justify-center w-9 h-9">
          <BookOpen className="h-7 w-7 text-primary" />
          <GraduationCap className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-accent" />
        </div>
        <span className="text-xl font-bold text-primary group-hover:opacity-80 transition-opacity">EduBridge</span>
      </Link>
      <div className="flex-1 flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
