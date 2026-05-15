import {
  formatListSummary,
  formatPercent,
  formatSkill,
} from './cvAnalysisFormatters';

const severityFromScore = (score) => {
  if (score < 45) return 'high';
  if (score < 75) return 'medium';
  return 'low';
};

export const buildCVAnalysisResult = (matchResult) => {
  if (!matchResult) return null;

  const result = matchResult.result || matchResult;

  const finalScore = formatPercent(result.final_score ?? matchResult.finalScore);
  const hardSkillExact = formatPercent(
    result.scores?.hard_skill_exact ?? matchResult.hardSkillExact
  );
  const hardSkillWithBoost = formatPercent(
    result.scores?.hard_skill_with_boost ?? matchResult.hardSkillWithBoost
  );
  const experienceMatch = formatPercent(
    result.scores?.experience_match ?? matchResult.experienceMatch
  );
  const semanticSimilarity = formatPercent(
    result.scores?.semantic_similarity ?? matchResult.semanticSimilarity
  );
  const familyBoostPct = formatPercent(
    result.scores?.family_boost_pct ?? matchResult.familyBoostPct
  );

  const cvSkills = Array.isArray(result.cv_skills)
    ? result.cv_skills
    : [];
  const jdSkills = Array.isArray(result.jd_skills)
    ? result.jd_skills
    : [];
  const matchingSkills = Array.isArray(result.matching_skills)
    ? result.matching_skills
    : [];
  const missingSkills = Array.isArray(result.missing_skills)
    ? result.missing_skills
    : [];

  const transferableSkills = result.transferable_skills || {};
  const transferableSkillsList = Object.entries(transferableSkills).map(
    ([skill, data]) => ({
      skill,
      sibling: data.sibling,
      family: data.family,
      creditPct: data.credit_pct,
    })
  );

  const courseRecommendations = Array.isArray(
    result.course_recommendations
  )
    ? result.course_recommendations
    : [];

  const yearsGap = Math.max(
    0,
    Number((result.jd_years ?? matchResult.jdYears) || 0) -
      Number((result.cv_years ?? matchResult.cvYears) || 0)
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
        ? `Your CV shows ${result.cv_years ?? matchResult.cvYears} year(s), while the job asks for ${result.jd_years ?? matchResult.jdYears} year(s).`
        : `Experience level is aligned (${(result.cv_years ?? matchResult.cvYears) || 0} years).`,
      severity: yearsGap >= 2 ? 'high' : yearsGap === 1 ? 'medium' : 'low',
    },
    {
      title: 'Skill Match Quality',
      description:
        hardSkillWithBoost > hardSkillExact
          ? `Your transferable skills add ${familyBoostPct.toFixed(1)}% boost to your match score.`
          : 'Focus on acquiring exact skills mentioned in the job description.',
      severity:
        hardSkillExact < 50 ? 'high' : hardSkillExact < 75 ? 'medium' : 'low',
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
    `Hard skills weight is ${(Number(result.weights?.hard_skills || 0) * 100).toFixed(0)}%, so prioritize skill section improvements.`,
    transferableSkillsList.length
      ? `Leverage your transferable skills: ${transferableSkillsList
          .slice(0, 3)
          .map((item) => item.skill)
          .join(', ')}`
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
    grade: result.grade || matchResult.grade || 'Unrated',
    color: result.color || matchResult.color || '#2563eb',
    gradeMessage,
    hardSkillExact,
    hardSkillWithBoost,
    experienceMatch,
    semanticSimilarity,
    familyBoostPct,
    areasToImprove: areasToImprove.slice(0, 3),
    suggestedEdits,
    metadata: result.cv_metadata || {},
    cvYears: result.cv_years ?? matchResult.cvYears ?? 0,
    jdYears: result.jd_years ?? matchResult.jdYears ?? 0,
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
    weights: result.weights || {},
    courseRecommendations,
    jdWarning: result.jd_warning || matchResult.jdWarning || null,
  };
};
