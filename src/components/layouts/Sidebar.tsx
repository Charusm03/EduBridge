import { NavLink, Link } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, PenTool, BarChart3, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BookOpen, label: 'Study Plan', href: '/plan' },
  { icon: MessageSquare, label: 'AI Tutor', href: '/tutor' },
  { icon: PenTool, label: 'Quiz', href: '/quiz' },
  { icon: BarChart3, label: 'Progress', href: '/progress' },
];

export function Sidebar() {
  const profile = useAppStore((state) => state.profile);

  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col shrink-0">
      <Link to="/" className="p-6 flex items-center gap-2 group">
        <div className="relative flex items-center justify-center w-9 h-9">
          <BookOpen className="h-7 w-7 text-primary" />
          <GraduationCap className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-accent" />
        </div>
        <span className="text-xl font-bold text-primary group-hover:opacity-80 transition-opacity">EduBridge</span>
      </Link>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="p-4 bg-primary/5 rounded-xl">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Status</p>
          <p className="text-sm font-medium">{profile ? `${profile.grade} Student` : 'Not Enrolled'}</p>
        </div>
      </div>
    </aside>
  );
}
