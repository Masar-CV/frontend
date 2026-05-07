import { formatSkill } from './cvAnalysisFormatters';

const TransferableSkillsSection = ({ transferableSkills }) => {
  if (!transferableSkills.length) return null;

  return (
    <div className="transferable-skills-section">
      <h3>Transferable Skills</h3>
      <p className="transferable-subtitle">
        Skills from related technology families that boost your match
      </p>
      <div className="transferable-list">
        {transferableSkills.map((item) => (
          <div key={item.skill} className="transferable-item">
            <div className="transferable-main">
              <span className="transferable-skill">{formatSkill(item.skill)}</span>
              <span className="transferable-credit">+{item.creditPct}%</span>
            </div>
            <div className="transferable-meta">
              <span>
                Similar to: <strong>{item.sibling}</strong>
              </span>
              <span>
                Family: <strong>{item.family}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferableSkillsSection;
