import { useState, useEffect } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Timer, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import { Confetti } from '@/components/common/Confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correctAnswer: 1,
    explanation: "Mitochondria are known as the powerhouse of the cell because they produce energy in the form of ATP."
  },
  {
    id: 2,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Silver", "Oxygen", "Iron"],
    correctAnswer: 2,
    explanation: "The chemical symbol for Oxygen is 'O'."
  },
  {
    id: 3,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctAnswer: 2,
    explanation: "12 * 12 = 144, so the square root of 144 is 12."
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    explanation: "Romeo and Juliet is a tragedy written by William Shakespeare early in his career."
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is often called the 'Red Planet' because iron minerals in the Martian soil oxidize, or rust, causing the soil and atmosphere to look red."
  }
];

export default function Quiz() {
  const { addQuizScore, profile } = useAppStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(5).fill(null));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleSubmit();
    }
  }, [timeLeft, isFinished]);

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1]);
    } else {
      setIsFinished(true);
      const score = newAnswers.reduce((acc: number, curr, idx) => {
        return curr === mockQuestions[idx].correctAnswer ? acc + 1 : acc;
      }, 0);
      addQuizScore({
        subject: profile?.subject || 'General',
        score: score as number,
        total: mockQuestions.length
      });
      const percent = (score / mockQuestions.length) * 100;
      if (percent >= 80) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      }
    }
  };

  const handleSubmit = () => {
    setIsFinished(true);
    // ... logic already handled in handleNext for last question
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const score = answers.reduce((acc: number, curr, idx) => {
    return curr === mockQuestions[idx].correctAnswer ? (acc || 0) + 1 : (acc || 0);
  }, 0);

  if (isFinished) {
    return (
      <Layout>
        <Confetti show={showConfetti} />
        <div className="max-w-3xl mx-auto py-8 space-y-8">
          <Card className="text-center border-none shadow-xl bg-primary text-primary-foreground p-8">
            <h2 className="text-4xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-xl opacity-90 mb-6">You scored {score} out of {mockQuestions.length}</p>
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
            {mockQuestions.map((q, idx) => (
              <Card key={q.id} className="border-none shadow-md overflow-hidden">
                <div className={`h-1.5 ${answers[idx] === q.correctAnswer ? 'bg-green-500' : 'bg-red-500'}`} />
                <CardHeader>
                  <CardTitle className="text-lg flex gap-3 items-start">
                    <span className="mt-0.5">
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

  const currentQ = mockQuestions[currentQuestion];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-4 space-y-6">
        <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-2xl border shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Timer className="h-5 w-5 text-primary" />
            </div>
            <span className={`text-xl font-bold font-mono ${timeLeft < 60 ? 'text-red-500 animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex-1 max-w-[200px] hidden md:block">
             <Progress value={(currentQuestion / mockQuestions.length) * 100} className="h-2" />
          </div>
          <span className="font-semibold text-sm">
            Question {currentQuestion + 1} of {mockQuestions.length}
          </span>
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
              {currentQuestion === mockQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
