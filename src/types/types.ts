export interface StudentProfile {
  name: string;
  subject: string;
  grade: string;
  goal: string;
  hoursPerDay: number;
  targetDate: string;
}

export interface StudyDay {
  dayNumber: number;
  topics: string[];
  duration: string;
  focusAreas: string[];
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizScore {
  id: string;
  subject: string;
  score: number;
  total: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ReviewSession {
  topic: string;
  originalDay: number;
  scheduledDay: number;
  completed: boolean;
}

export interface MemoryTopic {
  topic: string;
  lastStudiedAt: string;
  strength: number; // 0 to 100
}

export interface AppState {
  profile: StudentProfile | null;
  studyPlan: StudyDay[] | null;
  quizScores: QuizScore[];
  chatHistory: ChatMessage[];
  reviews: ReviewSession[];
  memoryHealth: MemoryTopic[];
  streak: number;
  lastStudyDate: string | null;
}
