import { createEducationItem, createExperienceItem, createProjectItem, fallbackCustomItem } from '../../templateEditorUtils';

const CVPreview = ({ contactLine, cvData, selectedTemplate, themeClass, visibleCustomSections }) => (
  <article className={`cv-preview-paper ${themeClass}`} aria-label={`${selectedTemplate.title} preview`}>
    <header className="cv-preview-header">
      <div className="cv-preview-personal">
        <h3 className="cv-preview-name">{cvData.personal.fullName || 'Your Name'}</h3>
        <p className="cv-preview-role">{cvData.personal.professionalTitle || 'Professional Title'}</p>
        <p className="cv-preview-contact">{contactLine || 'your.email@example.com | +20 123 456 789'}</p>
        <PersonalLinks personal={cvData.personal} />
      </div>
      <div className="cv-preview-bubble" />
    </header>

    <section className="cv-preview-section cv-preview-section--card">
      <h4 className="cv-preview-heading cv-preview-heading--primary">ABOUT ME</h4>
      <p className="cv-preview-text">{cvData.summary || 'Add a short summary about your skills and career goals.'}</p>
    </section>

    <section className="cv-preview-section">
      <h4 className="cv-preview-heading cv-preview-heading--primary">SKILLS</h4>
      <div className="cv-preview-skill-list">
        {(cvData.skills.length > 0 ? cvData.skills : ['Skill']).map((skill, index) => (
          <span key={`${skill}-${index}`} className="cv-preview-skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </section>

    <PreviewSection
      fallbackItems={[createExperienceItem()]}
      heading="EXPERIENCE"
      items={cvData.experiences}
      renderItem={(item) => (
        <PreviewBlock
          key={item.id}
          description={item.description || 'Describe your main achievements and impact.'}
          subtitle={[item.company || 'Company', item.period, item.location].filter(Boolean).join(' | ')}
          title={item.role || 'Role'}
        />
      )}
    />

    <PreviewSection
      fallbackItems={[createEducationItem()]}
      heading="EDUCATION"
      items={cvData.education}
      renderItem={(item) => (
        <PreviewBlock
          key={item.id}
          subtitle={(item.institution || 'Institution') + (item.year ? ` | ${item.year}` : '')}
          title={item.degree || 'Degree'}
        />
      )}
    />

    <PreviewSection
      fallbackItems={[createProjectItem()]}
      heading="PROJECTS"
      items={cvData.projects}
      renderItem={(item) => (
        <PreviewBlock
          key={item.id}
          description={item.description || 'Describe your project contribution.'}
          linkLabel={item.linkLabel}
          subtitle={[item.subheading || 'Stack', item.period].filter(Boolean).join(' | ')}
          title={item.heading || 'Project Name'}
          url={item.url}
        />
      )}
    />

    {visibleCustomSections.map((section) => (
      <PreviewSection
        fallbackItems={[fallbackCustomItem]}
        heading={(section.title || 'Custom Section').toUpperCase()}
        items={section.items}
        key={section.id}
        renderItem={(item) => (
          <PreviewBlock
            key={item.id}
            description={item.description}
            subtitle={(item.subheading || 'Subtitle') + (item.period ? ` | ${item.period}` : '')}
            title={item.heading || 'Item Title'}
          />
        )}
      />
    ))}
  </article>
);

const PersonalLinks = ({ personal }) => {
  const links = [
    { label: 'Website', url: personal.website },
    { label: 'LinkedIn', url: personal.linkedin },
    { label: 'GitHub', url: personal.github },
  ].filter((link) => link.url);

  if (links.length === 0) {
    return null;
  }

  return (
    <p className="cv-preview-contact cv-preview-contact-links">
      {links.map((link, index) => (
        <span key={link.label}>
          {index > 0 && ' | '}
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        </span>
      ))}
    </p>
  );
};

const PreviewSection = ({ fallbackItems, heading, items, renderItem }) => (
  <section className="cv-preview-section cv-preview-section--card">
    <h4 className="cv-preview-heading cv-preview-heading--secondary">{heading}</h4>
    {(items.length > 0 ? items : fallbackItems).map(renderItem)}
  </section>
);

const PreviewBlock = ({ description, linkLabel, subtitle, title, url }) => (
  <article className="cv-preview-block">
    <p className="cv-preview-block-title">{title}</p>
    <p className="cv-preview-block-subtitle">
      {subtitle}
      {linkLabel && subtitle && ' | '}
      {linkLabel && url && (
        <a href={url} target="_blank" rel="noreferrer">
          {linkLabel}
        </a>
      )}
      {linkLabel && !url && linkLabel}
    </p>
    {description && <p className="cv-preview-text">{description}</p>}
  </article>
);

export default CVPreview;
