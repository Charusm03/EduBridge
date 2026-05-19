# EduBridge – AI Powered Study Companion

## Overview

EduBridge is an AI powered personalised learning platform designed to help students study smarter through adaptive learning, Socratic tutoring, spaced repetition, progress tracking, and interactive study planning.

The platform was built entirely using conversational AI development through MeDo, transforming natural language prompts into a complete full stack educational application.

EduBridge focuses on solving one major problem faced by millions of students: lack of personalised academic guidance. The system acts like a virtual tutor that helps students understand what to study, when to revise, and how to improve weak areas effectively.

---

# Features

## Personalized Study Plans
- Automatically generates intelligent 7 day study plans
- Arranges topics from foundational to advanced
- Difficulty indicators:
  - 🟢 Easy
  - 🟡 Medium
  - 🔴 Hard

## Socratic AI Tutor
- Guides students through questions instead of directly giving answers
- “Explain Like I’m 10” mode for beginner friendly explanations
- Quick reply suggestions
- Chat history persistence

## Spaced Repetition System
- Based on the Ebbinghaus forgetting curve
- Automatically schedules revision sessions
- Helps long term memory retention

## Quiz & Assessment
- AI generated quizzes
- Timed practice sessions
- Answer explanations
- XP rewards and streak tracking

## Progress Dashboard
- Visual analytics
- XP points
- Learning streaks
- Achievement badges
- Interactive charts

## Concept Map Visualization
- SVG based interactive learning map
- Clickable topic nodes
- Prerequisite topic connections

## Additional Features
- Dark mode support
- Voice input using Web Speech API
- Wikipedia live educational summaries
- Mobile responsive UI
- Skeleton loading screens
- Confetti success animations
- Teacher and parent dashboard

---

# Tech Stack

- MeDo (No Code AI Builder)
- React
- TypeScript
- HTML5
- CSS3
- JavaScript
- Vite
- Tailwind CSS
- Wikipedia REST API
- Web Speech API
- MeDo AI API
- localStorage
- SVG (Concept Map Visualisation)
- React Context API
- Custom React Hooks
- Supabase Integration
- PostCSS
- pnpm Workspace

---

# Project Structure

```bash
├── public
│   ├── favicon.png
│   └── images
│
├── src
│   ├── components
│   │   ├── ConceptMap.tsx
│   │   ├── Confetti.tsx
│   │   ├── ReviewAlert.tsx
│   │   └── PageSkeleton.tsx
│   │
│   ├── layouts
│   ├── hooks
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Onboarding.tsx
│   │   ├── StudyPlan.tsx
│   │   ├── AITutor.tsx
│   │   ├── Quiz.tsx
│   │   ├── ProgressDashboard.tsx
│   │   └── TeacherDashboard.tsx
│   │
│   ├── services
│   │   ├── planGenerator.ts
│   │   ├── quizBank.ts
│   │   └── wikipedia.ts
│   │
│   ├── store
│   ├── types
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
│
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
Installation & Setup
Prerequisites
Node.js ≥ 20
npm ≥ 10

Check installation:

node -v
npm -v
Run Locally
Step 1 – Clone or Download Project
git clone <repository-url>

or download the ZIP file and extract it.

Step 2 – Install Dependencies
npm install
Step 3 – Start Development Server
npm run dev

If needed:

npx vite --host 127.0.0.1
Live Demo

https://app-bqx5esdqehvl.appmedo.com/

Source Code

https://miaoda-op-sourcecode.s3.us-west-2.amazonaws.com/source_code/projects/app-bqx5esdqehvl-2a7b364fbf3ddff57c2c533a8ccfd3c9120b59ca.zip

Future Scope
Regional language support
Offline learning mode
WhatsApp revision reminders
Collaborative study rooms
Curriculum integration
AI powered recommendations
Parent & teacher classroom analytics
Vision

EduBridge aims to make personalised education accessible to every student regardless of financial background. The long term goal is to provide intelligent academic guidance that feels like having a personal tutor available anytime, anywhere.
