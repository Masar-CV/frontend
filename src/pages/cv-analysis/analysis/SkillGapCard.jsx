import SkillChipGroup from './SkillChipGroup';
import TransferableSkillsSection from './TransferableSkillsSection';

const SkillGapCard = ({ computed, handleShowCourses }) => (
  <section className="cv-results-skills-card">
    <header className="results-card-header horizontal">
      <div>
        <h2>Skill Gap Analysis</h2>
        <p>Skills identified from the job description</p>
      </div>
      <button type="button" onClick={handleShowCourses}>
        See Course Recommendations
      </button>
    </header>

    <div className="skill-coverage-grid">
      <div className="coverage-card">
        <span>CV Skills</span>
        <strong>{computed.totalCvSkills}</strong>
      </div>
      <div className="coverage-card">
        <span>JD Skills</span>
        <strong>{computed.totalJdSkills}</strong>
      </div>
      <div className="coverage-card matching">
        <span>Matching</span>
        <strong>{computed.totalMatchingSkills}</strong>
      </div>
      <div className="coverage-card missing">
        <span>Missing</span>
        <strong>{computed.totalMissingSkills}</strong>
      </div>
    </div>

    <div className="coverage-bars">
      <div className="coverage-row">
        <div className="coverage-row-top">
          <span>Skill Coverage</span>
          <span>{computed.skillCoverage}%</span>
        </div>
        <div className="coverage-track">
          <div
            className="coverage-fill"
            style={{ width: `${computed.skillCoverage}%` }}
          />
        </div>
      </div>
    </div>

    <div className="skill-groups-grid">
      <SkillChipGroup
        title="Skills in CV"
        skills={computed.cvSkills}
        emptyText="No skills found in CV."
      />
      <SkillChipGroup
        title="Skills in Job Description"
        skills={computed.jdSkills}
        emptyText="No skills found in job description."
        chipClass="jd"
      />
      <SkillChipGroup
        title="Missing Skills"
        skills={computed.missingSkills}
        emptyText="No missing skills."
        chipClass="missing"
        cardClass="missing"
      />
    </div>

    <TransferableSkillsSection
      transferableSkills={computed.transferableSkills}
    />
  </section>
);

export default SkillGapCard;
