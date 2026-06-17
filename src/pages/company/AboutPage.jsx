import CompanyPage from './CompanyPage';

const AboutPage = () => (
  <CompanyPage
    eyebrow="Company"
    title="About MASAR"
    intro="MASAR helps job seekers move faster with practical tools for CV analysis, job tracking, and interview preparation."
    sections={[
      {
        title: 'What we do',
        content: [
          'We build career tools that reduce friction in the job search and help users present their experience with more confidence.',
          'Our platform combines AI-assisted guidance with simple workflows so users can focus on progress, not admin.',
        ],
      },
      {
        title: 'Our focus',
        content: [
          'We keep the experience lightweight, approachable, and centered on real outcomes for students and professionals.',
        ],
        list: [
          'CV and profile optimization',
          'Job application tracking',
          'Interview practice and preparation',
          'Reusable resources and templates',
        ],
      },
    ]}
    contact={{
      title: 'Quick links',
      content: ['Visit the main dashboard from the home page to explore the product.'],
    }}
  />
);

export default AboutPage;
