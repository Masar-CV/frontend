const ResultsHeadline = ({ handleExportReport }) => (
  <section className="cv-results-headline">
    <div>
      <h1>Analysis Results</h1>
      <p>Here&apos;s your comprehensive CV analysis</p>
    </div>
    <button type="button" className="cv-results-export" onClick={handleExportReport}>
      Export Report
    </button>
  </section>
);

export default ResultsHeadline;
