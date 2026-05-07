import CourseRecommendationsCard from './CourseRecommendationsCard';
import ImprovementCards from './ImprovementCards';
import JDWarningBanner from './JDWarningBanner';
import ResultsActions from './ResultsActions';
import ResultsHeadline from './ResultsHeadline';
import ScoreCard from './ScoreCard';
import SkillGapCard from './SkillGapCard';

const CVAnalysisResultsView = ({
  coursesRef,
  computed,
  showCourses,
  handleAnalyzeAnother,
  handleShowCourses,
  handleExportReport,
}) => (
  <main className="cv-analysis-results-main">
    <ResultsHeadline handleExportReport={handleExportReport} />
    <JDWarningBanner warning={computed.jdWarning} />
    <ScoreCard computed={computed} />
    <ImprovementCards computed={computed} />
    <SkillGapCard computed={computed} handleShowCourses={handleShowCourses} />

    {showCourses && (
      <CourseRecommendationsCard
        coursesRef={coursesRef}
        courseRecommendations={computed.courseRecommendations}
      />
    )}

    <ResultsActions
      showCourses={showCourses}
      hasCourseRecommendations={computed.courseRecommendations.length > 0}
      handleAnalyzeAnother={handleAnalyzeAnother}
      handleShowCourses={handleShowCourses}
    />
  </main>
);

export default CVAnalysisResultsView;
