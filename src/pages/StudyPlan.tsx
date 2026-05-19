import { useState, useEffect } from "react";
import { Layout } from "@/components/layouts/Layout";
import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Flame, Clock, BookOpen, Target, RefreshCw } from "lucide-react";
import { Navigate } from "react-router-dom";
import { generateStudyPlan } from "@/services/planGenerator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { PageSkeleton } from "@/components/common/PageSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptMap } from "@/components/common/ConceptMap";
import { LayoutDashboard, Map as MapIcon, AlertCircle } from "lucide-react";
import { ReviewAlert } from "@/components/common/ReviewAlert";

export default function StudyPlan() {
  const { profile, studyPlan, toggleDayCompletion, streak, setStudyPlan, reviews } = useAppStore();
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!profile || !studyPlan) {
    return <Navigate to="/onboarding" />;
  }

  if (isLoading) {
    return (
      <Layout>
        <PageSkeleton />
      </Layout>
    );
  }

  const handleRegenerate = () => {
    const newPlan = generateStudyPlan(profile);
    // Simple shuffle for "different order" requirement
    const shuffled = [...newPlan].sort(() => Math.random() - 0.5).map((day, i) => ({
      ...day,
      dayNumber: i + 1,
      completed: false
    }));
    setStudyPlan(shuffled);
    setExpandedDay(1);
    toast.success("Plan reshuffled successfully!");
  };

  const handleSelectDayFromMap = (dayNumber: number) => {
    setActiveTab("list");
    setExpandedDay(dayNumber);
    // Scroll to the card
    setTimeout(() => {
      const element = document.getElementById(`day-card-${dayNumber}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const completedDays = studyPlan.filter(day => day.completed).length;
  const progressPercent = Math.round((completedDays / studyPlan.length) * 100);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-500 hover:bg-green-600';
      case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600 text-black';
      case 'Hard': return 'bg-red-500 hover:bg-red-600';
      default: return '';
    }
  };

  return (
    <Layout>
      <div className="space-y-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Hello, {profile.name}! 👋
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="h-4 w-4 text-primary" />
              <p className="text-lg">Goal: {profile.goal}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleRegenerate} className="h-10 gap-2">
              <RefreshCw className="h-4 w-4" />
              Regenerate Plan
            </Button>
            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
                  <div>
                    <p className="text-2xl font-bold leading-none">{streak}</p>
                    <p className="text-[10px] uppercase font-semibold text-muted-foreground">Day Streak</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-2xl font-bold leading-none">{progressPercent}%</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Plan Progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Overall Completion</span>
            <span>{completedDays} / {studyPlan.length} Days</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-primary/10" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Study Plan
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapIcon className="h-4 w-4" />
              Concept Map
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-0">
            {/* Study Plan Cards */}
            <div className="grid grid-cols-1 gap-6">
              {studyPlan.map((day) => (
                <Card 
                  id={`day-card-${day.dayNumber}`}
                  key={day.dayNumber} 
                  className={`transition-all overflow-hidden cursor-pointer border-none shadow-md hover:shadow-lg ${day.completed ? 'bg-muted/50 opacity-80' : 'bg-card'} ${expandedDay === day.dayNumber ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setExpandedDay(expandedDay === day.dayNumber ? null : day.dayNumber)}
                >
                  <CardHeader className="pb-3 flex flex-row items-start justify-between select-none">
                    <div className="space-y-1">
                      <CardTitle className="text-xl flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                          {day.dayNumber}
                        </span>
                        Day {day.dayNumber}
                        <Badge className={getDifficultyColor(day.difficulty)}>
                          {day.difficulty}
                        </Badge>
                      </CardTitle>
                      {/* Review Badges */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {reviews
                          .filter(r => r.scheduledDay === day.dayNumber && !r.completed)
                          .map((review, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 flex gap-1 items-center"
                            >
                              <AlertCircle className="h-3 w-3" />
                              Review: {review.topic} (from Day {review.originalDay})
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {day.duration}
                      </div>
                      <Checkbox 
                        checked={day.completed}
                        onCheckedChange={() => toggleDayCompletion(day.dayNumber)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-6 w-6 border-2"
                      />
                    </div>
                  </CardHeader>
                  <AnimatePresence>
                    {expandedDay === day.dayNumber && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="space-y-4 pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="space-y-2">
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <BookOpen className="h-3 w-3" />
                                Topics to Cover
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {day.topics.map((topic, i) => (
                                  <li key={i}>{topic}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <Target className="h-3 w-3" />
                                Key Focus Areas
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {day.focusAreas.map((area, i) => (
                                  <li key={i}>{area}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-0 flex justify-center">
            <div className="w-full max-w-[700px]">
              <ConceptMap plan={studyPlan} onSelectDay={handleSelectDayFromMap} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

