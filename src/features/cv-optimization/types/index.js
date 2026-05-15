/**
 * CV Optimization Types
 * Strongly typed definitions for the CV optimization API response
 */

/**
 * @typedef {Object} CVMetadata
 * @property {string} original_filename
 * @property {string} file_type
 * @property {string} candidate_name
 * @property {number} page_count
 */

/**
 * @typedef {Object} ContactInfo
 * @property {string} email
 * @property {string} phone
 * @property {string[]} links
 */

/**
 * @typedef {Object} ParsedHeader
 * @property {string} title
 * @property {string} company
 * @property {string} dates
 * @property {string} raw
 */

/**
 * @typedef {Object} Achievement
 * @property {string} text
 * @property {number} score
 * @property {string[]} feedback
 * @property {string|null} fixed
 * @property {number|null} fixed_score
 * @property {string[]|null} changes
 * @property {boolean|null} was_fixed
 */

/**
 * @typedef {Object} ExperienceEntry
 * @property {string[]} headers
 * @property {Achievement[]} achievements
 * @property {ParsedHeader} parsed_header
 */

/**
 * @typedef {Object} ExperienceFixStats
 * @property {number} total_bullets
 * @property {number} fixed_bullets
 * @property {string[]} fixes_applied
 */

/**
 * @typedef {Object} SkillsDetected
 * @property {(string|SkillWithProficiency)[]} [Programming Languages]
 * @property {(string|SkillWithProficiency)[]} [Frontend]
 * @property {(string|SkillWithProficiency)[]} [Backend]
 * @property {(string|SkillWithProficiency)[]} [Databases]
 * @property {(string|SkillWithProficiency)[]} [AI/ML]
 * @property {(string|SkillWithProficiency)[]} [Tools]
 * @property {(string|SkillWithProficiency)[]} [Architecture]
 * @property {(string|SkillWithProficiency)[]} [DevOps]
 * @property {(string|SkillWithProficiency)[]} [Cloud]
 */

/**
 * @typedef {1|2|3|4} ProficiencyLevel
 */

/**
 * @typedef {Object} SkillWithProficiency
 * @property {string} [skillName]
 * @property {string} [name]
 * @property {ProficiencyLevel} [proficiencyLevel]
 * @property {string} [proficiencyLevelName]
 */

/**
 * @typedef {Object} SummaryEvaluation
 * @property {number} word_count
 * @property {number} readability_score
 * @property {number} quality_score
 * @property {string} grade
 * @property {string[]} issues
 */

/**
 * @typedef {Object} ExperienceEvaluation
 * @property {number} total_bullets
 * @property {number} average_score
 * @property {number} strong_percentage
 * @property {number} overall_score
 * @property {string} grade
 */

/**
 * @typedef {Object} QualityBreakdownItem
 * @property {string} name
 * @property {number} score
 * @property {number} max
 */

/**
 * @typedef {Object} QualityReport
 * @property {number} quality_score
 * @property {string} grade
 * @property {QualityBreakdownItem[]} breakdown
 * @property {string[]} recommendations
 */

/**
 * @typedef {Object} Evaluation
 * @property {SummaryEvaluation} summary
 * @property {ExperienceEvaluation} experience_original
 * @property {ExperienceEvaluation} experience_fixed
 * @property {QualityReport} quality_report
 */

/**
 * @typedef {Object} Validation
 * @property {boolean} is_valid
 * @property {string[]} issues
 * @property {string[]} warnings
 * @property {number} score
 */

/**
 * @typedef {Object} CVOptimizationResponse
 * @property {number} optimizationId
 * @property {number} qualityScore
 * @property {string} grade
 * @property {string} fileName
 * @property {string} [downloadUrl]
 * @property {CVMetadata} metadata
 * @property {ContactInfo} contactInfo
 * @property {string} summary
 * @property {ExperienceEntry[]} experienceAnalyzed
 * @property {ExperienceFixStats} experienceFixStats
 * @property {string[]} education
 * @property {SkillsDetected} skillsDetected
 * @property {string[]} projects
 * @property {string[]} certifications
 * @property {string[]} languages
 * @property {Evaluation} evaluation
 * @property {Validation} validation
 */

/**
 * @typedef {'idle' | 'uploading' | 'processing' | 'success' | 'error'} OptimizationStatus
 */

/**
 * @typedef {Object} OptimizationState
 * @property {OptimizationStatus} status
 * @property {CVOptimizationResponse|null} data
 * @property {string|null} error
 * @property {number} progress
 */

/**
 * @typedef {Object} ProblemDetails
 * @property {string} type
 * @property {string} title
 * @property {number} status
 * @property {string} detail
 * @property {string} instance
 */

export const PROFICIENCY_LEVELS = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4
};

export const PROFICIENCY_LABELS = {
  [PROFICIENCY_LEVELS.BEGINNER]: 'Beginner',
  [PROFICIENCY_LEVELS.INTERMEDIATE]: 'Intermediate',
  [PROFICIENCY_LEVELS.ADVANCED]: 'Advanced',
  [PROFICIENCY_LEVELS.EXPERT]: 'Expert'
};

export const OPTIMIZATION_STATUS = {
  IDLE: 'idle',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const GRADE_COLORS = {
  'A+': '#059669',
  'A': '#10b981',
  'A-': '#34d399',
  'B+': '#3b82f6',
  'B': '#60a5fa',
  'B-': '#93c5fd',
  'C+': '#f59e0b',
  'C': '#fbbf24',
  'C-': '#fcd34d',
  'D': '#ef4444',
  'F': '#dc2626'
};

export const getGradeColor = (grade) => {
  return GRADE_COLORS[grade] || '#6b7280';
};

export const getScoreColor = (score, max = 100) => {
  const percentage = (score / max) * 100;
  if (percentage >= 80) return '#10b981';
  if (percentage >= 60) return '#3b82f6';
  if (percentage >= 40) return '#f59e0b';
  return '#ef4444';
};
