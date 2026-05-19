import { Layout } from "@/components/layouts/Layout";
import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Trophy, 
  Flame, 
  Target, 
  CheckCircle2, 
  Zap,
  TrendingUp,
  Calendar,
  Share2,
  BrainCircuit,
  RotateCcw,
  GraduationCap,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";

import { useState, useEffect } from 'react';
import { PageSkeleton } from "@/components/common/PageSkeleton";

export default function ProgressDashboard() {
  const { quizScores, studyPlan, streak, profile, memoryHealth, completeReview } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <PageSkeleton />
      </Layout>
    );
  }

  const calculateStrength = (lastStudiedAt: string) => {
    const last = new Date(lastStudiedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - last.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(10, 100 - (diffDays * 5)); // Decay 5% per day, min 10%
  };

  const averageScore = quizScores.length > 0 
    ? Math.round((quizScores.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / quizScores.length) * 100)
    : 0;

  const completedDays = studyPlan?.filter(day => day.completed).length || 0;
  const totalDays = studyPlan?.length || 7;
  const planProgress = Math.round((completedDays / totalDays) * 100);

  const handleShare = () => {
    const text = `I've completed ${completedDays} days of ${profile?.subject || ''} study with EduBridge! 🎯 Average quiz score: ${averageScore}%. Join me!`;
    navigator.clipboard.writeText(text);
    toast.success("Progress summary copied to clipboard!");
  };

  const handleShareWithTeacher = () => {
    const shareData = {
      profile: profile || { name: '', subject: '', grade: '', goal: '' },
      studyPlan: studyPlan || [],
      quizScores: quizScores.slice(-7),
      memoryHealth: memoryHealth.slice(-10),
      streak
    };
    const encoded = btoa(JSON.stringify(shareData));
    const url = `${window.location.origin}/teacher?d=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied! Share this with your teacher or parent.");
  };

  const chartData = quizScores.slice(-7).map((score, i) => ({
    name: `Quiz ${quizScores.length - (quizScores.slice(-7).length - 1 - i)}`,
    score: Math.round((score.score / score.total) * 100),
    date: new Date(score.date).toLocaleDateString()
  }));

  const stats = [
    { 
      label: "Days Studied", 
      value: completedDays, 
      icon: Calendar, 
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Quizzes Taken", 
      value: quizScores.length, 
      icon: CheckCircle2, 
      color: "text-green-500", 
      bg: "bg-green-50" 
    },
    { 
      label: "Average Score", 
      value: `${averageScore}%`, 
      icon: Trophy, 
      color: "text-orange-500", 
      bg: "bg-orange-50" 
    },
    { 
      label: "Current Streak", 
      value: `${streak} Days`, 
      icon: Flame, 
      color: "text-red-500", 
      bg: "bg-red-50" 
    },
  ];

  const getMotivationalMessage = () => {
    if (planProgress === 100) return "Outstanding! You've completed your entire study plan! 🎓";
    if (streak >= 3) return "You're on fire! Keep that streak going! 🔥";
    if (averageScore >= 80) return "Excellent performance in your quizzes! 🌟";
    if (planProgress > 50) return "You're halfway there! Keep up the great work! 💪";
    return "Great start! Consistency is the key to success. 🚀";
  };

  return (
    <Layout>
      <div className="space-y-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary rounded-2xl">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Progress Dashboard</h1>
              <p className="text-muted-foreground">Detailed overview of your learning journey</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShareWithTeacher} className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Share with Teacher
            </Button>
            <Button variant="outline" onClick={handleShare} className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Progress
            </Button>
          </div>
        </div>

        {/* Motivational Banner */}
        <Card className="bg-primary border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="h-32 w-32 text-white" />
          </div>
          <CardContent className="p-8 relative z-10 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Daily Motivation</h2>
            <p className="text-xl opacity-90 italic">"{getMotivationalMessage()}"</p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`${stat.bg} p-3 rounded-xl mb-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Memory Health Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Memory Health</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memoryHealth.length > 0 ? (
              memoryHealth.map((item, idx) => {
                const strength = calculateStrength(item.lastStudiedAt);
                return (
                  <Card key={idx} className="border-none shadow-sm overflow-hidden group bg-card">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-bold leading-tight">{item.topic}</p>
                          <p className="text-xs text-muted-foreground">Last reviewed: {new Date(item.lastStudiedAt).toLocaleDateString()}</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            completeReview(item.topic);
                            toast.success(`Reviewed: ${item.topic}`);
                          }}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-muted-foreground">Memory Strength</span>
                          <span className={strength < 50 ? 'text-red-500' : 'text-green-500'}>{strength}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${strength}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${strength < 50 ? 'bg-red-500' : 'bg-green-500'}`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="col-span-full border-dashed border-2 bg-transparent">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>Complete a study session to start tracking your memory health!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart Section */}
          <Card className="md:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle>Quiz Score History</CardTitle>
              <CardDescription>Performance trend of your last 7 quizzes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              {quizScores.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      formatter={(value: number, name: string, props: any) => [
                        `${value}%`, 
                        `Score (on ${props.payload.date})`
                      ]}
                    />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : '#1e40af'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2">
                   <Target className="h-12 w-12 opacity-20" />
                   <p>No quizzes taken yet. Complete a quiz to see your trend!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Circular/Summary */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Plan Completion</CardTitle>
              <CardDescription>Status of your 7-day study plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-muted-foreground/10"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-primary transition-all duration-1000 ease-out"
                      strokeWidth="8"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * planProgress) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold">{planProgress}%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Days Completed</span>
                  <span className="font-bold">{completedDays} / {totalDays}</span>
                </div>
                <ProgressBar value={planProgress} className="h-2" />
              </div>

              <div className="pt-4">
                <div className="p-4 bg-muted rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-bold">Goal Pursuit</p>
                    <p className="text-xs text-muted-foreground">Keep going to reach your target!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
