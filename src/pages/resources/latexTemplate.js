export const EXACT_LATEX_TEMPLATE = String.raw`%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}

%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% serif
% \usepackage{CormorantGaramond}
% \usepackage{charter}

\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge \scshape Abdalrhman Osama Eid} \\ \vspace{1pt}
    \small Cairo, Egypt $|$ +20 1122659904 $|$ \href{mailto:abduos369@gmail.com}{\underline{abduos369@gmail.com}} \\ \vspace{3pt}
    \small
    \href{https://linkedin.com/}{\underline{LinkedIn}} $|$
    \href{https://github.com/}{\underline{GitHub}} $|$
    \href{https://portfolio-eight-blush-78.vercel.app/}{\underline{portfolio}}
\end{center}

%-----------SUMMARY-----------
\section{Summary}
 \small{Fly \& Mobile Developer with 2 years of experience building various applications. Skilled in Android \& iOS development, UI/UX implementation, responsive design, API integration, and performance optimization. Passionate about delivering the best user experience through clean design and functionality. In my free time, I serve as a mentor to teach students the development of mobile applications and Flutter best practices.}

%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {Egyptian E-learning University (EELU)}{Dokki, Egypt}
      {Bachelor of Science in Computer Science}{Expected Graduation: 2026}
  \resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Junior Flutter Developer}{Dec 2025 -- Present}
      {Codeikoo}{OnSite $|$ Part-Time}
      \resumeItemListStart
        \resumeItem{Implemented core ERP modules HR Management, Users \& Roles, Reports, Orders, and Work Management.}
        \resumeItem{Integrated ERP back-end systems through RESTful APIs, handling, authorization, and data synchronization.}
      \resumeItemListEnd

    \resumeSubheading
      {Junior Flutter Developer}{Jun 2024 -- May 2025}
      {Jbr-Digital}{On-site $|$ Full-Time}
      \resumeItemListStart
        \resumeItem{Built and maintained mobile apps while collaborating with cross-functional teams to deliver high-quality projects.}
        \resumeItem{Integrated APIs and strictly followed clean code principles to ensure well-structured, maintainable codebases.}
      \resumeItemListEnd

    \resumeSubheading
      {Mentorship Flutter Development}{Feb 2025 -- Sep 2025}
      {DAYRA}{Remote}
      \resumeItemListStart
        \resumeItem{intensive Flutter mentorship, mastering Clean Code, SOLID principles, and Clean Architecture for scalable apps.}
        \resumeItem{Gained hands-on experience in BLoC/Cubit state management, feature design, and modular project structuring.}
      \resumeItemListEnd

    \resumeSubheading
      {Intern Flutter Developer}{Dec 2024 -- May 2025}
      {VFI Tech}{Remote $|$ Part-Time}
      \resumeItemListStart
        \resumeItem{Learned to create responsive UIs, decouple business logic from the interface, and routing.}
        \resumeItem{Collaborated using Git/GitHub within a team environment and mastered the core concepts of robust API handling.}
      \resumeItemListEnd

  \resumeSubHeadingListEnd

%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
      \resumeProjectHeading
          {\textbf{Easy Bio App} $|$ \emph{Flutter} $|$ \href{https://play.google.com/store/apps/details?id=com.abdelmoneim.easyBio}{\underline{Google Play}}}{VFI}
          \resumeItemListStart
            \resumeItem{Contributed to a high school Biology Learning Platform, enabling students access educational videos online.}
            \resumeItem{Integrated the mobile application with a website for seamless content delivery across platforms.}
          \resumeItemListEnd
      
      \resumeProjectHeading
          {\textbf{Quran Memorization Center App} $|$ \emph{Flutter, Hive, MVVM}}{JBR - KSA}
          \resumeItemListStart
            \resumeItem{Developed a comprehensive management app for students, teachers (Mohafez) at a Quran memorization center.}
            \resumeItem{Utilized Hive for local storage, MVVM architecture, and implemented local notifications.}
            \resumeItem{Integrated APIs for Quran and Azkar, alongside features for quizzes, grades, reports, and attendance tracking.}
          \resumeItemListEnd

      \resumeProjectHeading
          {\textbf{GOT App} $|$ \emph{Flutter, BLoC, REST API} $|$ \href{https://github.com/ABDO-OS/bloc.git}{\underline{GitHub}}}{}
          \resumeItemListStart
            \resumeItem{Developed a sophisticated Flutter application to present and manage Game of Thrones characters.}
            \resumeItem{Efficiently fetched and displayed character details (name, title, family, images) via robust API integration.}
            \resumeItem{Leveraged  BLoC to manage complex application logic and ensure smooth data flow within an interactive UI.}
          \resumeItemListEnd

    \resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages \& Core}{: Dart, Java, OOP, SOLID Principles, SQL} \\
     \textbf{Backend \& Cloud}{: Firebase (Auth, Firestore, FCM), Supabase, RESTful APIs, Dio} \\
     \textbf{Storage \& Tools}{: SQLite, Hive, Shared Preferences, Git, GitHub, Postman, Jira, Agile} \\
     \textbf{UI/UX \& Performance}{: Material Design, Responsive Design, RTL, Dark Mode, Crashlytics, Analytics} \\
     \textbf{Spoken Languages}{: Arabic (Native), English (Professional Proficiency)}
    }}
 \end{itemize}

%-------------------------------------------
\end{document}
`;

export const buildLatexTemplate = () => EXACT_LATEX_TEMPLATE;

export const createLatexFileName = (fullName) => {
  const normalizedName = String(fullName || 'cv-template')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${normalizedName || 'cv-template'}.tex`;
};

export const LATEX_TEMPLATE_DEFAULT_DATA = {
  personal: {
    fullName: 'Your Name',
    professionalTitle: 'Job Title',
    email: 'abduos369@gmail.com',
    phone: '+20 1122659904',
    location: 'Cairo, Egypt',
    website: 'https://portfolio-eight-blush-78.vercel.app/',
    linkedin: 'https://linkedin.com/',
    github: 'https://github.com/',
  },
  summary:
    'Fly me to the moon.',
  skills: [
    'Dart',
    'Java',
    'OOP',
    'SOLID Principles',
    'SQL',
    'Flutter',
    'Clean Architecture',
    'MVVM',
    'BLoC (State Management)',
    'Firebase',
    'Supabase',
    'RESTful APIs',   
    'SQLite',
    'Git',
    'GitHub',
    'Postman',
    'Jira',
    'Agile',
    'Material Design',
    'Responsive Design',
    'RTL',
    'Dark Mode',
    'Crashlytics',
    'Arabic (Native)',
    'English (Professional Proficiency)',
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Position',
      company: 'Company Name',
      period: 'Dec 2024 -- May 2025',
      location: 'On-site | Full-Time',
      description:
        'Led key initiatives and delivered exceptional results.',
    },
    {
      id: 'exp-2',
      role: 'Junior Flutter Developer',
      company: 'VFI Tech',
      period: 'Dec 2024 -- May 2025',
      location: 'Remote | Part-Time',
      description:
        'Learned to create responsive UIs.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Egyptian E-learning University (EELU)',
      year: 'Expected Graduation: 2026',
      location: 'Dokki, Egypt',
    },
  ],
  projects: [
    {
      id: 'project-1',
      heading: 'Ecommerce App',
      subheading: 'Flutter',
      period: 'VFI',
      linkLabel: 'Google Play',
      url: 'https://play.google.com/',
      description:
        'Contributed to a high Ecommerce App Platform.',
    },
  ],
  customSections: [],
};
