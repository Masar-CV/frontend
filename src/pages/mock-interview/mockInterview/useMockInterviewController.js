import { useState } from 'react';
import mockInterviewService from '../../../services/mockInterviewService';

const useMockInterviewController = () => {
  const [cvFile, setCvFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [screen, setScreen] = useState('setup');
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answerAnalyses, setAnswerAnalyses] = useState({});
  const [apiResult, setApiResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [setupError, setSetupError] = useState('');
  const [answerError, setAnswerError] = useState('');

  const currentQuestion = questions[currentQuestionIndex] || null;
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length || 1;
  const answer = answers[currentQuestionIndex] || '';
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);
  const progressFillPercent = progressPercent;
  const canGoNext = answer.trim().length > 0 && !isAnalyzing;
  const analysisScores = Object.values(answerAnalyses)
    .map((analysis) => Number(analysis?.score))
    .filter(Number.isFinite);
  const averageAnalysisScore = analysisScores.length
    ? analysisScores.reduce((total, score) => total + score, 0) / analysisScores.length
    : null;
  const overallScore = Math.round(
    averageAnalysisScore ?? apiResult?.gap_score ?? apiResult?.gap?.final_score ?? 0
  );

  const handleStartInterview = async () => {
    setSetupError('');
    setIsGenerating(true);

    try {
      const result = await mockInterviewService.generateQuestions({
        file: cvFile,
        jobDescription,
      });
      const generatedQuestions = Array.isArray(result?.questions)
        ? result.questions
        : [];

      if (!generatedQuestions.length) {
        throw new Error('No interview questions were returned. Please try again.');
      }

      setApiResult(result);
      setQuestions(generatedQuestions);
      setAnswers({});
      setAnswerAnalyses({});
      setAnswerError('');
      setCurrentQuestionIndex(0);
      setScreen('interview');
    } catch (error) {
      setSetupError(error.message || 'Failed to generate interview questions.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGoBack = () => {
    setAnswerError('');

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((index) => index - 1);
      return;
    }

    setScreen('setup');
  };

  const handleNextQuestion = async () => {
    if (!canGoNext) return;

    setAnswerError('');
    setIsAnalyzing(true);

    try {
      const analysis = await mockInterviewService.analyzeAnswer({
        userAnswer: answer,
        questionData: currentQuestion,
      });

      setAnswerAnalyses((current) => ({
        ...current,
        [currentQuestionIndex]: analysis,
      }));

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((index) => index + 1);
        return;
      }

      setScreen('results');
    } catch (error) {
      setAnswerError(error.message || 'Failed to analyze your answer.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartNewInterview = () => {
    setCvFile(null);
    setJobDescription('');
    setSetupError('');
    setAnswerError('');
    setAnswers({});
    setAnswerAnalyses({});
    setQuestions([]);
    setApiResult(null);
    setCurrentQuestionIndex(0);
    setScreen('setup');
  };

  const setAnswer = (value) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestionIndex]: value,
    }));
  };

  return {
    cvFile,
    jobDescription,
    screen,
    answer,
    answers,
    answerAnalyses,
    questions,
    currentQuestion,
    questionNumber,
    totalQuestions,
    progressPercent,
    progressFillPercent,
    canGoNext,
    overallScore,
    apiResult,
    isGenerating,
    isAnalyzing,
    setupError,
    answerError,
    setCvFile,
    setJobDescription,
    setAnswer,
    handleStartInterview,
    handleGoBack,
    handleNextQuestion,
    handleStartNewInterview,
  };
};

export default useMockInterviewController;
