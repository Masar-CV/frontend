import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import cvMatchService from '../../services/cvMatchService';
import './CVAnalysis.css';

const formatPercent = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(100, Number(parsed.toFixed(2))));
};

const formatSkill = (skill) => {
  if (!skill) return '';
  return skill
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const formatListSummary = (items, count = 4) => {
  if (!items.length) return 'None identified';
  const selected = items.slice(0, count).map(formatSkill);
  const suffix = items.length > count ? ` +${items.length - count} more` : '';
  return `${selected.join(', ')}${suffix}`;
};

const severityFromScore = (score) => {
  if (score < 45) return 'high';
  if (score < 75) return 'medium';
  return 'low';
};

const cvFileLabel = (file) => {
  if (!file) return '';
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  return `${file.name} (${sizeMb} MB)`;
};

const CVAnalysis = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matchResult, setMatchResult] = useState(null);

  const computed = useMemo(() => {
    if (!matchResult) return null;

    const hardSkillsScore = formatPercent(matchResult.scores?.hard_skill_match);
    const softSkillsScore = formatPercent(matchResult.scores?.soft_skill_match);
    const finalScore = formatPercent(matchResult.final_score);

    const cvHardSkills = Array.isArray(matchResult.cv_hard_skills) ? matchResult.cv_hard_skills : [];
    const jdHardSkills = Array.isArray(matchResult.jd_hard_skills) ? matchResult.jd_hard_skills : [];
    const cvSoftSkills = Array.isArray(matchResult.cv_soft_skills) ? matchResult.cv_soft_skills : [];
    const jdSoftSkills = Array.isArray(matchResult.jd_soft_skills) ? matchResult.jd_soft_skills : [];
    const missingHardSkills = Array.isArray(matchResult.missing_hard_skills) ? matchResult.missing_hard_skills : [];
    const missingSoftSkills = Array.isArray(matchResult.missing_soft_skills) ? matchResult.missing_soft_skills : [];

    const yearsGap = Math.max(
      0,
      Number(matchResult.jd_years || 0) - Number(matchResult.cv_years || 0)
    );

    const areasToImprove = [
      {
        title: 'Missing Hard Skills',
        description: missingHardSkills.length
          ? `Missing ${missingHardSkills.length} hard skill(s): ${formatListSummary(missingHardSkills)}`
          : 'No missing hard skills detected.',
        severity: missingHardSkills.length ? severityFromScore(hardSkillsScore) : 'low',
      },
      {
        title: 'Soft Skills Alignment',
        description: missingSoftSkills.length
          ? `Missing ${missingSoftSkills.length} soft skill(s): ${formatListSummary(missingSoftSkills)}`
          : 'Soft skills are aligned with the job description.',
        severity: missingSoftSkills.length ? severityFromScore(softSkillsScore) : 'low',
      },
      {
        title: 'Experience Gap',
        description: yearsGap
          ? `Your CV shows ${matchResult.cv_years} year(s), while the job asks for ${matchResult.jd_years} year(s).`
          : `Experience level is aligned (${matchResult.cv_years} years).`,
        severity: yearsGap >= 2 ? 'high' : yearsGap === 1 ? 'medium' : 'low',
      },
    ];

    const suggestedEdits = [
      missingHardSkills.length
        ? `Add missing technical skills: ${formatListSummary(missingHardSkills, 3)}`
        : 'Your core technical skills match the job requirements well.',
      missingSoftSkills.length
        ? `Highlight soft skills such as ${formatListSummary(missingSoftSkills, 2)} in your experience bullets.`
        : 'Soft skills alignment looks strong based on this job description.',
      yearsGap > 0
        ? `Strengthen achievements to compensate for the ${yearsGap}-year experience gap.`
        : 'Emphasize your strongest role impact to reinforce experience alignment.',
      'Prioritize adding exact terminology from the job description in your project and experience bullets.',
      `Hard skills weight is ${(Number(matchResult.weights?.hard_skills || 0) * 100).toFixed(0)}%, so prioritize skill section improvements.`,
    ];

    const gradeMessage =
      finalScore >= 80
        ? 'Your CV is a strong match for this position.'
        : finalScore >= 60
          ? 'Your CV is a moderate match. A few updates can improve it significantly.'
          : 'Your CV needs targeted improvements to match this role better.';

    return {
      finalScore,
      grade: matchResult.grade || 'Unrated',
      color: matchResult.color || '#2563eb',
      gradeMessage,
      hardSkillsScore,
      softSkillsScore,
      areasToImprove: areasToImprove.slice(0, 3),
      suggestedEdits,
      metadata: matchResult.cv_metadata || {},
      cvYears: matchResult.cv_years || '0',
      jdYears: matchResult.jd_years || '0',
      missingHardSkills: missingHardSkills.map(formatSkill),
      missingSoftSkills: missingSoftSkills.map(formatSkill),
      cvHardSkills: cvHardSkills.map(formatSkill),
      jdHardSkills: jdHardSkills.map(formatSkill),
      cvSoftSkills: cvSoftSkills.map(formatSkill),
      jdSoftSkills: jdSoftSkills.map(formatSkill),
      hardCoverage: jdHardSkills.length
        ? formatPercent(((jdHardSkills.length - missingHardSkills.length) / jdHardSkills.length) * 100)
        : 100,
      softCoverage: jdSoftSkills.length
        ? formatPercent(((jdSoftSkills.length - missingSoftSkills.length) / jdSoftSkills.length) * 100)
        : 100,
      totalCvSkills: cvHardSkills.length + cvSoftSkills.length,
      totalJdSkills: jdHardSkills.length + jdSoftSkills.length,
      totalMissingSkills: missingHardSkills.length + missingSoftSkills.length,
      weights: matchResult.weights || {},
    };
  }, [matchResult]);

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFilePicked = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setErrorMessage('');
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    setErrorMessage('');
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await cvMatchService.matchCV({
        file: selectedFile,
        jobDescription,
      });

      setMatchResult(response);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrorMessage(error.message || 'Unable to analyze CV right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setMatchResult(null);
    setSelectedFile(null);
    setCvText('');
    setJobDescription('');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportReport = () => {
    if (!matchResult) return;
    const blob = new Blob([JSON.stringify(matchResult, null, 2)], {
      type: 'application/json',
    });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `cv-match-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="cv-analysis-screen">
      <Navbar />

      {!computed ? (
        <main className="cv-analysis-main">
          <section className="cv-analysis-hero">
            <div className="cv-analysis-hero-copy">
              <h1>CV Analysis &amp; job Matching</h1>
              <p>Get AI-powered insights on your CV and see how well it matches job requirements</p>
            </div>

            <div className="cv-analysis-hero-graphic" aria-hidden="true">
              <svg viewBox="0 0 260 190">
                <rect x="38" y="24" width="184" height="130" rx="12" fill="#FFFFFF" stroke="#191A15" strokeWidth="2" />
                <rect x="38" y="24" width="184" height="44" rx="12" fill="#2563EB" />
                <line x1="38" y1="68" x2="222" y2="68" stroke="#191A15" strokeWidth="2" />
                <path d="M68 106L106 68L132 90L160 66L186 90" fill="none" stroke="#191A15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="68" y1="154" x2="196" y2="154" stroke="#191A15" strokeWidth="2" />
                <line x1="64" y1="46" x2="76" y2="46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="90" y1="46" x2="130" y2="46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </section>

          <section className="cv-analysis-panels">
            <article className="cv-panel">
              <header className="cv-panel-header">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
                  <path d="M14 3.5V8h4.5" />
                  <path d="M8.5 11h7M8.5 14.5h7M8.5 18h5" />
                </svg>
                <h2>Your CV</h2>
              </header>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFilePicked}
                hidden
              />

              <div
                className={`cv-upload-box ${isDragging ? 'dragging' : ''} ${selectedFile ? 'filled' : ''}`}
                role="button"
                tabIndex={0}
                onClick={openFileDialog}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') openFileDialog();
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {!selectedFile ? (
                  <>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 16.5V6.8" />
                      <path d="M8.5 10.5 12 7l3.5 3.5" />
                      <path d="M5 16.5v2a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-2" />
                    </svg>
                    <p>Click to upload or drag and drop</p>
                    <span>PDF, DOC, or DOCX (Max 5MB)</span>
                  </>
                ) : (
                  <>
                    <p className="selected-file-name">{cvFileLabel(selectedFile)}</p>
                    <div className="cv-upload-actions">
                      <button type="button" onClick={openFileDialog}>
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedFile(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="cv-divider">
                <span>OR</span>
              </div>

              <label htmlFor="cv-text">Paste CV Text</label>
              <textarea
                id="cv-text"
                placeholder="Paste your CV content here..."
                value={cvText}
                onChange={(event) => setCvText(event.target.value)}
              />
            </article>

            <article className="cv-panel">
              <header className="cv-panel-header">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.5 8h15v11.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 19.5V8Z" />
                  <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8" />
                  <path d="M4.5 11.5h15" />
                </svg>
                <h2>Job Description</h2>
              </header>

              <label htmlFor="job-desc">Target Job Description</label>
              <textarea
                id="job-desc"
                className="job-description-area"
                placeholder="Paste the job description you're applying for..."
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
              />
            </article>
          </section>

          {errorMessage && <p className="cv-analysis-error">{errorMessage}</p>}

          <button
            className="cv-analysis-btn"
            type="button"
            onClick={handleAnalyze}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Analyzing...' : 'Analysis My CV'}
          </button>
        </main>
      ) : (
        <main className="cv-analysis-results-main">
          <section className="cv-results-headline">
            <div>
              <h1>Analysis Results</h1>
              <p>Here&apos;s your comprehensive CV analysis</p>
            </div>
            <button type="button" className="cv-results-export" onClick={handleExportReport}>
              Export Report
            </button>
          </section>

          <section className="cv-results-score-card">
            <div className="cv-score-value" style={{ color: computed.color }}>
              {computed.finalScore}
              <span>%</span>
            </div>
            <p className="score-title">Overall Match Score</p>
            <div className="score-track">
              <div className="score-fill" style={{ width: `${computed.finalScore}%`, backgroundColor: computed.color }} />
            </div>
            <p className="score-message">{computed.gradeMessage}</p>

            <div className="score-meta-grid">
              <div>
                <span>Grade</span>
                <strong style={{ color: computed.color }}>{computed.grade}</strong>
              </div>
              <div>
                <span>Experience</span>
                <div className="experience-meta">
                  <div className="experience-pill">
                    <small>CV</small>
                    <strong>{`${computed.cvYears} year(s)`}</strong>
                  </div>
                  <span>vs</span>
                  <div className="experience-pill jd">
                    <small>JD</small>
                    <strong>{`${computed.jdYears} year(s)`}</strong>
                  </div>
                </div>
              </div>
              <div>
                <span>Document</span>
                <strong>{selectedFile?.name || 'Uploaded CV file'}</strong>
              </div>
            </div>

            <div className="score-breakdown-grid">
              <div>
                <span>Hard Skill Match</span>
                <strong>{computed.hardSkillsScore}%</strong>
              </div>
              <div>
                <span>Soft Skill Match</span>
                <strong>{computed.softSkillsScore}%</strong>
              </div>
            </div>
          </section>

          <section className="cv-results-two-col">
            <article className="cv-results-card">
              <header className="results-card-header">
                <h2>Areas to Improve</h2>
                <p>Issues identified in your CV</p>
              </header>

              <div className="improvement-list">
                {computed.areasToImprove.map((item) => (
                  <div key={item.title} className={`improvement-item ${item.severity}`}>
                    <div className="improvement-row">
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="cv-results-card">
              <header className="results-card-header">
                <h2>Suggested Edits</h2>
                <p>Quick wins to improve your CV</p>
              </header>

              <ul className="suggestion-list">
                {computed.suggestedEdits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="cv-results-skills-card">
            <header className="results-card-header horizontal">
              <div>
                <h2>Skill Gap Analysis</h2>
                <p>Skills identified from the job description</p>
              </div>
              <button type="button" onClick={() => navigate('/dashboard/resources')}>
                See Learning Recommendations
              </button>
            </header>

            <div className="skill-coverage-grid">
              <div className="coverage-card">
                <span>CV Skills</span>
                <strong>{computed.totalCvSkills}</strong>
              </div>
              <div className="coverage-card">
                <span>Job Skills</span>
                <strong>{computed.totalJdSkills}</strong>
              </div>
              <div className="coverage-card missing">
                <span>Missing Skills</span>
                <strong>{computed.totalMissingSkills}</strong>
              </div>
            </div>

            <div className="coverage-bars">
              <div className="coverage-row">
                <div className="coverage-row-top">
                  <span>Hard Skills Coverage</span>
                  <span>{computed.hardCoverage}%</span>
                </div>
                <div className="coverage-track">
                  <div className="coverage-fill" style={{ width: `${computed.hardCoverage}%` }} />
                </div>
              </div>
              <div className="coverage-row">
                <div className="coverage-row-top">
                  <span>Soft Skills Coverage</span>
                  <span>{computed.softCoverage}%</span>
                </div>
                <div className="coverage-track">
                  <div className="coverage-fill soft" style={{ width: `${computed.softCoverage}%` }} />
                </div>
              </div>
            </div>

            <div className="skill-groups-grid">
              <article className="skill-group-card">
                <h3>Skills in CV</h3>

                <div className="skill-type-block">
                  <h4>{`Hard Skills (${computed.cvHardSkills.length})`}</h4>
                  <div className="skill-chip-list">
                    {computed.cvHardSkills.length ? (
                      computed.cvHardSkills.map((skill) => (
                        <span key={`cv-hard-${skill}`} className="skill-chip">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="empty-skill-text">No hard skills found in CV.</p>
                    )}
                  </div>
                </div>

                <div className="skill-type-block">
                  <h4>{`Soft Skills (${computed.cvSoftSkills.length})`}</h4>
                  <div className="skill-chip-list">
                    {computed.cvSoftSkills.length ? (
                      computed.cvSoftSkills.map((skill) => (
                        <span key={`cv-soft-${skill}`} className="skill-chip soft">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="empty-skill-text">No soft skills found in CV.</p>
                    )}
                  </div>
                </div>
              </article>

              <article className="skill-group-card">
                <h3>Skills in Job Description</h3>

                <div className="skill-type-block">
                  <h4>{`Hard Skills (${computed.jdHardSkills.length})`}</h4>
                  <div className="skill-chip-list">
                    {computed.jdHardSkills.length ? (
                      computed.jdHardSkills.map((skill) => (
                        <span key={`jd-hard-${skill}`} className="skill-chip">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="empty-skill-text">No hard skills found in job description.</p>
                    )}
                  </div>
                </div>

                <div className="skill-type-block">
                  <h4>{`Soft Skills (${computed.jdSoftSkills.length})`}</h4>
                  <div className="skill-chip-list">
                    {computed.jdSoftSkills.length ? (
                      computed.jdSoftSkills.map((skill) => (
                        <span key={`jd-soft-${skill}`} className="skill-chip soft">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="empty-skill-text">No soft skills found in job description.</p>
                    )}
                  </div>
                </div>
              </article>

              <article className="skill-group-card missing">
                <h3>Missing from CV</h3>

                <div className="skill-type-block">
                  <h4>{`Missing Hard Skills (${computed.missingHardSkills.length})`}</h4>
                  <div className="skill-chip-list">
                    {computed.missingHardSkills.length ? (
                      computed.missingHardSkills.map((skill) => (
                        <span key={`missing-hard-${skill}`} className="skill-chip missing">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="empty-skill-text">No missing hard skills.</p>
                    )}
                  </div>
                </div>

                <div className="skill-type-block">
                  <h4>{`Missing Soft Skills (${computed.missingSoftSkills.length})`}</h4>
                  <div className="skill-chip-list">
                    {computed.missingSoftSkills.length ? (
                      computed.missingSoftSkills.map((skill) => (
                        <span key={`missing-soft-${skill}`} className="skill-chip missing soft">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="empty-skill-text">No missing soft skills.</p>
                    )}
                  </div>
                </div>
              </article>
            </div>

          </section>

          <section className="cv-results-actions">
            <button type="button" className="primary" onClick={handleAnalyzeAnother}>
              Analyze Another CV
            </button>
            <button type="button" className="secondary" onClick={() => navigate('/dashboard/resources')}>
              Get Learning Recommendations
            </button>
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default CVAnalysis;

