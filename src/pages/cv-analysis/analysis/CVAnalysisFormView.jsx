import { ThinkingOverlay } from '../../../components/ui';
import CVAnalysisHero from './CVAnalysisHero';
import CVAnalysisHistory from './CVAnalysisHistory';
import CVUploadPanel from './CVUploadPanel';
import JobDescriptionPanel from './JobDescriptionPanel';

const CVAnalysisFormView = ({
  fileInputRef,
  selectedFile,
  jobDescription,
  isDragging,
  isSubmitting,
  errorMessage,
  historyItems,
  isHistoryLoading,
  historyErrorMessage,
  setJobDescription,
  setIsDragging,
  setSelectedFile,
  openFileDialog,
  handleFilePicked,
  handleDrop,
  handleAnalyze,
  handleOpenHistoryItem,
}) => (
  <main className="cv-analysis-main">
    <CVAnalysisHero />

    <CVAnalysisHistory
      historyItems={historyItems}
      isHistoryLoading={isHistoryLoading}
      historyErrorMessage={historyErrorMessage}
      handleOpenHistoryItem={handleOpenHistoryItem}
    />

    <section className="cv-analysis-panels">
      <CVUploadPanel
        fileInputRef={fileInputRef}
        selectedFile={selectedFile}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        setSelectedFile={setSelectedFile}
        openFileDialog={openFileDialog}
        handleFilePicked={handleFilePicked}
        handleDrop={handleDrop}
      />

      <JobDescriptionPanel
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
    </section>

    {errorMessage && <p className="cv-analysis-error">{errorMessage}</p>}

    <button
      className="cv-analysis-btn"
      type="button"
      onClick={handleAnalyze}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Analyzing...' : 'Analyze My CV'}
    </button>

    {isSubmitting && (
      <ThinkingOverlay
        title="Thinking, analyzing your CV..."
        description="Reading your resume, comparing job requirements, and scoring the match."
      />
    )}
  </main>
);

export default CVAnalysisFormView;
