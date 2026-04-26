export const CV_TEMPLATES = [
  { id: 'modern', title: 'Modern Professional', category: 'Modern', variant: 'modern' },
  { id: 'latex', title: 'LaTeX Developer CV', category: 'LaTeX', variant: 'academic' },
  { id: 'classic', title: 'Classic Professional', category: 'Professional', variant: 'classic' },
  { id: 'creative', title: 'Creative Designer', category: 'Creative', variant: 'creative' },
  { id: 'minimalist', title: 'Minimalist Clean', category: 'Minimalist', variant: 'minimalist' },
  { id: 'executive', title: 'Executive Leadership', category: 'Executive', variant: 'executive' },
  { id: 'tech', title: 'Tech Developer', category: 'Technology', variant: 'tech' },
  { id: 'academic', title: 'Academic Research', category: 'Academic', variant: 'academic' },
  { id: 'timeline', title: 'Timeline Experience', category: 'Modern', variant: 'timeline' },
];

export const COVER_TEMPLATES = [
  { id: 'cover-modern', title: 'Modern Cover Letter', category: 'Modern', variant: 'modern' },
  { id: 'cover-classic', title: 'Classic Cover Letter', category: 'Professional', variant: 'classic' },
  { id: 'cover-executive', title: 'Executive Cover Letter', category: 'Executive', variant: 'executive' },
  { id: 'cover-tech', title: 'Tech Cover Letter', category: 'Technology', variant: 'tech' },
];

const allTemplates = [...CV_TEMPLATES, ...COVER_TEMPLATES];

export const TEMPLATE_BY_ID = allTemplates.reduce((accumulator, template) => {
  accumulator[template.id] = template;
  return accumulator;
}, {});

export const getTemplateById = (templateId) => TEMPLATE_BY_ID[templateId] || TEMPLATE_BY_ID.creative;
