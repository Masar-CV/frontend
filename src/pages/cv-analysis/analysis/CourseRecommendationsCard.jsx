import { formatSkill } from './cvAnalysisFormatters';

const CourseRecommendationsCard = ({ coursesRef, courseRecommendations }) => (
  <section className="cv-results-courses-card" ref={coursesRef}>
    <header className="results-card-header">
      <h2>Course Recommendations</h2>
      <p>Courses to help you acquire missing skills</p>
    </header>

    {courseRecommendations.length > 0 ? (
      <div className="courses-grid">
        {courseRecommendations.map((course, index) => (
          <div key={index} className="course-card">
            <div className="course-skill-badge">{formatSkill(course.skill)}</div>
            <h3 className="course-name">{course.name}</h3>
            <p className="course-university">{course.university}</p>
            <div className="course-footer">
              <div className="course-rating">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#fbbf24"
                  stroke="#fbbf24"
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{course.rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="course-link"
              >
                View Course
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-courses">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="1.5"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <p>No course recommendations available for your skill gaps.</p>
      </div>
    )}
  </section>
);

export default CourseRecommendationsCard;
