import './CVAnalysis.css';

const CVAnalysis = () => {
  return (
    <div className="cv-analysis">
      <div className="cv-analysis-header">
        <h1 className="page-title">CV Analysis</h1>
        <p className="page-subtitle">Upload your CV to get personalized insights</p>
      </div>

      <div className="cv-analysis-content">
        <div className="upload-section">
          <h2 className="section-title">Upload Your CV</h2>
          <div className="upload-area">
            <p>Drag and drop your CV here or click to browse</p>
            <button type="button" className="btn btn-primary">Choose File</button>
          </div>
        </div>

        <div className="results-section">
          <h2 className="section-title">Analysis Results</h2>
          <p className="placeholder-text">Upload a CV to see analysis results</p>
        </div>
      </div>
    </div>
  );
};

export default CVAnalysis;

