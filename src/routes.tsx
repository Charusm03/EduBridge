import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import StudyPlan from './pages/StudyPlan';
import AITutor from './pages/AITutor';
import Quiz from './pages/Quiz';
import ProgressDashboard from './pages/ProgressDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    public: true,
  },
  {
    name: 'Onboarding',
    path: '/onboarding',
    element: <Onboarding />,
    public: true,
  },
  {
    name: 'Study Plan',
    path: '/plan',
    element: <StudyPlan />,
    public: true,
  },
  {
    name: 'AI Tutor',
    path: '/tutor',
    element: <AITutor />,
    public: true,
  },
  {
    name: 'Quiz',
    path: '/quiz',
    element: <Quiz />,
    public: true,
  },
  {
    name: 'Progress',
    path: '/progress',
    element: <ProgressDashboard />,
    public: true,
  },
  {
    name: 'Teacher Dashboard',
    path: '/teacher',
    element: <TeacherDashboard />,
    public: true,
  },
];
