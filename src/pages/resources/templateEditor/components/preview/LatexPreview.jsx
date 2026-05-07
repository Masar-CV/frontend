import { splitDescriptionLines } from '../../templateEditorUtils';

const LatexPreview = ({
  cvData,
  latexPreview,
  latexPreviewMode,
  setLatexPreviewMode,
  visibleCustomSections,
}) => (
  <>
    <div className="latex-preview-switch" role="tablist" aria-label="LaTeX preview mode">
      <button
        type="button"
        role="tab"
        aria-selected={latexPreviewMode === 'rendered'}
        className={`latex-preview-switch-button ${latexPreviewMode === 'rendered' ? 'active' : ''}`}
        onClick={() => setLatexPreviewMode('rendered')}
      >
        Result
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={latexPreviewMode === 'code'}
        className={`latex-preview-switch-button ${latexPreviewMode === 'code' ? 'active' : ''}`}
        onClick={() => setLatexPreviewMode('code')}
      >
        LaTeX Code
      </button>
    </div>

    {latexPreviewMode === 'code' ? (
      <article className="latex-preview-paper" aria-label="LaTeX template code preview">
        <pre className="latex-code-preview">{latexPreview}</pre>
      </article>
    ) : (
      <LatexRenderedPreview cvData={cvData} visibleCustomSections={visibleCustomSections} />
    )}
  </>
);

const LatexRenderedPreview = ({ cvData, visibleCustomSections }) => (
  <article className="latex-rendered-paper" aria-label="LaTeX template result preview">
    <header className="latex-rendered-header">
      <h3 className="latex-rendered-name">{cvData.personal.fullName || 'Your Name'}</h3>
      <p className="latex-rendered-contact">
        {[cvData.personal.location, cvData.personal.phone, cvData.personal.email].filter(Boolean).join(' | ')}
      </p>
      <p className="latex-rendered-links">
        <PersonalLinks personal={cvData.personal} />
      </p>
    </header>

    {cvData.summary && (
      <section className="latex-rendered-section">
        <h4 className="latex-rendered-section-title">Summary</h4>
        <p className="latex-rendered-text">{cvData.summary}</p>
      </section>
    )}

    <LatexCollectionSection
      collection={cvData.education}
      renderItem={(item) => (
        <article key={item.id} className="latex-rendered-item">
          <div className="latex-rendered-item-head">
            <strong>{item.institution}</strong>
            <span>{item.location}</span>
          </div>
          <div className="latex-rendered-item-sub">
            <em>{item.degree}</em>
            <em>{item.year}</em>
          </div>
        </article>
      )}
      title="Education"
    />

    <LatexCollectionSection
      collection={cvData.experiences}
      renderItem={(item) => (
        <LatexDetailedItem
          key={item.id}
          heading={item.role}
          id={item.id}
          meta={item.period}
          subheading={item.company}
          subMeta={item.location || ''}
          description={item.description}
        />
      )}
      title="Experience"
    />

    <LatexCollectionSection
      collection={cvData.projects}
      renderItem={(item) => (
        <LatexDetailedItem
          key={item.id}
          heading={item.heading}
          id={item.id}
          linkLabel={item.linkLabel}
          meta={item.period || ''}
          subheading={item.subheading}
          subMeta=""
          url={item.url}
          description={item.description}
        />
      )}
      title="Projects"
    />

    {cvData.skills.length > 0 && (
      <section className="latex-rendered-section">
        <h4 className="latex-rendered-section-title">Technical Skills</h4>
        <p className="latex-rendered-text">{cvData.skills.join(', ')}</p>
      </section>
    )}

    {visibleCustomSections.map((section) => (
      <section key={section.id} className="latex-rendered-section">
        <h4 className="latex-rendered-section-title">{section.title || 'Custom Section'}</h4>
        {section.items.map((item) => (
          <LatexDetailedItem
            key={item.id}
            heading={item.heading || 'Item Title'}
            id={item.id}
            meta={item.period || ''}
            subheading={item.subheading || ''}
            subMeta=""
            description={item.description}
          />
        ))}
      </section>
    ))}
  </article>
);

const PersonalLinks = ({ personal }) => {
  const links = [
    { label: 'LinkedIn', url: personal.linkedin },
    { label: 'GitHub', url: personal.github },
    { label: 'Website', url: personal.website },
  ].filter((link) => link.url);

  return links.map((link, index) => (
    <span key={link.label}>
      {index > 0 && ' | '}
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </span>
  ));
};

const LatexCollectionSection = ({ collection, renderItem, title }) => {
  if (collection.length === 0) {
    return null;
  }

  return (
    <section className="latex-rendered-section">
      <h4 className="latex-rendered-section-title">{title}</h4>
      {collection.map(renderItem)}
    </section>
  );
};

const LatexDetailedItem = ({ description, heading, id, linkLabel, meta, subheading, subMeta, url }) => {
  const lines = splitDescriptionLines(description);

  return (
    <article className="latex-rendered-item">
      <div className="latex-rendered-item-head">
        <strong>{heading}</strong>
        <span>{meta}</span>
      </div>
      <div className="latex-rendered-item-sub">
        <em>{subheading}</em>
        <em>
          {linkLabel && url && (
            <a href={url} target="_blank" rel="noreferrer">
              {linkLabel}
            </a>
          )}
          {linkLabel && !url && linkLabel}
          {!linkLabel && subMeta}
        </em>
      </div>
      {lines.length > 0 && (
        <ul className="latex-rendered-list">
          {lines.map((line, index) => (
            <li key={`${id}-${index}`}>{line}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default LatexPreview;
