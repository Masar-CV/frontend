export const CV_TEMPLATES = [
  { id: 'modern', title: 'Modern Professional', category: 'Modern', variant: 'modern' },
  { id: 'latex', title: 'Professional CV', category: 'LaTeX', variant: 'academic' },
  { id: 'classic', title: 'Classic Professional', category: 'Professional', variant: 'classic' },
  { id: 'creative', title: 'Creative Designer', category: 'Creative', variant: 'creative' },
  { id: 'minimalist', title: 'Minimalist Clean', category: 'Minimalist', variant: 'minimalist' },
  { id: 'executive', title: 'Executive Leadership', category: 'Executive', variant: 'executive' },
  { id: 'tech', title: 'Tech Developer', category: 'Technology', variant: 'tech' },
  { id: 'academic', title: 'Academic Research', category: 'Academic', variant: 'academic' },
  { id: 'timeline', title: 'Timeline Experience', category: 'Modern', variant: 'timeline' },
];

export const COVER_TEMPLATES = [
  {
    id: 'cover-formal',
    title: 'Formal Cover Letter',
    category: 'Formal',
    summary: 'Traditional formal cover letter for corporate positions',
    excerpt:
      'Dear Hiring Manager, I am writing to express my strong interest in the [Position Title] position at [Company Name]. With [X years] of experience in [Industry/Field], I am confident my skills and background make me an excellent candidate for this role.',
    fullText:
      'Dear Hiring Manager,\n\nI am writing to express my strong interest in the [Position Title] position at [Company Name]. With [X years] of experience in [Industry/Field], I am confident that my skills and background make me an excellent candidate for this role.\n\nIn my current position at [Current Company], I have successfully [key achievement or responsibility]. This experience has equipped me with [relevant skills] that directly align with the requirements outlined in your job posting.\n\nI am particularly drawn to [Company Name] because of [specific reason related to company values, culture, or mission]. I am excited about the opportunity to contribute to [specific project, team, or goal] and help drive [company objective].\n\nI would welcome the opportunity to discuss how my experience and skills can benefit your team. Thank you for considering my application.\n\nSincerely,\n[Your Name]',
    type: 'letter',
    badgeStyle: 'light',
  },
  {
    id: 'cover-modern',
    title: 'Modern Cover Letter',
    category: 'Modern',
    summary: 'Contemporary cover letter for tech and startup roles',
    excerpt:
      'Hi [Hiring Manager Name], I am excited to apply for the [Position Title] role at [Company Name]. Your team\'s work on [specific project] caught my attention and strongly matches my passion for [relevant field/technology].',
    fullText:
      'Hi [Hiring Manager Name],\n\nI am excited to apply for the [Position Title] role at [Company Name]. Your team\'s work on [specific project or achievement] really resonates with my passion for [relevant field/technology].\n\nHere\'s why I think I\'d be a great fit:\n- [Your key experience or technical strength]\n- [A measurable achievement]\n- [A unique value you can bring to the role]\n\nIn my recent work at [Current Company], I have [impact statement tied to the role]. I thrive in fast-moving environments, enjoy collaborating across teams, and care deeply about building high-quality solutions.\n\nI\'d love the chance to discuss how my skills and experience can contribute to your team. Thanks for your time and consideration.\n\nBest,\n[Your Name]',
    type: 'letter',
    badgeStyle: 'light',
  },
  {
    id: 'cover-creative',
    title: 'Creative Cover Letter',
    category: 'Creative',
    summary: 'Engaging cover letter for creative and design positions',
    excerpt:
      'Dear [Hiring Manager Name], What if I told you that [compelling opening statement related to the company or role]? That is exactly the kind of thinking I bring to my work as a [Your Profession].',
    fullText:
      'Dear [Hiring Manager Name],\n\nWhat if I told you that [compelling opening statement related to the company or role]? That\'s exactly the kind of thinking I bring to my work as a [Your Profession].\n\nWhen I saw the [Position Title] opening at [Company Name], I knew I had to reach out. My creative journey includes:\n- [Notable achievement or project]\n- [Unique skill or experience]\n- [Relevant accomplishment with impact]\n\n[Company Name]\'s approach to [specific company initiative] is inspiring. I\'ve been following your work on [specific project], and I\'m impressed by [specific detail].\n\nI\'d love to bring my experience in [relevant area] to help push boundaries even further. Let\'s create something amazing together.\n\nCreatively yours,\n[Your Name]',
    type: 'letter',
    badgeStyle: 'light',
  },
  {
    id: 'application-email',
    title: 'Job Application Email',
    category: 'Formal',
    summary: 'Professional email for job applications',
    excerpt:
      'Subject: Application for [Position Title] - [Your Name]\nDear [Hiring Manager Name], I am writing to apply for the [Position Title] position advertised on [where you found the job].',
    fullText:
      'Subject: Application for [Position Title] - [Your Name]\n\nDear [Hiring Manager Name],\n\nI am writing to apply for the [Position Title] position advertised on [where you found the job]. I have attached my resume and cover letter for your review.\n\nWith [X years] of experience in [relevant field], I believe I would be a valuable addition to your team at [Company Name]. My background in [key skills/experience] aligns well with the requirements outlined in the job description.\n\nI am particularly interested in this opportunity because [brief reason]. I would welcome the chance to discuss how my skills and experience can contribute to [Company Name]\'s continued success.\n\nPlease find attached:\n- Resume\n- Cover Letter\n- [Any other relevant documents]\n\nThank you for your consideration. I look forward to hearing from you.\n\nBest regards,\n[Your Name]\n[Phone Number]\n[Email Address]\n[LinkedIn Profile]',
    type: 'email',
    badgeStyle: 'dark',
  },
  {
    id: 'follow-up-email',
    title: 'Follow-up Email',
    category: 'Professional',
    summary: 'Polite follow-up email after application',
    excerpt:
      'Subject: Following Up - [Position Title] Application\nDear [Hiring Manager Name], I hope this email finds you well. I wanted to follow up on my application submitted on [date].',
    fullText:
      'Subject: Following Up - [Position Title] Application\n\nDear [Hiring Manager Name],\n\nI hope this email finds you well. I wanted to follow up on my application for the [Position Title] position that I submitted on [date].\n\nI remain very interested in this opportunity and believe my experience in [key relevant area] would make me a strong fit for your team. I am particularly excited about [specific aspect of the role or company].\n\nI understand you are likely reviewing many applications, but I wanted to reiterate my enthusiasm for this position and my interest in contributing to [Company Name].\n\nIf you need any additional information or would like to schedule a conversation, please do not hesitate to reach out.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]\n[Phone Number]\n[Email Address]',
    type: 'email',
    badgeStyle: 'dark',
  },
  {
    id: 'thank-you-email',
    title: 'Thank You Email',
    category: 'Professional',
    summary: 'Post-interview thank you email',
    excerpt:
      'Subject: Thank You - [Position Title] Interview\nDear [Interviewer Name], Thank you for taking the time to meet with me today to discuss the [Position Title] role.',
    fullText:
      'Subject: Thank You - [Position Title] Interview\n\nDear [Interviewer Name],\n\nThank you for taking the time to meet with me today to discuss the [Position Title] position. I enjoyed learning more about the role, the team, and [Company Name]\'s vision for [specific topic discussed].\n\nOur conversation reinforced my interest in this opportunity. I was particularly excited to hear about [specific project or initiative], and I am confident that my experience with [relevant skill/experience] would allow me to make meaningful contributions.\n\nI appreciate you sharing insights about [specific detail from interview]. Please let me know if you need any additional information from me.\n\nThank you again for your time and consideration.\n\nBest regards,\n[Your Name]\n[Phone Number]\n[Email Address]',
    type: 'email',
    badgeStyle: 'dark',
  },
];

const allTemplates = [...CV_TEMPLATES, ...COVER_TEMPLATES];

export const TEMPLATE_BY_ID = allTemplates.reduce((accumulator, template) => {
  accumulator[template.id] = template;
  return accumulator;
}, {});

export const getTemplateById = (templateId) => TEMPLATE_BY_ID[templateId] || TEMPLATE_BY_ID.creative;
