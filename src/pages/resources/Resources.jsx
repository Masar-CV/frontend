import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import colImage from '../../assets/images/Col.png';
import { COVER_TEMPLATES, CV_TEMPLATES } from './templateData';
import './Resources.css';

const tabs = [
  { id: 'cv', label: 'CV Templates' },
  { id: 'cover', label: 'Cover Letters' },
];

const getCoverIcon = (type) => {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 8l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h9l4 4v12H6z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 4v4h4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 12h6M9 15h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
};

const copyIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 9h10v10H9z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 15H4V5h10v1" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Resources = () => {
  const [activeTab, setActiveTab] = useState('cover');
  const [selectedCoverTemplate, setSelectedCoverTemplate] = useState(null);
  const [copiedTemplateId, setCopiedTemplateId] = useState('');

  const templates = useMemo(() => (activeTab === 'cover' ? COVER_TEMPLATES : CV_TEMPLATES), [activeTab]);

  const handleCopyTemplate = async (template) => {
    try {
      await navigator.clipboard.writeText(template.fullText || template.excerpt || template.title);
      setCopiedTemplateId(template.id);
      window.setTimeout(() => {
        setCopiedTemplateId((prev) => (prev === template.id ? '' : prev));
      }, 1400);
    } catch {
      setCopiedTemplateId('');
    }
  };

  return (
    <div className="resources-page">
      <Navbar />

      <main className="resources-main">
        <div className="resources-shell">
          <section className="resources-hero">
            <div className="resources-hero-content">
              <h1 className="resources-title">Career Resources</h1>
              <p className="resources-description">
                Choose an ATS-ready career resources template in your preferred style and format.
              </p>
              <p className="resources-description">
                Try our free online resume builder and enjoy unlimited PDF downloads.
              </p>
              <p className="resources-description">No paywall. No watermarks. No hidden fees. Yes, really!</p>

              <div className="resources-switch" role="tablist" aria-label="Resource type">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`resources-switch-option ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="resources-hero-image-wrap" aria-hidden="true">
              <img src={colImage} alt="" className="resources-hero-image" />
            </div>
          </section>

          {activeTab === 'cover' ? (
            <section className="cover-grid" aria-label="Cover letter resources">
              {templates.map((template) => (
                <article className="cover-card" key={template.id}>
                  <header className="cover-card-header">
                    <div className="cover-card-title-wrap">
                      <span className={`cover-card-icon ${template.type === 'email' ? 'email' : 'letter'}`}>
                        {getCoverIcon(template.type)}
                      </span>
                      <h3 className="cover-card-title">{template.title}</h3>
                    </div>
                    <span className={`cover-card-badge ${template.badgeStyle === 'dark' ? 'dark' : ''}`}>
                      {template.category}
                    </span>
                  </header>

                  <p className="cover-card-summary">{template.summary}</p>

                  <div className="cover-card-snippet">
                    <p>{template.excerpt}</p>
                  </div>

                  <div className="cover-card-actions">
                    <button type="button" className="cover-action view" onClick={() => setSelectedCoverTemplate(template)}>
                      View Full
                    </button>
                    <button type="button" className="cover-action copy" onClick={() => handleCopyTemplate(template)}>
                      {copyIcon}
                      {copiedTemplateId === template.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="cv-grid" aria-label="CV template resources">
              {templates.map((template) => (
                <article className="cv-card" key={template.id}>
                  <h3 className="cv-card-title">{template.title}</h3>
                  <span className="cv-card-category">{template.category}</span>
                  <p className="cv-card-copy">
                    ATS-ready resume template with a clean structure for editing and PDF export.
                  </p>
                  <Link to={`/dashboard/resources/editor/${template.id}`} className="cv-card-button">
                    Use Template
                  </Link>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>

      <Footer />

      {selectedCoverTemplate && (
        <div className="cover-modal-overlay" role="presentation" onClick={() => setSelectedCoverTemplate(null)}>
          <div
            className="cover-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cover-template-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cover-modal-close"
              aria-label="Close"
              onClick={() => setSelectedCoverTemplate(null)}
            >
              x
            </button>
            <h3 id="cover-template-modal-title">{selectedCoverTemplate.title}</h3>
            <p className="cover-modal-type">{selectedCoverTemplate.category}</p>
            <pre>{selectedCoverTemplate.fullText}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
