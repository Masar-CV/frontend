const SkillChipGroup = ({ title, skills, emptyText, chipClass = '', cardClass = '' }) => (
  <article className={`skill-group-card ${cardClass}`.trim()}>
    <h3>{`${title} (${skills.length})`}</h3>
    <div className="skill-chip-list">
      {skills.length ? (
        skills.map((skill) => (
          <span key={`${title}-${skill}`} className={`skill-chip ${chipClass}`.trim()}>
            {skill}
          </span>
        ))
      ) : (
        <p className="empty-skill-text">{emptyText}</p>
      )}
    </div>
  </article>
);

export default SkillChipGroup;
