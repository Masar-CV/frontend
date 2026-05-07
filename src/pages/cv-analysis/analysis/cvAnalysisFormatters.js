export const formatPercent = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(100, Number(parsed.toFixed(2))));
};

export const formatSkill = (skill) => {
  if (!skill) return '';
  return skill
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const formatListSummary = (items, count = 4) => {
  if (!items.length) return 'None identified';
  const selected = items.slice(0, count).map(formatSkill);
  const suffix = items.length > count ? ` +${items.length - count} more` : '';
  return `${selected.join(', ')}${suffix}`;
};

export const cvFileLabel = (file) => {
  if (!file) return '';
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  return `${file.name} (${sizeMb} MB)`;
};
