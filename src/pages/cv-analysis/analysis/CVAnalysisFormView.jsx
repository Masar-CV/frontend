import CVAnalysisHero from './CVAnalysisHero';
import CVUploadPanel from './CVUploadPanel';
import CVAnalysisThinkingOverlay from './CVAnalysisThinkingOverlay';
import JobDescriptionPanel from './JobDescriptionPanel';

const CVAnalysisFormView = ({
  fileInputRef,
  selectedFile,
  cvText,
  jobDescription,
  isDragging,
  isSubmitting,
  errorMessage,
  setCvText,
  setJobDescription,
  setIsDragging,
  setSelectedFile,
  openFileDialog,
  handleFilePicked,
  handleDrop,
  handleAnalyze,
}) => (
  <main className="cv-analysis-main">
    <CVAnalysisHero />

    <section className="cv-analysis-panels">
      <CVUploadPanel
        fileInputRef={fileInputRef}
        selectedFile={selectedFile}
        cvText={cvText}
        isDragging={isDragging}
        setCvText={setCvText}
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

    {isSubmitting && <CVAnalysisThinkingOverlay />}
  </main>
);

export default CVAnalysisFormView;
