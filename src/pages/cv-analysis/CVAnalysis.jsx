import { useMemo, useRef, useState } from 'react';
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
  const fileInputRef = useRef(null);
  const coursesRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [showCourses, setShowCourses] = useState(false);

  const computed = useMemo(() => {
    if (!matchResult) return null;

    // New API response structure
    const finalScore = formatPercent(matchResult.final_score);
    const hardSkillExact = formatPercent(matchResult.scores?.hard_skill_exact);
    const hardSkillWithBoost = formatPercent(matchResult.scores?.hard_skill_with_boost);
    const experienceMatch = formatPercent(matchResult.scores?.experience_match);
    const semanticSimilarity = formatPercent(matchResult.scores?.semantic_similarity);
    const familyBoostPct = formatPercent(matchResult.scores?.family_boost_pct);

    const cvSkills = Array.isArray(matchResult.cv_skills) ? matchResult.cv_skills : [];
    const jdSkills = Array.isArray(matchResult.jd_skills) ? matchResult.jd_skills : [];
    const matchingSkills = Array.isArray(matchResult.matching_skills) ? matchResult.matching_skills : [];
    const missingSkills = Array.isArray(matchResult.missing_skills) ? matchResult.missing_skills : [];
    
    // Transferable skills object
    const transferableSkills = matchResult.transferable_skills || {};
    const transferableSkillsList = Object.entries(transferableSkills).map(([skill, data]) => ({
      skill,
      sibling: data.sibling,
      family: data.family,
      creditPct: data.credit_pct
    }));

    // Course recommendations
    const courseRecommendations = Array.isArray(matchResult.course_recommendations) 
      ? matchResult.course_recommendations 
      : [];

    const yearsGap = Math.max(
      0,
      Number(matchResult.jd_years || 0) - Number(matchResult.cv_years || 0)
    );

    const areasToImprove = [
      {
        title: 'Missing Skills',
        description: missingSkills.length
          ? `Missing ${missingSkills.length} skill(s): ${formatListSummary(missingSkills)}`
          : 'No missing skills detected.',
        severity: missingSkills.length ? severityFromScore(hardSkillExact) : 'low',
      },
      {
        title: 'Experience Gap',
        description: yearsGap
          ? `Your CV shows ${matchResult.cv_years} year(s), while the job asks for ${matchResult.jd_years} year(s).`
          : `Experience level is aligned (${matchResult.cv_years || 0} years).`,
        severity: yearsGap >= 2 ? 'high' : yearsGap === 1 ? 'medium' : 'low',
      },
      {
        title: 'Skill Match Quality',
        description: hardSkillWithBoost > hardSkillExact
          ? `Your transferable skills add ${familyBoostPct.toFixed(1)}% boost to your match score.`
          : 'Focus on acquiring exact skills mentioned in the job description.',
        severity: hardSkillExact < 50 ? 'high' : hardSkillExact < 75 ? 'medium' : 'low',
      },
    ];

    const suggestedEdits = [
      missingSkills.length
        ? `Add missing skills: ${formatListSummary(missingSkills, 3)}`
        : 'Your skills match the job requirements well.',
      yearsGap > 0
        ? `Strengthen achievements to compensate for the ${yearsGap}-year experience gap.`
        : 'Emphasize your strongest role impact to reinforce experience alignment.',
      'Prioritize adding exact terminology from the job description in your project and experience bullets.',
      `Hard skills weight is ${(Number(matchResult.weights?.hard_skills || 0) * 100).toFixed(0)}%, so prioritize skill section improvements.`,
      transferableSkillsList.length
        ? `Leverage your transferable skills: ${transferableSkillsList.slice(0, 3).map(t => t.skill).join(', ')}`
        : 'Consider gaining skills from related technology families.',
    ];

    const gradeMessage =
      finalScore >= 80
        ? 'Your CV is a strong match for this position.'
        : finalScore >= 60
          ? 'Your CV is a moderate match. A few updates can improve it significantly.'
          : 'Your CV needs targeted improvements to match this role better.';

    const skillCoverage = jdSkills.length
      ? formatPercent((matchingSkills.length / jdSkills.length) * 100)
      : 100;

    return {
      finalScore,
      grade: matchResult.grade || 'Unrated',
      color: matchResult.color || '#2563eb',
      gradeMessage,
      hardSkillExact,
      hardSkillWithBoost,
      experienceMatch,
      semanticSimilarity,
      familyBoostPct,
      areasToImprove: areasToImprove.slice(0, 3),
      suggestedEdits,
      metadata: matchResult.cv_metadata || {},
      cvYears: matchResult.cv_years || 0,
      jdYears: matchResult.jd_years || 0,
      cvSkills: cvSkills.map(formatSkill),
      jdSkills: jdSkills.map(formatSkill),
      matchingSkills: matchingSkills.map(formatSkill),
      missingSkills: missingSkills.map(formatSkill),
      transferableSkills: transferableSkillsList,
      skillCoverage,
      totalCvSkills: cvSkills.length,
      totalJdSkills: jdSkills.length,
      totalMatchingSkills: matchingSkills.length,
      totalMissingSkills: missingSkills.length,
      weights: matchResult.weights || {},
      courseRecommendations,
      jdWarning: matchResult.jd_warning || null,
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
      setShowCourses(false);
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
    setShowCourses(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowCourses = () => {
    setShowCourses(true);
    setTimeout(() => {
      coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
              <h1>CV Analysis &amp; Job Matching</h1>
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
            {isSubmitting ? 'Analyzing...' : 'Analyze My CV'}
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

          {/* JD Warning Banner */}
          {computed.jdWarning && (
            <div className="jd-warning-banner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>{computed.jdWarning}</span>
            </div>
          )}

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
                <span>Candidate</span>
                <strong>{computed.metadata?.candidate_name || 'Unknown'}</strong>
              </div>
            </div>

            <div className="score-breakdown-grid">
              <div>
                <span>Hard Skill (Exact)</span>
                <strong>{computed.hardSkillExact}%</strong>
              </div>
              <div>
                <span>Hard Skill (With Boost)</span>
                <strong>{computed.hardSkillWithBoost}%</strong>
              </div>
              <div>
                <span>Experience Match</span>
                <strong>{computed.experienceMatch}%</strong>
              </div>
              <div>
                <span>Semantic Similarity</span>
                <strong>{computed.semanticSimilarity}%</strong>
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
                {computed.suggestedEdits.map((item, index) => (
                  <li key={index}>{item}</li>
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
              <button type="button" onClick={handleShowCourses}>
                See Course Recommendations
              </button>
            </header>

            <div className="skill-coverage-grid">
              <div className="coverage-card">
                <span>CV Skills</span>
                <strong>{computed.totalCvSkills}</strong>
              </div>
              <div className="coverage-card">
                <span>JD Skills</span>
                <strong>{computed.totalJdSkills}</strong>
              </div>
              <div className="coverage-card matching">
                <span>Matching</span>
                <strong>{computed.totalMatchingSkills}</strong>
              </div>
              <div className="coverage-card missing">
                <span>Missing</span>
                <strong>{computed.totalMissingSkills}</strong>
              </div>
            </div>

            <div className="coverage-bars">
              <div className="coverage-row">
                <div className="coverage-row-top">
                  <span>Skill Coverage</span>
                  <span>{computed.skillCoverage}%</span>
                </div>
                <div className="coverage-track">
                  <div className="coverage-fill" style={{ width: `${computed.skillCoverage}%` }} />
                </div>
              </div>
            </div>

            <div className="skill-groups-grid">
              <article className="skill-group-card">
                <h3>Skills in CV ({computed.cvSkills.length})</h3>
                <div className="skill-chip-list">
                  {computed.cvSkills.length ? (
                    computed.cvSkills.map((skill) => (
                      <span key={`cv-${skill}`} className="skill-chip">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-skill-text">No skills found in CV.</p>
                  )}
                </div>
              </article>

              <article className="skill-group-card">
                <h3>Skills in Job Description ({computed.jdSkills.length})</h3>
                <div className="skill-chip-list">
                  {computed.jdSkills.length ? (
                    computed.jdSkills.map((skill) => (
                      <span key={`jd-${skill}`} className="skill-chip jd">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-skill-text">No skills found in job description.</p>
                  )}
                </div>
              </article>

              <article className="skill-group-card matching">
                <h3>Matching Skills ({computed.matchingSkills.length})</h3>
                <div className="skill-chip-list">
                  {computed.matchingSkills.length ? (
                    computed.matchingSkills.map((skill) => (
                      <span key={`match-${skill}`} className="skill-chip matching">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-skill-text">No matching skills.</p>
                  )}
                </div>
              </article>

              <article className="skill-group-card missing">
                <h3>Missing Skills ({computed.missingSkills.length})</h3>
                <div className="skill-chip-list">
                  {computed.missingSkills.length ? (
                    computed.missingSkills.map((skill) => (
                      <span key={`missing-${skill}`} className="skill-chip missing">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-skill-text">No missing skills.</p>
                  )}
                </div>
              </article>
            </div>

            {/* Transferable Skills Section */}
            {computed.transferableSkills.length > 0 && (
              <div className="transferable-skills-section">
                <h3>Transferable Skills</h3>
                <p className="transferable-subtitle">Skills from related technology families that boost your match</p>
                <div className="transferable-list">
                  {computed.transferableSkills.map((item) => (
                    <div key={item.skill} className="transferable-item">
                      <div className="transferable-main">
                        <span className="transferable-skill">{formatSkill(item.skill)}</span>
                        <span className="transferable-credit">+{item.creditPct}%</span>
                      </div>
                      <div className="transferable-meta">
                        <span>Similar to: <strong>{item.sibling}</strong></span>
                        <span>Family: <strong>{item.family}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Course Recommendations Section */}
          {showCourses && (
            <section className="cv-results-courses-card" ref={coursesRef}>
              <header className="results-card-header">
                <h2>Course Recommendations</h2>
                <p>Courses to help you acquire missing skills</p>
              </header>

              {computed.courseRecommendations.length > 0 ? (
                <div className="courses-grid">
                  {computed.courseRecommendations.map((course, index) => (
                    <div key={index} className="course-card">
                      <div className="course-skill-badge">{formatSkill(course.skill)}</div>
                      <h3 className="course-name">{course.name}</h3>
                      <p className="course-university">{course.university}</p>
                      <div className="course-footer">
                        <div className="course-rating">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span>{course.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="course-link"
                        >
                          View Course
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-courses">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <p>No course recommendations available for your skill gaps.</p>
                </div>
              )}
            </section>
          )}

          <section className="cv-results-actions">
            <button type="button" className="primary" onClick={handleAnalyzeAnother}>
              Analyze Another CV
            </button>
            {!showCourses && computed.courseRecommendations.length > 0 && (
              <button type="button" className="secondary" onClick={handleShowCourses}>
                View Course Recommendations
              </button>
            )}
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default CVAnalysis;
