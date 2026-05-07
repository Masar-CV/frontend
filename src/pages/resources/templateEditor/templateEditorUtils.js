export const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const createExperienceItem = () => ({
  id: createId('exp'),
  role: 'Senior Position',
  company: 'Company Name',
  period: '2020 - Present',
  location: 'On-site | Full-Time',
  description: 'Led key initiatives and delivered exceptional results.',
});

export const createEducationItem = () => ({
  id: createId('edu'),
  degree: 'Bachelor of Science',
  institution: 'University Name',
  year: '2019',
  location: 'City, Country',
});

export const createProjectItem = () => ({
  id: createId('project'),
  heading: 'Project Name',
  subheading: 'Tech Stack',
  period: 'Context',
  linkLabel: 'Project Link',
  url: '',
  description: 'Describe your contribution and the impact of this project.',
});

export const createCustomSectionItem = () => ({
  id: createId('custom-item'),
  heading: 'Item Title',
  subheading: 'Subtitle',
  period: '',
  description: 'Add bullet points separated by new lines or semicolons.',
});

export const createCustomSection = () => ({
  id: createId('custom'),
  title: 'New Section',
  items: [createCustomSectionItem()],
});

export const parseSkills = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const splitDescriptionLines = (value) =>
  String(value || '')
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

export const cloneCvData = (data) => JSON.parse(JSON.stringify(data));

export const fallbackCustomItem = {
  id: 'preview-fallback',
  heading: 'Item Title',
  subheading: 'Subtitle',
  period: '',
  description: 'Add details for this item.',
};
