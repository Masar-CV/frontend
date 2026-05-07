const ResultsActions = ({
  showCourses,
  hasCourseRecommendations,
  handleAnalyzeAnother,
  handleShowCourses,
}) => (
  <section className="cv-results-actions">
    <button type="button" className="primary" onClick={handleAnalyzeAnother}>
      Analyze Another CV
    </button>
    {!showCourses && hasCourseRecommendations && (
      <button type="button" className="secondary" onClick={handleShowCourses}>
        View Course Recommendations
      </button>
    )}
  </section>
);

export default ResultsActions;
