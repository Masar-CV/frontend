import { copyIcon, getCoverIcon } from './resourceIcons';

const CoverTemplateCard = ({ copiedTemplateId, template, onCopyTemplate, onViewTemplate }) => (
  <article className="cover-card">
    <header className="cover-card-header">
      <div className="cover-card-title-wrap">
        <span className={`cover-card-icon ${template.type === 'email' ? 'email' : 'letter'}`}>
          {getCoverIcon(template.type)}
        </span>
        <h3 className="cover-card-title">{template.title}</h3>
      </div>
      <span className={`cover-card-badge ${template.badgeStyle === 'dark' ? 'dark' : ''}`}>{template.category}</span>
    </header>

    <p className="cover-card-summary">{template.summary}</p>

    <div className="cover-card-snippet">
      <p>{template.excerpt}</p>
    </div>

    <div className="cover-card-actions">
      <button type="button" className="cover-action view" onClick={() => onViewTemplate(template)}>
        View Full
      </button>
      <button type="button" className="cover-action copy" onClick={() => onCopyTemplate(template)}>
        {copyIcon}
        {copiedTemplateId === template.id ? 'Copied' : 'Copy'}
      </button>
    </div>
  </article>
);

export default CoverTemplateCard;
