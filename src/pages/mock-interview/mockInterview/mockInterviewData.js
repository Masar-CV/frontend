export const JOB_ROLE_OPTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'QA Engineer',
  'Product Manager',
];

export const DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

export const EXPECTATIONS = [
  '4 role-specific interview questions',
  'Mix of technical, behavioral, and problem-solving questions',
  'Instant AI-powered feedback on each answer',
  'Detailed performance report at the end',
];

export const INTERVIEW_DATA = {
  totalQuestions: 4,
  questionIndex: 0,
  questionType: 'Technical',
  question:
    "Can you describe your experience with React and how you've used it in recent projects?",
  tip: 'Focus on specific projects, challenges you faced, and solutions you implemented.',
};

export const RESULT_STRENGTHS = [
  'Clear communication',
  'Specific examples provided',
  'Good structure',
];

export const RESULT_IMPROVEMENTS = [
  'Could elaborate more on technical details',
  'Add more quantifiable results',
];

export const RESULT_QUESTIONS = [
  {
    id: 1,
    category: 'Technical',
    score: 72,
    scoreTone: 'info',
    prompt:
      "Can you describe your experience with React and how you've used it in recent projects?",
  },
  {
    id: 2,
    category: 'Behavioral',
    score: 71,
    scoreTone: 'info',
    prompt:
      'How do you handle tight deadlines and prioritize tasks when working on multiple projects?',
  },
  {
    id: 3,
    category: 'Problem Solving',
    score: 86,
    scoreTone: 'strong',
    prompt:
      'Explain a time when you had to debug a complex issue. What was your approach?',
  },
  {
    id: 4,
    category: 'Professional Development',
    score: 92,
    scoreTone: 'strong',
    prompt:
      'What strategies do you use to stay updated with the latest web development trends?',
  },
];
