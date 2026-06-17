import CompanyPage from './CompanyPage';

const PrivacyPage = () => (
  <CompanyPage
    eyebrow="Legal"
    title="Privacy policy"
    intro="This page explains how MASAR handles user data at a high level."
    sections={[
      {
        title: 'Information we use',
        content: [
          'We may store account details, profile data, and application activity to provide the core features of the platform.',
          'We use this information to improve recommendations, personalize the experience, and keep the app working for you.',
        ],
      },
      {
        title: 'Your controls',
        content: [
          'You should always be able to review and update your profile data inside the app.',
          'If the project grows into a production service, this section should be replaced with a formal privacy policy reviewed for compliance.',
        ],
      },
    ]}
  />
);

export default PrivacyPage;
