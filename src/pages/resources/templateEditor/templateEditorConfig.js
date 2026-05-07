export const EDITOR_TABS = [
  { id: 'personal', label: 'Personal' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'custom', label: 'Custom Sections' },
];

export const PERSONAL_FIELDS = [
  { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
  { key: 'professionalTitle', label: 'Professional Title', placeholder: 'Professional Title' },
  { key: 'email', label: 'Email', placeholder: 'john.doe@email.com' },
  { key: 'phone', label: 'Phone', placeholder: '+1 234 567 890' },
  { key: 'location', label: 'Location', placeholder: 'City, Country' },
  { key: 'website', label: 'Portfolio Website', placeholder: 'www.johndoe.com' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/johndoe' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/johndoe' },
];

export const EDITOR_SECTION_TITLES = {
  personal: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education Details',
  skills: 'Skills',
  projects: 'Projects',
  custom: 'Custom Sections',
};

export const DOWNLOAD_HINTS = {
  latex: 'Result shows formatted output. Switch to code to view exact LaTeX source, then download .tex.',
  default: 'LaTeX download gives you an editable template file. PDF uses your browser print dialog.',
};
