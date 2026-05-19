import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export function ReviewAlert() {
  const { reviews } = useAppStore();
  const navigate = useNavigate();

  // For simulation, let's say "today" is a dynamic day in the plan
  // In a real app we'd compare dates, but here we can just count pending reviews
  const pendingReviews = reviews.filter(r => !r.completed);
  
  if (pendingReviews.length === 0) return null;

  const uniqueTopics = Array.from(new Set(pendingReviews.map(r => r.topic)));

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-orange-500 text-white p-3 rounded-xl shadow-lg mb-6 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">Review Alert!</p>
            <p className="text-sm opacity-90">
              You have {uniqueTopics.length} topics due for review today — reviewing now takes only 10 minutes!
            </p>
          </div>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => navigate('/progress')}
          className="shrink-0 gap-2"
        >
          Review Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
