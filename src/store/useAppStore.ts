import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, StudentProfile, StudyDay, QuizScore, ChatMessage, ReviewSession, MemoryTopic } from '@/types/types';

interface AppActions {
  setProfile: (profile: StudentProfile) => void;
  setStudyPlan: (plan: StudyDay[]) => void;
  toggleDayCompletion: (dayNumber: number) => void;
  addQuizScore: (score: Omit<QuizScore, 'id' | 'date'>) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  completeReview: (topic: string) => void;
  updateStreak: () => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      profile: null,
      studyPlan: null,
      quizScores: [],
      chatHistory: [],
      reviews: [],
      memoryHealth: [],
      streak: 0,
      lastStudyDate: null,

      setProfile: (profile) => set({ profile }),
      setStudyPlan: (studyPlan) => set({ studyPlan }),
      
      toggleDayCompletion: (dayNumber) => set((state) => {
        if (!state.studyPlan) return state;
        const targetDay = state.studyPlan.find(d => d.dayNumber === dayNumber);
        if (!targetDay) return state;

        const isMarkingComplete = !targetDay.completed;
        const newPlan = state.studyPlan.map((day) => 
          day.dayNumber === dayNumber ? { ...day, completed: isMarkingComplete } : day
        );
        
        let newReviews = [...state.reviews];
        let newMemoryHealth = [...state.memoryHealth];

        if (isMarkingComplete) {
          // Schedule reviews
          const intervals = [2, 5, 12];
          const topicsToReview = targetDay.topics.filter(t => !t.includes('Orientation'));
          
          topicsToReview.forEach(topic => {
            intervals.forEach(interval => {
              newReviews.push({
                topic,
                originalDay: dayNumber,
                scheduledDay: dayNumber + interval,
                completed: false
              });
            });

            // Update memory health
            const existingIndex = newMemoryHealth.findIndex(m => m.topic === topic);
            if (existingIndex >= 0) {
              newMemoryHealth[existingIndex] = {
                ...newMemoryHealth[existingIndex],
                lastStudiedAt: new Date().toISOString(),
                strength: 100
              };
            } else {
              newMemoryHealth.push({
                topic,
                lastStudiedAt: new Date().toISOString(),
                strength: 100
              });
            }
          });
        }
        
        // Update streak logic
        const today = new Date().toISOString().split('T')[0];
        let newStreak = state.streak;
        let newLastStudyDate = state.lastStudyDate;

        if (isMarkingComplete) {
          if (state.lastStudyDate === today) {
            // Already studied today
          } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (state.lastStudyDate === yesterdayStr) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
            newLastStudyDate = today;
          }
        }

        return { 
          studyPlan: newPlan,
          reviews: newReviews,
          memoryHealth: newMemoryHealth,
          streak: newStreak,
          lastStudyDate: newLastStudyDate
        };
      }),

      completeReview: (topic) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        // We find the first uncompleted review for this topic due today or earlier
        // But for simplicity, we'll mark all uncompleted reviews for this topic that are due as completed
        // Actually, let's just mark the "active" ones.
        
        const newReviews = state.reviews.map(r => 
          (r.topic === topic && !r.completed) ? { ...r, completed: true } : r
        );

        const newMemoryHealth = state.memoryHealth.map(m => 
          m.topic === topic ? { ...m, lastStudiedAt: new Date().toISOString(), strength: 100 } : m
        );

        return {
          reviews: newReviews,
          memoryHealth: newMemoryHealth
        };
      }),

      addQuizScore: (score) => set((state) => ({
        quizScores: [
          ...state.quizScores,
          {
            ...score,
            id: Math.random().toString(36).substring(7),
            date: new Date().toISOString()
          }
        ]
      })),

      addChatMessage: (message) => set((state) => ({
        chatHistory: [...state.chatHistory, message]
      })),

      clearChatHistory: () => set({ chatHistory: [] }),

      updateStreak: () => set((state) => {
        const today = new Date();
        const lastDate = state.lastStudyDate ? new Date(state.lastStudyDate) : null;
        
        if (!lastDate) return state;

        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
          return { streak: 0 };
        }
        return state;
      }),

      resetApp: () => set({
        profile: null,
        studyPlan: null,
        quizScores: [],
        chatHistory: [],
        reviews: [],
        memoryHealth: [],
        streak: 0,
        lastStudyDate: null
      })
    }),
    {
      name: 'edubridge-storage'
    }
  )
);
