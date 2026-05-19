import { useState, useEffect, useMemo } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Timer, CheckCircle2, XCircle, ChevronRight, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { generateQuiz } from '@/services/quizBank';
import { Question } from '@/types/types';
import { toast } from 'sonner';
import { Confetti } from '@/components/common/Confetti';
import { Navigate } from 'react-router-dom';

export default function Quiz() {
  const { addQuizScore, profile } = useAppStore();

  // Generate quiz based on student profile
  const quizQuestions = useMemo(() => {
    if (!profile) return [] as Question[];
    return generateQuiz(profile.subject, profile.grade, 5);
  }, [profile]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize answers array when questions load
  useEffect(() => {
    if (quizQuestions.length > 0) {
      setAnswers(new Array(quizQuestions.length).fill(null));
    }
  }, [quizQuestions]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      finishQuiz();
    }
  }, [timeLeft, isFinished]);

  if (!profile) {
    return <Navigate to="/onboarding" />;
  }

  if (quizQuestions.length === 0) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-16 text-center space-y-6">
          <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">No Quiz Available</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            We don't have enough questions for <strong>{profile.subject}</strong> at <strong>{profile.grade}</strong> level yet.
          </p>
          <Button onClick={() => window.location.href = '/plan'}>
            Go to Study Plan
          </Button>
        </div>
      </Layout>
    );
  }

  const finishQuiz = () => {
    if (isFinished) return;
    const newAnswers = [...answers];
    if (selectedAnswer !== null && newAnswers[currentQuestion] === null) {
      newAnswers[currentQuestion] = selectedAnswer;
    }

    const score = newAnswers.reduce((acc: number, curr, idx) => {
      return curr === quizQuestions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    addQuizScore({
      subject: profile.subject,
      score: score,
      total: quizQuestions.length
    });

    const percent = (score / quizQuestions.length) * 100;
    if (percent >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }

    setAnswers(newAnswers);
    setIsFinished(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1]);
    } else {
      finishQuiz();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const score = answers.reduce((acc: number, curr, idx) => {
    return curr === quizQuestions[idx]?.correctAnswer ? (acc || 0) + 1 : (acc || 0);
  }, 0);

  if (isFinished) {
    return (
      <Layout>
        <Confetti show={showConfetti} />
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <Card className="text-center border-none shadow-xl bg-primary text-primary-foreground p-8">
            <h2 className="text-4xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-xl opacity-90 mb-2">You scored {score} out of {quizQuestions.length}</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="text-sm">
                <BookOpen className="h-3 w-3 mr-1" />
                {profile.subject}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {profile.grade}
              </Badge>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" onClick={() => window.location.reload()}>
                <RotateCcw className="mr-2 h-4 w-4" /> Try Again
              </Button>
              <Button variant="outline" className="bg-transparent border-white hover:bg-white/10" onClick={() => window.location.href='/plan'}>
                Next Topic <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold px-2">Review Answers</h3>
            {quizQuestions.map((q, idx) => (
              <Card key={q.id} className="border-none shadow-md overflow-hidden">
                <div className={`h-1.5 ${answers[idx] === q.correctAnswer ? 'bg-green-500' : 'bg-red-500'}`} />
                <CardHeader>
                  <CardTitle className="text-lg flex gap-3 items-start">
                    <span className="mt-0.5 shrink-0">
                      {answers[idx] === q.correctAnswer ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </span>
                    {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg text-sm border ${
                          i === q.correctAnswer ? 'bg-green-50 border-green-200 text-green-800' :
                          i === answers[idx] ? 'bg-red-50 border-red-200 text-red-800' : 'border-border'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted p-4 rounded-xl text-sm italic">
                    <span className="font-bold not-italic">Explanation:</span> {q.explanation}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-4 space-y-6">
        {/* Quiz Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-card p-4 rounded-2xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Timer className="h-5 w-5 text-primary" />
            </div>
            <span className={`text-xl font-bold font-mono ${timeLeft < 60 ? 'text-red-500 animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              {profile.subject}
            </Badge>
            <Badge variant="secondary" className="text-xs">{profile.grade}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 max-w-[120px] hidden md:block">
              <Progress value={(currentQuestion / quizQuestions.length) * 100} className="h-2" />
            </div>
            <span className="font-semibold text-sm shrink-0">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
        </div>

        <Card className="border-none shadow-xl p-6 md:p-10 min-h-[400px] flex flex-col justify-between">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {currentQ.question}
            </h2>

            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(val) => setSelectedAnswer(parseInt(val))}
              className="space-y-4"
            >
              {currentQ.options.map((option, idx) => (
                <div key={idx}>
                  <RadioGroupItem
                    value={idx.toString()}
                    id={`opt-${idx}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`opt-${idx}`}
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-muted hover:bg-primary/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer group"
                  >
                    <span className="text-lg font-medium">{option}</span>
                    <div className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center group-hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary">
                      <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <CardFooter className="px-0 pt-8">
            <Button
              className="w-full h-14 text-lg font-bold"
              onClick={handleNext}
            >
              {currentQuestion === quizQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
