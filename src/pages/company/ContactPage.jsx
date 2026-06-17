import CompanyPage from './CompanyPage';

const ContactPage = () => (
  <CompanyPage
    eyebrow="Company"
    title="Contact us"
    intro="We’d love to hear from you if you have feedback, partnership ideas, or need help using MASAR."
    sections={[
      {
        title: 'How to reach us',
        content: [
          'For now, this page serves as a quick entry point for support and collaboration requests.',
          'If you are using the app locally, the simplest way to get started is to share your feedback with the project team directly.',
        ],
        list: [
          'Product feedback',
          'Bug reports',
          'Feature requests',
          'Partnership inquiries',
        ],
      },
    ]}
    contact={{
      title: 'Support note',
      content: [
        'If you want, we can extend this page with a real contact form or support email next.',
      ],
    }}
  />
);

export default ContactPage;
