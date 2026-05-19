# Requirements Document

## 1. Application Overview

**Application Name**: EduBridge — AI Study Companion

**Description**: A web application that helps students create personalised study plans, get instant answers to subject questions, take quizzes, and track their learning progress in one unified platform.

**Design Style**:
- Clean, modern, motivating interface
- Colour scheme: Blue and white primary colours with green accent for progress/success indicators
- Card-based layout
- Mobile responsive design

## 2. Users and Usage Scenarios

**Target Users**: Students from Class 6 to university level, especially those without access to private tutors.

**Core Usage Scenarios**:
- Students need structured study plans tailored to their goals and available time
- Students require instant explanations for subject-related questions
- Students want to test their knowledge through quizzes
- Students need to monitor their learning progress and maintain study motivation

## 3. Page Structure and Functional Description

### Page Hierarchy

```
EduBridge
├── Home Page (Landing)
├── Onboarding Form
├── Study Plan Page
├── AI Tutor Page
├── Quiz Page
├── Progress Dashboard
└── Navigation (Sidebar/Bottom Nav)
```

### 3.1 Home Page (Landing)

**Purpose**: Introduce the application and guide users to start learning.

**Components**:
- Navigation bar with logo
- Hero section displaying:
  - App name: EduBridge
  - Tagline: Your Personal AI Study Coach
  - Start Learning button (primary action)
- Three feature cards:
  - Study Plans
  - Ask AI
  - Track Progress

**User Actions**:
- Click Start Learning button to proceed to Onboarding Form

### 3.2 Onboarding Form

**Purpose**: Collect student information to generate personalised study plan.

**Input Fields**:
- Student Name (text input)
- Subject (dropdown): Mathematics, Physics, Chemistry, Biology, History, Geography, English, Computer Science, Economics, Other
- Grade/Level (dropdown): Class 6-8, Class 9-10, Class 11-12, Undergraduate, Other
- Study Goal (text area): e.g. Pass my board exam in 30 days
- Available Hours Per Day (number input, range 1-8)
- Target Date (date picker)

**Actions**:
- Generate My Study Plan button: Submit form and navigate to Study Plan Page

**Data Storage**: Store all input data in localStorage for session persistence.

### 3.3 Study Plan Page

**Purpose**: Display personalised 7-day study plan and track completion.

**Display Elements**:
- Student name and study goal at top
- 7 day cards, each containing:
  - Day number
  - Topics to cover
  - Study duration
  - Key focus areas
  - Checkbox to mark day as complete
- Progress bar showing percentage of plan completed
- Streak counter displaying consecutive days studied

**User Actions**:
- Check/uncheck day completion checkbox
- View daily study requirements

**Data Updates**: Update completion status, progress percentage, and streak counter in localStorage.

### 3.4 AI Tutor Page (Ask Anything)

**Purpose**: Provide instant answers to subject questions through chat interface.

**Components**:
- Chat interface resembling messaging app
- Message input field
- Example question suggestion chips below input
- Chat history display area

**User Actions**:
- Type subject question in input field
- Click suggestion chips to auto-fill questions
- Send message to receive AI response

**Response Behavior**: AI provides clear, educational explanations to student questions.

**Data Persistence**: Preserve chat history during current session.

### 3.5 Quiz Page

**Purpose**: Test student knowledge on current topic through multiple choice questions.

**Components**:
- 5 multiple choice questions on student's current topic
- Timer displaying 10-minute countdown
- Submit button
- Results screen showing:
  - Score
  - Correct answers
  - Explanations for each question
  - Try Again button
  - Next Topic button

**User Actions**:
- Select answers for each question
- Submit quiz before timer expires
- Review results and explanations
- Retake quiz or proceed to next topic

**Data Storage**: Store quiz scores in localStorage.

### 3.6 Progress Dashboard

**Purpose**: Display comprehensive learning statistics and motivate continued study.

**Summary Statistics**:
- Days Studied
- Quizzes Taken
- Average Score
- Current Streak

**Visualizations**:
- Bar chart showing quiz scores over time
- Plan completion percentage

**Motivational Element**: Display motivational message based on student performance.

### 3.7 Navigation

**Purpose**: Enable quick access to all main pages.

**Implementation**:
- Sticky sidebar on desktop
- Bottom navigation bar on mobile

**Navigation Items** (with icons):
- Home
- Study Plan
- AI Tutor
- Quiz
- Progress

## 4. Business Rules and Logic

### 4.1 Study Plan Generation
- Generate 7-day plan based on:
  - Selected subject
  - Study goal
  - Available hours per day
  - Target date
- Each day includes topics, duration, and focus areas

### 4.2 Progress Calculation
- Plan completion percentage = (completed days / 7) × 100
- Streak counter increments when consecutive days are marked complete
- Streak resets if a day is skipped

### 4.3 Quiz Scoring
- Each correct answer contributes to total score
- Average score = sum of all quiz scores / number of quizzes taken

### 4.4 Data Persistence
- Use localStorage to store:
  - Student profile (name, subject, grade, goal, hours, target date)
  - Study plan completion status
  - Quiz scores and history
  - Chat history (session only)
  - Progress statistics

## 5. Exceptions and Edge Cases

| Scenario | Handling |
|----------|----------|
| User submits onboarding form with empty required fields | Display validation error, prevent form submission |
| User attempts to mark future days as complete | Allow marking (no restriction) |
| Quiz timer reaches zero before submission | Auto-submit quiz with current selections |
| User closes browser and returns later | Restore all data from localStorage |
| No quiz history exists on Progress Dashboard | Display message: No quizzes taken yet |
| User completes all 7 days of study plan | Display completion message and congratulations |

## 6. Acceptance Criteria

1. User lands on Home Page, clicks Start Learning button, and is directed to Onboarding Form
2. User fills all onboarding fields (Student Name, Subject, Grade, Study Goal, Available Hours, Target Date) and clicks Generate My Study Plan
3. User views personalised 7-day study plan with all day cards displaying topics, duration, and focus areas
4. User navigates to AI Tutor Page, types a subject question, and receives educational explanation
5. User navigates to Quiz Page, answers 5 multiple choice questions, submits before timer expires, and views score with explanations
6. User navigates to Progress Dashboard and views summary statistics (Days Studied, Quizzes Taken, Average Score, Current Streak) and bar chart
7. User marks a study plan day as complete, and progress bar updates to reflect completion percentage
8. User closes browser, reopens application, and all previously entered data and progress are restored from localStorage

## 7. Out of Scope for This Release

- User authentication and login system
- Multi-user support or user accounts
- Social features (sharing progress, commenting, liking)
- Advanced analytics or detailed performance reports
- Integration with external learning management systems
- Offline mode or progressive web app capabilities
- Customisation of study plan beyond initial onboarding inputs
- Notification system or reminders
- Export or print functionality for study plans or quiz results
- Multi-language support
- Dark mode or theme customisation
- File upload or attachment features
- Video or audio learning materials
- Peer-to-peer tutoring or collaboration features