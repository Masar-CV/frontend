import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getTemplateById } from './templateData';
import './TemplateEditor.css';

const EDITOR_TABS = [
  { id: 'personal', label: 'Personal' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
];

const PERSONAL_FIELDS = [
  { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
  { key: 'professionalTitle', label: 'Professional Title', placeholder: 'Professional Title' },
  { key: 'email', label: 'Email', placeholder: 'john.doe@email.com' },
  { key: 'phone', label: 'Phone', placeholder: '+1 234 567 890' },
  { key: 'location', label: 'Location', placeholder: 'City, Country' },
  { key: 'website', label: 'Website', placeholder: 'www.johndoe.com' },
];

const createExperienceItem = () => ({
  id: `exp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role: 'Senior Position',
  company: 'Company Name',
  period: '2020 - Present',
  description: 'Led key initiatives and delivered exceptional results.',
});

const createEducationItem = () => ({
  id: `edu-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  degree: 'Bachelor of Science',
  institution: 'University Name',
  year: '2019',
});

const initialCvData = {
  personal: {
    fullName: 'John Doe',
    professionalTitle: 'Professional Title',
    email: 'john.doe@email.com',
    phone: '+1 234 567 890',
    location: 'City, Country',
    website: 'www.johndoe.com',
  },
  summary: 'Experienced professional with a strong background in delivering high-quality results.',
  skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
  experiences: [createExperienceItem()],
  education: [createEducationItem()],
};

const parseSkills = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const TemplateEditor = () => {
  const { templateId = 'creative' } = useParams();
  const selectedTemplate = getTemplateById(templateId);
  const [activeTab, setActiveTab] = useState('personal');
  const [cvData, setCvData] = useState(initialCvData);
  const [skillsInput, setSkillsInput] = useState(initialCvData.skills.join(', '));

  const themeClass = `cv-preview-theme-${selectedTemplate.variant}`;

  const contactLine = useMemo(() => {
    const items = [cvData.personal.email, cvData.personal.phone].filter(Boolean);
    return items.join(' | ');
  }, [cvData.personal.email, cvData.personal.phone]);

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

  const handleDownload = () => {
    window.print();
  };

  const renderPersonalForm = () => (
    <div className="editor-form-group-list">
      {PERSONAL_FIELDS.map((field) => (
        <label className="editor-form-group" key={field.key}>
          <span className="editor-form-label">{field.label}</span>
          <input
            type="text"
            className="editor-input"
            value={cvData.personal[field.key]}
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
        </div>
      ))}
      <button type="button" className="editor-add-button" onClick={addEducation}>
        + Add Education
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
              </h3>

              {renderTabContent()}
            </section>

            <section className="template-editor-right">
              <h2 className="template-editor-preview-title">Preview</h2>

              <div className="template-editor-preview-container">
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
                </article>
              </div>

              <button type="button" className="template-editor-download-button" onClick={handleDownload}>
                Download
              </button>
              <p className="template-editor-download-hint">
                The browser print dialog will open so you can save this CV as a PDF.
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
