const SkillProgressCard = ({ skills }) => (
  <section className="dashboard-card dashboard-skill-card">
    <h2>Skill Progress</h2>
    <div className="dashboard-skills-list">
      {skills.map((skill) => (
        <div key={skill.name} className="dashboard-skill-row">
          <div className="dashboard-skill-meta">
            <span>{skill.name}</span>
            <span>{`${skill.current} / 100`}</span>
          </div>
          <div className="dashboard-progress-track" role="presentation">
            <div
              className="dashboard-progress-fill"
              style={{ width: `${skill.current}%` }}
            />
          </div>
          <p className="dashboard-skill-target">{`Target: ${skill.target}`}</p>
        </div>
      ))}
    </div>
  </section>
);

export default SkillProgressCard;
