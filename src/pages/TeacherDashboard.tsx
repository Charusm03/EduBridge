import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Trophy,
  Flame,
  Calendar,
  TrendingUp,
  BrainCircuit,
  AlertCircle,
  Target
} from 'lucide-react';
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

interface TeacherData {
  profile: { name: string; subject: string; grade: string; goal: string };
  studyPlan: { dayNumber: number; topics: string[]; completed: boolean; completedAt?: string }[];
  quizScores: { id: string; score: number; total: number; date: string }[];
  memoryHealth: { topic: string; lastStudiedAt: string; strength: number }[];
  streak: number;
}

export default function TeacherDashboard() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<TeacherData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const encoded = searchParams.get('d');
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));
        setData(decoded);
      } catch (e) {
        setError('Invalid or corrupted share link.');
      }
    } else {
      // Fallback: read from localStorage for demo
      try {
        const raw = localStorage.getItem('edubridge-storage');
        if (raw) {
          const store = JSON.parse(raw);
          if (store.state) {
            const s = store.state;
            setData({
              profile: s.profile,
              studyPlan: s.studyPlan,
              quizScores: s.quizScores,
              memoryHealth: s.memoryHealth,
              streak: s.streak
            });
          } else {
            setError('No student data available.');
          }
        }
      } catch (e) {
        setError('No student data available.');
      }
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 bg-primary/10 rounded-2xl mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">EduBridge Teacher View</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 bg-primary/10 rounded-2xl mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">EduBridge Teacher View</h1>
        <p className="text-muted-foreground">Loading student data...</p>
      </div>
    );
  }

  const { profile, studyPlan, quizScores, memoryHealth, streak } = data;

  const completedDays = studyPlan?.filter(d => d.completed).length || 0;
  const totalDays = studyPlan?.length || 7;
  const planProgress = Math.round((completedDays / totalDays) * 100);

  const averageScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / quizScores.length)
    : 0;

  const chartData = quizScores.slice(-7).map((score, i) => ({
    name: `Quiz ${i + 1}`,
    score: Math.round((score.score / score.total) * 100),
    date: new Date(score.date).toLocaleDateString()
  }));

  const masteredTopics: string[] = [];
  studyPlan?.forEach(day => {
    if (day.completed) {
      day.topics.forEach(t => {
        if (!masteredTopics.includes(t) && !t.includes('Orientation')) {
          masteredTopics.push(t);
        }
      });
    }
  });

  const calculateStrength = (lastStudiedAt: string) => {
    const last = new Date(lastStudiedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - last.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(10, 100 - (diffDays * 5));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">EduBridge</h1>
            <p className="text-xs text-muted-foreground">Teacher / Parent Dashboard</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Student Info */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Name</p>
                <p className="font-bold text-lg">{profile.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Subject</p>
                <p className="font-bold text-lg">{profile.subject}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Grade</p>
                <p className="font-bold text-lg">{profile.grade}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Goal</p>
                <p className="font-bold text-lg">{profile.goal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="bg-blue-50 p-2.5 rounded-xl mb-2">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xl font-bold">{completedDays}</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Days Studied</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="bg-green-50 p-2.5 rounded-xl mb-2">
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xl font-bold">{planProgress}%</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Plan Completion</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="bg-orange-50 p-2.5 rounded-xl mb-2">
                <Trophy className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-xl font-bold">{averageScore}%</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Avg Quiz Score</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="bg-red-50 p-2.5 rounded-xl mb-2">
                <Flame className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xl font-bold">{streak}</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Study Timeline
            </CardTitle>
            <CardDescription>Which days were completed and when</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studyPlan?.map(day => (
                <div key={day.dayNumber} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${day.completed ? 'bg-green-500 text-white' : 'bg-muted border'}`}>
                    {day.completed ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">{day.dayNumber}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">Day {day.dayNumber}</p>
                    <p className="text-xs text-muted-foreground truncate">{day.topics.join(', ')}</p>
                  </div>
                  {day.completed && day.completedAt && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(day.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )) || (
                <p className="text-muted-foreground text-sm">No study plan data available.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quiz Chart */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Quiz Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      formatter={(value: number, name: string, props: any) => [`${value}%`, `Score (${props.payload.date})`]}
                    />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={30}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : '#1e40af'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No quiz data yet.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Topics Mastered */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Topics Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              {masteredTopics.length > 0 ? (
                <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto">
                  {masteredTopics.map((topic, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-100 text-green-700 border-green-200 gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {topic}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No topics mastered yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Memory Health */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              Memory Health
            </CardTitle>
            <CardDescription>Topic retention strength based on review history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {memoryHealth?.length > 0 ? (
                memoryHealth.map((item, idx) => {
                  const strength = calculateStrength(item.lastStudiedAt);
                  return (
                    <div key={idx} className="p-4 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-sm">{item.topic}</p>
                        {strength < 50 && <AlertCircle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-muted-foreground">Strength</span>
                          <span className={strength < 50 ? 'text-red-500' : 'text-green-500'}>{strength}%</span>
                        </div>
                        <div className="h-2 bg-background rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${strength < 50 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${strength}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-sm col-span-full">No memory health data yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <GraduationCap className="h-4 w-4" />
          <span>Powered by EduBridge</span>
        </div>
      </footer>
    </div>
  );
}
