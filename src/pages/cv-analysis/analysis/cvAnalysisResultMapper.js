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

  const finalScore = formatPercent(matchResult.final_score);
  const hardSkillExact = formatPercent(matchResult.scores?.hard_skill_exact);
  const hardSkillWithBoost = formatPercent(
    matchResult.scores?.hard_skill_with_boost
  );
  const experienceMatch = formatPercent(matchResult.scores?.experience_match);
  const semanticSimilarity = formatPercent(
    matchResult.scores?.semantic_similarity
  );
  const familyBoostPct = formatPercent(matchResult.scores?.family_boost_pct);

  const cvSkills = Array.isArray(matchResult.cv_skills)
    ? matchResult.cv_skills
    : [];
  const jdSkills = Array.isArray(matchResult.jd_skills)
    ? matchResult.jd_skills
    : [];
  const matchingSkills = Array.isArray(matchResult.matching_skills)
    ? matchResult.matching_skills
    : [];
  const missingSkills = Array.isArray(matchResult.missing_skills)
    ? matchResult.missing_skills
    : [];

  const transferableSkills = matchResult.transferable_skills || {};
  const transferableSkillsList = Object.entries(transferableSkills).map(
    ([skill, data]) => ({
      skill,
      sibling: data.sibling,
      family: data.family,
      creditPct: data.credit_pct,
    })
  );

  const courseRecommendations = Array.isArray(
    matchResult.course_recommendations
  )
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
    `Hard skills weight is ${(Number(matchResult.weights?.hard_skills || 0) * 100).toFixed(0)}%, so prioritize skill section improvements.`,
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
};
