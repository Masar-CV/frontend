import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getTemplateById } from './templateData';
import { LATEX_TEMPLATE_DEFAULT_DATA, buildLatexTemplate, createLatexFileName } from './latexTemplate';
import './TemplateEditor.css';

const EDITOR_TABS = [
  { id: 'personal', label: 'Personal' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'custom', label: 'Custom Sections' },
];

const PERSONAL_FIELDS = [
  { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
  { key: 'professionalTitle', label: 'Professional Title', placeholder: 'Professional Title' },
  { key: 'email', label: 'Email', placeholder: 'john.doe@email.com' },
  { key: 'phone', label: 'Phone', placeholder: '+1 234 567 890' },
  { key: 'location', label: 'Location', placeholder: 'City, Country' },
  { key: 'website', label: 'Portfolio Website', placeholder: 'www.johndoe.com' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/johndoe' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/johndoe' },
];

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createExperienceItem = () => ({
  id: createId('exp'),
  role: 'Senior Position',
  company: 'Company Name',
  period: '2020 - Present',
  description: 'Led key initiatives and delivered exceptional results.',
});

const createEducationItem = () => ({
  id: createId('edu'),
  degree: 'Bachelor of Science',
  institution: 'University Name',
  year: '2019',
  location: 'City, Country',
});

const createProjectItem = () => ({
  id: createId('project'),
  heading: 'Project Name',
  subheading: 'Tech Stack',
  period: 'Context',
  description: 'Describe your contribution and the impact of this project.',
});

const createCustomSectionItem = () => ({
  id: createId('custom-item'),
  heading: 'Item Title',
  subheading: 'Subtitle',
  period: '',
  description: 'Add bullet points separated by new lines or semicolons.',
});

const createCustomSection = () => ({
  id: createId('custom'),
  title: 'New Section',
  items: [createCustomSectionItem()],
});

const parseSkills = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const splitDescriptionLines = (value) =>
  String(value || '')
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

const cloneCvData = (data) => JSON.parse(JSON.stringify(data));

const fallbackCustomItem = {
  id: 'preview-fallback',
  heading: 'Item Title',
  subheading: 'Subtitle',
  period: '',
  description: 'Add details for this item.',
};

const TemplateEditor = () => {
  const { templateId = 'creative' } = useParams();
  const selectedTemplate = getTemplateById(templateId);
  const [activeTab, setActiveTab] = useState('personal');
  const [cvData, setCvData] = useState(() => cloneCvData(LATEX_TEMPLATE_DEFAULT_DATA));
  const [skillsInput, setSkillsInput] = useState(() => LATEX_TEMPLATE_DEFAULT_DATA.skills.join(', '));
  const [latexPreviewMode, setLatexPreviewMode] = useState('rendered');
  const isLatexTemplate = selectedTemplate.id === 'latex';

  const themeClass = `cv-preview-theme-${selectedTemplate.variant}`;
  const latexPreview = useMemo(() => buildLatexTemplate(cvData), [cvData]);

  const contactLine = useMemo(() => {
    const items = [cvData.personal.email, cvData.personal.phone, cvData.personal.location].filter(Boolean);
    return items.join(' | ');
  }, [cvData.personal.email, cvData.personal.phone, cvData.personal.location]);

  const visibleCustomSections = useMemo(
    () =>
      cvData.customSections.filter(
        (section) => section.title.trim() || section.items.some((item) => item.heading.trim() || item.description.trim()),
      ),
    [cvData.customSections],
  );

  const handlePersonalChange = (field, value) => {
    setCvData((previous) => ({
      ...previous,
      personal: {
        ...previous.personal,
        [field]: value,
      },
    }));
  };

  const handleSummaryChange = (value) => {
    setCvData((previous) => ({
      ...previous,
      summary: value,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setCvData((previous) => ({
      ...previous,
      experiences: previous.experiences.map((experience, experienceIndex) =>
        experienceIndex === index ? { ...experience, [field]: value } : experience,
      ),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setCvData((previous) => ({
      ...previous,
      education: previous.education.map((education, educationIndex) =>
        educationIndex === index ? { ...education, [field]: value } : education,
      ),
    }));
  };

  const addExperience = () => {
    setCvData((previous) => ({
      ...previous,
      experiences: [...previous.experiences, createExperienceItem()],
    }));
  };

  const addEducation = () => {
    setCvData((previous) => ({
      ...previous,
      education: [...previous.education, createEducationItem()],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setCvData((previous) => ({
      ...previous,
      projects: previous.projects.map((project, projectIndex) =>
        projectIndex === index ? { ...project, [field]: value } : project,
      ),
    }));
  };

  const addProject = () => {
    setCvData((previous) => ({
      ...previous,
      projects: [...previous.projects, createProjectItem()],
    }));
  };

  const removeProject = (index) => {
    setCvData((previous) => ({
      ...previous,
      projects: previous.projects.filter((_, projectIndex) => projectIndex !== index),
    }));
  };

  const handleCustomSectionChange = (sectionIndex, field, value) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const handleCustomSectionItemChange = (sectionIndex, itemIndex, field, value) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, itemIndexInSection) =>
                itemIndexInSection === itemIndex ? { ...item, [field]: value } : item,
              ),
            }
          : section,
      ),
    }));
  };

  const addCustomSection = () => {
    setCvData((previous) => ({
      ...previous,
      customSections: [...previous.customSections, createCustomSection()],
    }));
  };

  const removeCustomSection = (sectionIndex) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const addCustomSectionItem = (sectionIndex) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex ? { ...section, items: [...section.items, createCustomSectionItem()] } : section,
      ),
    }));
  };

  const removeCustomSectionItem = (sectionIndex, itemIndex) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: section.items.filter((_, itemIndexInSection) => itemIndexInSection !== itemIndex) }
          : section,
      ),
    }));
  };

  const removeExperience = (index) => {
    setCvData((previous) => ({
      ...previous,
      experiences: previous.experiences.filter((_, experienceIndex) => experienceIndex !== index),
    }));
  };

  const removeEducation = (index) => {
    setCvData((previous) => ({
      ...previous,
      education: previous.education.filter((_, educationIndex) => educationIndex !== index),
    }));
  };

  const handleSkillsChange = (value) => {
    setSkillsInput(value);
    setCvData((previous) => ({
      ...previous,
      skills: parseSkills(value),
    }));
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleDownloadLatex = () => {
    const blob = new Blob([latexPreview], { type: 'text/x-tex;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = createLatexFileName(cvData.personal.fullName);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);
  };

  const renderPersonalForm = () => (
    <div className="editor-form-group-list">
      {PERSONAL_FIELDS.map((field) => (
        <label className="editor-form-group" key={field.key}>
          <span className="editor-form-label">{field.label}</span>
          <input
            type="text"
            className="editor-input"
            value={cvData.personal[field.key] || ''}
            placeholder={field.placeholder}
            onChange={(event) => handlePersonalChange(field.key, event.target.value)}
          />
        </label>
      ))}
    </div>
  );

  const renderSummaryForm = () => (
    <div className="editor-form-group-list">
      <label className="editor-form-group">
        <span className="editor-form-label">Professional Summary</span>
        <textarea
          className="editor-textarea"
          rows={8}
          value={cvData.summary}
          onChange={(event) => handleSummaryChange(event.target.value)}
        />
      </label>
    </div>
  );

  const renderExperienceForm = () => (
    <div className="editor-repeater">
      {cvData.experiences.map((experience, index) => (
        <div key={experience.id} className="editor-repeater-card">
          <div className="editor-repeater-card-header">
            <h4>Experience #{index + 1}</h4>
            {cvData.experiences.length > 1 && (
              <button type="button" className="editor-link-danger" onClick={() => removeExperience(index)}>
                Remove
              </button>
            )}
          </div>
          <label className="editor-form-group">
            <span className="editor-form-label">Role</span>
            <input
              type="text"
              className="editor-input"
              value={experience.role}
              onChange={(event) => handleExperienceChange(index, 'role', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Company</span>
            <input
              type="text"
              className="editor-input"
              value={experience.company}
              onChange={(event) => handleExperienceChange(index, 'company', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Period</span>
            <input
              type="text"
              className="editor-input"
              value={experience.period}
              onChange={(event) => handleExperienceChange(index, 'period', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Description</span>
            <textarea
              className="editor-textarea editor-textarea--compact"
              rows={3}
              value={experience.description}
              onChange={(event) => handleExperienceChange(index, 'description', event.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" className="editor-add-button" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );

  const renderEducationForm = () => (
    <div className="editor-repeater">
      {cvData.education.map((education, index) => (
        <div key={education.id} className="editor-repeater-card">
          <div className="editor-repeater-card-header">
            <h4>Education #{index + 1}</h4>
            {cvData.education.length > 1 && (
              <button type="button" className="editor-link-danger" onClick={() => removeEducation(index)}>
                Remove
              </button>
            )}
          </div>
          <label className="editor-form-group">
            <span className="editor-form-label">Degree</span>
            <input
              type="text"
              className="editor-input"
              value={education.degree}
              onChange={(event) => handleEducationChange(index, 'degree', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Institution</span>
            <input
              type="text"
              className="editor-input"
              value={education.institution}
              onChange={(event) => handleEducationChange(index, 'institution', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Year</span>
            <input
              type="text"
              className="editor-input"
              value={education.year}
              onChange={(event) => handleEducationChange(index, 'year', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Location</span>
            <input
              type="text"
              className="editor-input"
              value={education.location || ''}
              onChange={(event) => handleEducationChange(index, 'location', event.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" className="editor-add-button" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );

  const renderProjectsForm = () => (
    <div className="editor-repeater">
      {cvData.projects.map((project, index) => (
        <div key={project.id} className="editor-repeater-card">
          <div className="editor-repeater-card-header">
            <h4>Project #{index + 1}</h4>
            {cvData.projects.length > 1 && (
              <button type="button" className="editor-link-danger" onClick={() => removeProject(index)}>
                Remove
              </button>
            )}
          </div>
          <label className="editor-form-group">
            <span className="editor-form-label">Project Name</span>
            <input
              type="text"
              className="editor-input"
              value={project.heading}
              onChange={(event) => handleProjectChange(index, 'heading', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Tech Stack / Link Label</span>
            <input
              type="text"
              className="editor-input"
              value={project.subheading}
              onChange={(event) => handleProjectChange(index, 'subheading', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Context (Company, Year, etc.)</span>
            <input
              type="text"
              className="editor-input"
              value={project.period}
              onChange={(event) => handleProjectChange(index, 'period', event.target.value)}
            />
          </label>
          <label className="editor-form-group">
            <span className="editor-form-label">Description</span>
            <textarea
              className="editor-textarea editor-textarea--compact"
              rows={3}
              value={project.description}
              onChange={(event) => handleProjectChange(index, 'description', event.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" className="editor-add-button" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );

  const renderCustomSectionsForm = () => (
    <div className="editor-repeater">
      {cvData.customSections.map((section, sectionIndex) => (
        <div key={section.id} className="editor-repeater-card">
          <div className="editor-repeater-card-header">
            <h4>Section #{sectionIndex + 1}</h4>
            {cvData.customSections.length > 1 && (
              <button type="button" className="editor-link-danger" onClick={() => removeCustomSection(sectionIndex)}>
                Remove Section
              </button>
            )}
          </div>

          <label className="editor-form-group">
            <span className="editor-form-label">Section Title</span>
            <input
              type="text"
              className="editor-input"
              value={section.title}
              onChange={(event) => handleCustomSectionChange(sectionIndex, 'title', event.target.value)}
            />
          </label>

          {section.items.map((item, itemIndex) => (
            <div key={item.id} className="editor-repeater-card editor-repeater-card--nested">
              <div className="editor-repeater-card-header">
                <h4>Entry #{itemIndex + 1}</h4>
                {section.items.length > 1 && (
                  <button
                    type="button"
                    className="editor-link-danger"
                    onClick={() => removeCustomSectionItem(sectionIndex, itemIndex)}
                  >
                    Remove Entry
                  </button>
                )}
              </div>
              <label className="editor-form-group">
                <span className="editor-form-label">Title</span>
                <input
                  type="text"
                  className="editor-input"
                  value={item.heading}
                  onChange={(event) => handleCustomSectionItemChange(sectionIndex, itemIndex, 'heading', event.target.value)}
                />
              </label>
              <label className="editor-form-group">
                <span className="editor-form-label">Subtitle</span>
                <input
                  type="text"
                  className="editor-input"
                  value={item.subheading}
                  onChange={(event) =>
                    handleCustomSectionItemChange(sectionIndex, itemIndex, 'subheading', event.target.value)
                  }
                />
              </label>
              <label className="editor-form-group">
                <span className="editor-form-label">Date / Context</span>
                <input
                  type="text"
                  className="editor-input"
                  value={item.period}
                  onChange={(event) => handleCustomSectionItemChange(sectionIndex, itemIndex, 'period', event.target.value)}
                />
              </label>
              <label className="editor-form-group">
                <span className="editor-form-label">Details (new line or ; for each bullet)</span>
                <textarea
                  className="editor-textarea editor-textarea--compact"
                  rows={3}
                  value={item.description}
                  onChange={(event) =>
                    handleCustomSectionItemChange(sectionIndex, itemIndex, 'description', event.target.value)
                  }
                />
              </label>
            </div>
          ))}

          <button type="button" className="editor-add-button" onClick={() => addCustomSectionItem(sectionIndex)}>
            + Add Entry
          </button>
        </div>
      ))}

      <button type="button" className="editor-add-button" onClick={addCustomSection}>
        + Add New Section
      </button>
    </div>
  );

  const renderSkillsForm = () => (
    <div className="editor-form-group-list">
      <label className="editor-form-group">
        <span className="editor-form-label">Skills (comma separated)</span>
        <input
          type="text"
          className="editor-input"
          value={skillsInput}
          onChange={(event) => handleSkillsChange(event.target.value)}
          placeholder="React, JavaScript, Figma, UI/UX"
        />
      </label>
      <div className="editor-chip-list">
        {cvData.skills.map((skill, index) => (
          <span key={`${skill}-${index}`} className="editor-chip">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === 'summary') {
      return renderSummaryForm();
    }

    if (activeTab === 'experience') {
      return renderExperienceForm();
    }

    if (activeTab === 'education') {
      return renderEducationForm();
    }

    if (activeTab === 'skills') {
      return renderSkillsForm();
    }

    if (activeTab === 'projects') {
      return renderProjectsForm();
    }

    if (activeTab === 'custom') {
      return renderCustomSectionsForm();
    }

    return renderPersonalForm();
  };

  return (
    <div className="template-editor-page">
      <Navbar />

      <main className="template-editor-main">
        <div className="template-editor-shell">
          <div className="template-editor-layout">
            <section className="template-editor-left">
              <h2 className="template-editor-title">Edit Your CV</h2>

              <div className="template-editor-tabs" role="tablist" aria-label="Editor tabs">
                {EDITOR_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`template-editor-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="template-editor-divider" />

              <h3 className="template-editor-section-title">
                {activeTab === 'personal' && 'Personal Information'}
                {activeTab === 'summary' && 'Professional Summary'}
                {activeTab === 'experience' && 'Work Experience'}
                {activeTab === 'education' && 'Education Details'}
                {activeTab === 'skills' && 'Skills'}
                {activeTab === 'projects' && 'Projects'}
                {activeTab === 'custom' && 'Custom Sections'}
              </h3>

              {renderTabContent()}
            </section>

            <section className="template-editor-right">
              <h2 className="template-editor-preview-title">Preview</h2>

              <div className="template-editor-preview-container">
                {isLatexTemplate ? (
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
                      <article className="latex-rendered-paper" aria-label="LaTeX template result preview">
                        <header className="latex-rendered-header">
                          <h3 className="latex-rendered-name">{cvData.personal.fullName || 'Your Name'}</h3>
                          <p className="latex-rendered-contact">
                            {[cvData.personal.location, cvData.personal.phone, cvData.personal.email].filter(Boolean).join(' | ')}
                          </p>
                          <p className="latex-rendered-links">
                            {[cvData.personal.linkedin, cvData.personal.github, cvData.personal.website]
                              .filter(Boolean)
                              .join(' | ')}
                          </p>
                        </header>

                        {cvData.summary && (
                          <section className="latex-rendered-section">
                            <h4 className="latex-rendered-section-title">Summary</h4>
                            <p className="latex-rendered-text">{cvData.summary}</p>
                          </section>
                        )}

                        {cvData.education.length > 0 && (
                          <section className="latex-rendered-section">
                            <h4 className="latex-rendered-section-title">Education</h4>
                            {cvData.education.map((item) => (
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
                            ))}
                          </section>
                        )}

                        {cvData.experiences.length > 0 && (
                          <section className="latex-rendered-section">
                            <h4 className="latex-rendered-section-title">Experience</h4>
                            {cvData.experiences.map((item) => (
                              <article key={item.id} className="latex-rendered-item">
                                <div className="latex-rendered-item-head">
                                  <strong>{item.role}</strong>
                                  <span>{item.period}</span>
                                </div>
                                <div className="latex-rendered-item-sub">
                                  <em>{item.company}</em>
                                  <em>{item.location || ''}</em>
                                </div>
                                {splitDescriptionLines(item.description).length > 0 && (
                                  <ul className="latex-rendered-list">
                                    {splitDescriptionLines(item.description).map((line, index) => (
                                      <li key={`${item.id}-${index}`}>{line}</li>
                                    ))}
                                  </ul>
                                )}
                              </article>
                            ))}
                          </section>
                        )}

                        {cvData.projects.length > 0 && (
                          <section className="latex-rendered-section">
                            <h4 className="latex-rendered-section-title">Projects</h4>
                            {cvData.projects.map((item) => (
                              <article key={item.id} className="latex-rendered-item">
                                <div className="latex-rendered-item-head">
                                  <strong>{item.heading}</strong>
                                  <span>{item.period || ''}</span>
                                </div>
                                <div className="latex-rendered-item-sub">
                                  <em>{item.subheading}</em>
                                  <em>{item.linkLabel ? `${item.linkLabel}${item.url ? `: ${item.url}` : ''}` : item.url || ''}</em>
                                </div>
                                {splitDescriptionLines(item.description).length > 0 && (
                                  <ul className="latex-rendered-list">
                                    {splitDescriptionLines(item.description).map((line, index) => (
                                      <li key={`${item.id}-${index}`}>{line}</li>
                                    ))}
                                  </ul>
                                )}
                              </article>
                            ))}
                          </section>
                        )}

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
                              <article key={item.id} className="latex-rendered-item">
                                <div className="latex-rendered-item-head">
                                  <strong>{item.heading || 'Item Title'}</strong>
                                  <span>{item.period || ''}</span>
                                </div>
                                <div className="latex-rendered-item-sub">
                                  <em>{item.subheading || ''}</em>
                                  <em />
                                </div>
                                {splitDescriptionLines(item.description).length > 0 && (
                                  <ul className="latex-rendered-list">
                                    {splitDescriptionLines(item.description).map((line, index) => (
                                      <li key={`${item.id}-${index}`}>{line}</li>
                                    ))}
                                  </ul>
                                )}
                              </article>
                            ))}
                          </section>
                        ))}
                      </article>
                    )}
                  </>
                ) : (
                  <article className={`cv-preview-paper ${themeClass}`} aria-label={`${selectedTemplate.title} preview`}>
                    <header className="cv-preview-header">
                      <div className="cv-preview-personal">
                        <h3 className="cv-preview-name">{cvData.personal.fullName || 'Your Name'}</h3>
                        <p className="cv-preview-role">{cvData.personal.professionalTitle || 'Professional Title'}</p>
                        <p className="cv-preview-contact">{contactLine || 'your.email@example.com | +20 123 456 789'}</p>
                      </div>
                      <div className="cv-preview-bubble" />
                    </header>

                    <section className="cv-preview-section cv-preview-section--card">
                      <h4 className="cv-preview-heading cv-preview-heading--primary">ABOUT ME</h4>
                      <p className="cv-preview-text">
                        {cvData.summary || 'Add a short summary about your skills and career goals.'}
                      </p>
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

                    <section className="cv-preview-section cv-preview-section--card">
                      <h4 className="cv-preview-heading cv-preview-heading--secondary">EXPERIENCE</h4>
                      {(cvData.experiences.length > 0 ? cvData.experiences : [createExperienceItem()]).map((item) => (
                        <article key={item.id} className="cv-preview-block">
                          <p className="cv-preview-block-title">{item.role || 'Role'}</p>
                          <p className="cv-preview-block-subtitle">
                            {(item.company || 'Company') + (item.period ? ` | ${item.period}` : '')}
                          </p>
                          <p className="cv-preview-text">{item.description || 'Describe your main achievements and impact.'}</p>
                        </article>
                      ))}
                    </section>

                    <section className="cv-preview-section cv-preview-section--card">
                      <h4 className="cv-preview-heading cv-preview-heading--secondary">EDUCATION</h4>
                      {(cvData.education.length > 0 ? cvData.education : [createEducationItem()]).map((item) => (
                        <article key={item.id} className="cv-preview-block">
                          <p className="cv-preview-block-title">{item.degree || 'Degree'}</p>
                          <p className="cv-preview-block-subtitle">
                            {(item.institution || 'Institution') + (item.year ? ` | ${item.year}` : '')}
                          </p>
                        </article>
                      ))}
                    </section>

                    <section className="cv-preview-section cv-preview-section--card">
                      <h4 className="cv-preview-heading cv-preview-heading--secondary">PROJECTS</h4>
                      {(cvData.projects.length > 0 ? cvData.projects : [createProjectItem()]).map((item) => (
                        <article key={item.id} className="cv-preview-block">
                          <p className="cv-preview-block-title">{item.heading || 'Project Name'}</p>
                          <p className="cv-preview-block-subtitle">
                            {(item.subheading || 'Stack') + (item.period ? ` | ${item.period}` : '')}
                          </p>
                          <p className="cv-preview-text">{item.description || 'Describe your project contribution.'}</p>
                        </article>
                      ))}
                    </section>

                    {visibleCustomSections.map((section) => (
                      <section key={section.id} className="cv-preview-section cv-preview-section--card">
                        <h4 className="cv-preview-heading cv-preview-heading--secondary">
                          {(section.title || 'Custom Section').toUpperCase()}
                        </h4>
                        {(section.items.length > 0 ? section.items : [fallbackCustomItem]).map((item) => (
                          <article key={item.id} className="cv-preview-block">
                            <p className="cv-preview-block-title">{item.heading || 'Item Title'}</p>
                            <p className="cv-preview-block-subtitle">
                              {(item.subheading || 'Subtitle') + (item.period ? ` | ${item.period}` : '')}
                            </p>
                            {item.description && <p className="cv-preview-text">{item.description}</p>}
                          </article>
                        ))}
                      </section>
                    ))}
                  </article>
                )}
              </div>

              <div className="template-editor-download-actions">
                <button type="button" className="template-editor-download-button" onClick={handleDownloadLatex}>
                  Download LaTeX (.tex)
                </button>
                <button
                  type="button"
                  className="template-editor-download-button template-editor-download-button--secondary"
                  onClick={handleDownloadPdf}
                >
                  Download PDF
                </button>
              </div>
              <p className="template-editor-download-hint">
                {isLatexTemplate
                  ? 'Result shows formatted output. Switch to code to view exact LaTeX source, then download .tex.'
                  : 'LaTeX download gives you an editable template file. PDF uses your browser print dialog.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateEditor;
