import './SkillsEducation.css';

const CATEGORY_COLORS = {
  'Programming Languages': { bg: '#eff6ff', text: '#1e40af' },
  'Frontend': { bg: '#f0fdf4', text: '#166534' },
  'Backend': { bg: '#fef3c7', text: '#92400e' },
  'Databases': { bg: '#fce7f3', text: '#9d174d' },
  'AI/ML': { bg: '#f5f3ff', text: '#5b21b6' },
  'Tools': { bg: '#ecfdf5', text: '#065f46' },
  'Architecture': { bg: '#fff7ed', text: '#9a3412' },
  'DevOps': { bg: '#fdf4ff', text: '#86198f' },
  'Cloud': { bg: '#f0f9ff', text: '#0369a1' }
};

/**
 * SkillsEducation Component
 * Displays skills as categorized chips and lists education/projects
 */
const SkillsEducation = ({ skillsDetected, education, projects, certifications }) => {
  const getCategoryStyle = (category) => {
    return CATEGORY_COLORS[category] || { bg: '#f3f4f6', text: '#374151' };
  };

  const skillCategories = Object.entries(skillsDetected || {}).filter(
    ([_, skills]) => skills && skills.length > 0
  );

  return (
    <div className="skills-education-container">
      {/* Skills Section */}
      <div className="se-card">
        <h2 className="se-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Skills Detected
        </h2>
        
        {skillCategories.length === 0 ? (
          <p className="no-data">No skills detected</p>
        ) : (
          <div className="skills-categories">
            {skillCategories.map(([category, skills]) => {
              const style = getCategoryStyle(category);
              return (
                <div key={category} className="skill-category">
                  <h3 className="category-name">{category}</h3>
                  <div className="skills-chips">
                    {skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-chip"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="se-card">
        <h2 className="se-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          Education
        </h2>
        
        {!education || education.length === 0 ? (
          <p className="no-data">No education data available</p>
        ) : (
          <div className="education-list">
            {education.map((item, index) => (
              <div key={index} className="education-item">
                <div className="edu-bullet" />
                <p className="edu-text">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div className="se-card">
          <h2 className="se-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            Projects
          </h2>
          
          <div className="projects-list">
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-bullet" />
                <p className="project-text">{project}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <div className="se-card">
          <h2 className="se-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
            Certifications
          </h2>
          
          <div className="certifications-list">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsEducation;
