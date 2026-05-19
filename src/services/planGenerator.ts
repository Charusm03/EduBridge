import { StudentProfile, StudyDay } from '@/types/types';

const subjectTopics: Record<string, { topic: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[]> = {
  'Mathematics': [
    { topic: 'Basic Arithmetic & Number Systems', difficulty: 'Easy' },
    { topic: 'Algebraic Expressions & Identities', difficulty: 'Medium' },
    { topic: 'Linear Equations in Two Variables', difficulty: 'Medium' },
    { topic: 'Geometry: Triangles & Quadrilaterals', difficulty: 'Medium' },
    { topic: 'Trigonometry & Applications', difficulty: 'Hard' },
    { topic: 'Calculus: Differentiation', difficulty: 'Hard' },
    { topic: 'Statistics & Probability', difficulty: 'Medium' },
  ],
  'Physics': [
    { topic: 'Units, Measurements & Dimensions', difficulty: 'Easy' },
    { topic: 'Kinematics: Motion in a Straight Line', difficulty: 'Medium' },
    { topic: 'Laws of Motion & Friction', difficulty: 'Medium' },
    { topic: 'Work, Energy & Power', difficulty: 'Medium' },
    { topic: 'Gravitation & Planetary Motion', difficulty: 'Hard' },
    { topic: 'Thermodynamics & Heat Transfer', difficulty: 'Hard' },
    { topic: 'Electromagnetism', difficulty: 'Hard' },
  ],
  'Chemistry': [
    { topic: 'Some Basic Concepts of Chemistry', difficulty: 'Easy' },
    { topic: 'Structure of Atom', difficulty: 'Medium' },
    { topic: 'Classification of Elements & Periodicity', difficulty: 'Medium' },
    { topic: 'Chemical Bonding & Molecular Structure', difficulty: 'Medium' },
    { topic: 'Organic Chemistry: Basic Principles', difficulty: 'Hard' },
    { topic: 'Equilibrium & Kinetics', difficulty: 'Hard' },
    { topic: 'Electrochemistry', difficulty: 'Hard' },
  ],
  'Biology': [
    { topic: 'Diversity in Living Organisms', difficulty: 'Easy' },
    { topic: 'Cell: The Unit of Life', difficulty: 'Medium' },
    { topic: 'Plant Physiology', difficulty: 'Medium' },
    { topic: 'Human Physiology & Anatomy', difficulty: 'Medium' },
    { topic: 'Genetics & Evolution', difficulty: 'Hard' },
    { topic: 'Biotechnology & Applications', difficulty: 'Hard' },
    { topic: 'Ecology & Environment', difficulty: 'Easy' },
  ],
};

const defaultTopics = [
  { topic: 'Introduction & Fundamentals', difficulty: 'Easy' },
  { topic: 'Core Concepts Part 1', difficulty: 'Medium' },
  { topic: 'Core Concepts Part 2', difficulty: 'Medium' },
  { topic: 'Advanced Applications', difficulty: 'Hard' },
  { topic: 'Case Studies', difficulty: 'Hard' },
  { topic: 'Integration & Summary', difficulty: 'Medium' },
  { topic: 'Final Review & Practice', difficulty: 'Easy' },
] as { topic: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];

export function generateStudyPlan(profile: StudentProfile): StudyDay[] {
  const topics = subjectTopics[profile.subject] || defaultTopics;
  const hoursPerDay = profile.hoursPerDay;
  
  return Array.from({ length: 7 }, (_, i) => {
    const isDayOne = i === 0;
    const currentTopic = topics[i % topics.length];
    
    // Allocate more time for Hard/Medium topics
    let duration = hoursPerDay;
    if (currentTopic.difficulty === 'Hard') {
      duration = Math.min(8, hoursPerDay + 1);
    } else if (currentTopic.difficulty === 'Easy') {
      duration = Math.max(1, hoursPerDay - 0.5);
    }

    const dayTopics = [currentTopic.topic];
    if (isDayOne) {
      dayTopics.unshift('Orientation: Full Plan Review (15 min)');
    }

    return {
      dayNumber: i + 1,
      topics: dayTopics,
      duration: `${duration} Hours`,
      focusAreas: isDayOne 
        ? ['Understanding the roadmap', 'Setting up study environment', 'Key definitions']
        : ['Critical thinking', 'Problem solving', 'Application of concepts'],
      completed: false,
      difficulty: currentTopic.difficulty
    };
  });
}
