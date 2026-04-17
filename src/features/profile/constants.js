export const PROFICIENCY_LABELS = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
  5: 'Master',
};

export const getSkillLevelColor = (level) => {
  switch (level) {
    case 5: return '#1e40af';
    case 4: return '#2563eb';
    case 3: return '#3b82f6';
    case 2: return '#60a5fa';
    default: return '#93c5fd';
  }
};

export const formatDateForInput = (iso) => {
  if (!iso) return '';
  return iso.slice(0, 10);
};

export const formatDateDisplay = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
