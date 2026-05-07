import { useMemo, useRef, useState } from 'react';
import cvMatchService from '../../../services/cvMatchService';
import { buildCVAnalysisResult } from './cvAnalysisResultMapper';

const useCVAnalysisController = () => {
  const fileInputRef = useRef(null);
  const coursesRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [showCourses, setShowCourses] = useState(false);

  const computed = useMemo(
    () => buildCVAnalysisResult(matchResult),
    [matchResult]
  );

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFilePicked = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setErrorMessage('');
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    setErrorMessage('');
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await cvMatchService.matchCV({
        file: selectedFile,
        jobDescription,
      });

      setMatchResult(response);
      setShowCourses(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrorMessage(error.message || 'Unable to analyze CV right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setMatchResult(null);
    setSelectedFile(null);
    setCvText('');
    setJobDescription('');
    setErrorMessage('');
    setShowCourses(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowCourses = () => {
    setShowCourses(true);
    setTimeout(() => {
      coursesRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleExportReport = () => {
    if (!matchResult) return;
    const blob = new Blob([JSON.stringify(matchResult, null, 2)], {
      type: 'application/json',
    });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `cv-match-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  return {
    fileInputRef,
    coursesRef,
    selectedFile,
    cvText,
    jobDescription,
    isDragging,
    isSubmitting,
    errorMessage,
    computed,
    showCourses,
    setCvText,
    setJobDescription,
    setIsDragging,
    setSelectedFile,
    openFileDialog,
    handleFilePicked,
    handleDrop,
    handleAnalyze,
    handleAnalyzeAnother,
    handleShowCourses,
    handleExportReport,
  };
};

export default useCVAnalysisController;
