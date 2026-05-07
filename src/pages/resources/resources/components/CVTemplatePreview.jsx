const CVTemplatePreview = ({ variant }) => {
  if (variant === 'modern') {
    return <ModernTemplatePreview />;
  }

  if (variant === 'creative') {
    return <CreativeTemplatePreview />;
  }

  if (variant === 'executive') {
    return <ExecutiveTemplatePreview />;
  }

  if (variant === 'tech') {
    return <TechTemplatePreview />;
  }

  if (variant === 'academic') {
    return <AcademicTemplatePreview />;
  }

  if (variant === 'timeline') {
    return <TimelineTemplatePreview />;
  }

  if (variant === 'minimalist') {
    return <MinimalistTemplatePreview />;
  }

  return <ClassicTemplatePreview />;
};

const Lines = ({ count = 3, tone = 'gray' }) => (
  <div className={`cv-template-lines cv-template-lines--${tone}`}>
    {Array.from({ length: count }).map((_, index) => (
      <span key={index} />
    ))}
  </div>
);

const ModernTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--modern" aria-hidden="true">
    <aside className="cv-preview-modern-sidebar">
      <span className="cv-preview-avatar" />
      <Lines count={2} tone="light" />
      <Lines count={3} tone="light" />
    </aside>
    <main className="cv-preview-document-area">
      <Lines count={3} />
      <Lines count={4} tone="blue" />
      <Lines count={3} />
    </main>
  </div>
);

const ClassicTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--classic" aria-hidden="true">
    <span className="cv-preview-title-bar dark" />
    <div className="cv-preview-classic-grid">
      <Lines count={4} />
      <Lines count={4} />
    </div>
    <Lines count={5} />
  </div>
);

const CreativeTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--creative" aria-hidden="true">
    <span className="cv-preview-creative-orb" />
    <Lines count={4} tone="pink" />
    <Lines count={4} />
    <span className="cv-preview-creative-panel" />
  </div>
);

const MinimalistTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--minimalist" aria-hidden="true">
    <span className="cv-preview-title-bar dark small" />
    <Lines count={2} />
    <Lines count={4} />
    <Lines count={3} />
  </div>
);

const ExecutiveTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--executive" aria-hidden="true">
    <div className="cv-preview-executive-header">
      <span />
      <span />
    </div>
    <div className="cv-preview-executive-box">
      <Lines count={3} />
    </div>
    <div className="cv-preview-executive-timeline">
      <Lines count={3} />
    </div>
  </div>
);

const TechTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--tech" aria-hidden="true">
    <div className="cv-preview-tech-panel">
      <span className="cv-preview-tech-heading" />
      <div className="cv-preview-tech-chip-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <Lines count={4} tone="cyan" />
    </div>
  </div>
);

const AcademicTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--academic" aria-hidden="true">
    <div className="cv-preview-academic-header">
      <span />
      <span />
      <span />
    </div>
    <Lines count={3} />
    <Lines count={2} />
    <div className="cv-preview-academic-tags">
      <span />
      <span />
      <span />
    </div>
  </div>
);

const TimelineTemplatePreview = () => (
  <div className="cv-template-preview cv-template-preview--timeline" aria-hidden="true">
    <div className="cv-preview-timeline-header">
      <span />
      <span />
    </div>
    <div className="cv-preview-timeline-list">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="cv-preview-timeline-item" key={index}>
          <span className="cv-preview-timeline-dot" />
          <Lines count={3} />
        </div>
      ))}
    </div>
  </div>
);

export default CVTemplatePreview;
