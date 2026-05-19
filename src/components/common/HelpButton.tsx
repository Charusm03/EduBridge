import { useState } from 'react';
import { HelpCircle, X, BookOpen, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

const tips = [
  {
    icon: BookOpen,
    title: "Study in short bursts",
    text: "Complete one day at a time. Consistency beats cramming!"
  },
  {
    icon: Target,
    title: "Review when prompted",
    text: "Orange review badges are your secret to long-term memory."
  },
  {
    icon: Zap,
    title: "Ask the AI Tutor",
    text: "Stuck on a topic? The Socratic Tutor will guide you step-by-step."
  }
];

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-card border border-border rounded-xl shadow-xl p-4 w-[280px] space-y-3 mb-2"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">Quick Tips</p>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="p-1.5 bg-primary/10 rounded-lg shrink-0 mt-0.5">
                  <tip.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tip.title}</p>
                  <p className="text-xs text-muted-foreground">{tip.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setOpen(!open)}
        className="rounded-full h-12 w-12 shadow-lg"
        size="icon"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
