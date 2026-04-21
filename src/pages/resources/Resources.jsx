import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { COVER_TEMPLATES, CV_TEMPLATES } from './templateData';
import './Resources.css';

const tabs = [
  { id: 'cv', label: 'CV Templates' },
  { id: 'cover', label: 'Cover Letters' },
];

const templateCollections = {
  cv: CV_TEMPLATES,
  cover: COVER_TEMPLATES,
};

const TemplatePreview = ({ variant }) => (
  <div className={`template-preview template-preview--${variant}`} aria-hidden="true">
    <div className="template-preview-sidebar">
      <span className="preview-avatar" />
      <span className="preview-small-line" />
      <span className="preview-small-line preview-small-line--short" />
    </div>
    <div className="template-preview-body">
      <div className="preview-section">
        <span className="preview-line preview-line--title" />
        <span className="preview-line" />
        <span className="preview-line preview-line--medium" />
      </div>
      <div className="preview-section">
        <span className="preview-line preview-line--accent" />
        <span className="preview-line" />
        <span className="preview-line preview-line--medium" />
        <span className="preview-line preview-line--short" />
      </div>
      <div className="preview-section">
        <span className="preview-line preview-line--accent" />
        <span className="preview-line" />
        <span className="preview-line preview-line--short" />
      </div>
    </div>
  </div>
);

const TemplateCard = ({ template }) => (
  <article className="resource-card">
    <TemplatePreview variant={template.variant} />
    <div className="resource-card-body">
      <h3 className="resource-card-title">{template.title}</h3>
      <p className="resource-card-category">{template.category}</p>
      <Link to={`/dashboard/resources/editor/${template.id}`} className="resource-card-button">
        Use this template
      </Link>
    </div>
  </article>
);

const Resources = () => {
  const [activeTab, setActiveTab] = useState('cv');
  const templates = useMemo(() => templateCollections[activeTab], [activeTab]);

  return (
    <div className="resources-page">
      <Navbar />

      <main className="resources-main">
        <div className="resources-shell">
          <section className="resources-hero">
            <div className="resources-intro">
              <h1 className="resources-title">Career Resources</h1>
              <p className="resources-description">
                Choose an ATS-ready career resources template in your preferred style and format.
              </p>
              <p className="resources-description">
                Try our <span className="resources-highlight">free online resume builder</span> and enjoy unlimited PDF
                downloads.
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

            <div className="resources-art" aria-hidden="true">
              <div className="resume-mockup">
                <div className="resume-mockup-sidebar">
                  <span className="resume-avatar" />
                  <span className="resume-line resume-line--light" />
                  <span className="resume-line resume-line--soft" />
                  <span className="resume-line resume-line--soft short" />
                  <span className="resume-line resume-line--soft tiny" />
                </div>
                <div className="resume-mockup-content">
                  <span className="resume-line resume-line--dark wide" />
                  <span className="resume-line resume-line--dark medium" />
                  <span className="resume-line resume-line--soft wide" />
                  <span className="resume-line resume-line--soft medium" />
                  <span className="resume-line resume-line--dark medium" />
                  <span className="resume-line resume-line--soft wide" />
                  <span className="resume-line resume-line--soft short" />
                  <span className="resume-line resume-line--dark medium" />
                  <span className="resume-line resume-line--soft wide" />
                </div>
              </div>
            </div>
          </section>

          <section className="resources-gallery" aria-label="Template gallery">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
