import { useState } from 'react';
import { INTERVIEW_DATA } from './mockInterviewData';

const useMockInterviewController = () => {
  const [jobRole, setJobRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [screen, setScreen] = useState('setup');
  const [answer, setAnswer] = useState('');

  const questionNumber = INTERVIEW_DATA.questionIndex + 1;
  const progressPercent = Math.round(
    (questionNumber / INTERVIEW_DATA.totalQuestions) * 100
  );
  const progressFillPercent = 31.2;
  const canGoNext = answer.trim().length > 0;
  const overallScore = 80;

  const handleStartInterview = () => {
    setScreen('interview');
  };

  const handleGoBack = () => {
    setScreen('setup');
  };

  const handleNextQuestion = () => {
    if (!canGoNext) return;
    setScreen('results');
  };

  const handleStartNewInterview = () => {
    setAnswer('');
    setScreen('setup');
  };

  return {
    jobRole,
    difficulty,
    screen,
    answer,
    questionNumber,
    progressPercent,
    progressFillPercent,
    canGoNext,
    overallScore,
    setJobRole,
    setDifficulty,
    setAnswer,
    handleStartInterview,
    handleGoBack,
    handleNextQuestion,
    handleStartNewInterview,
  };
};

export default useMockInterviewController;
