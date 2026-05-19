import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, PenTool, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BookOpen, label: 'Plan', href: '/plan' },
  { icon: MessageSquare, label: 'Tutor', href: '/tutor' },
  { icon: PenTool, label: 'Quiz', href: '/quiz' },
  { icon: BarChart3, label: 'Progress', href: '/progress' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-2 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center flex-1 min-w-0 h-full gap-1 transition-colors",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )
          }
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium truncate">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
