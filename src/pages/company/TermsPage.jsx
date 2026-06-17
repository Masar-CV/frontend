import CompanyPage from './CompanyPage';

const TermsPage = () => (
  <CompanyPage
    eyebrow="Legal"
    title="Terms of service"
    intro="These terms describe the basic expectations for using MASAR responsibly."
    sections={[
      {
        title: 'Using the app',
        content: [
          'Use MASAR in a lawful way and avoid attempts to disrupt the service or misuse the platform.',
          'The app is provided to help with career planning, but it should not be treated as a guarantee of job placement or interview outcomes.',
        ],
      },
      {
        title: 'Account responsibility',
        content: [
          'Keep your account credentials private and make sure the information you add is accurate to the best of your knowledge.',
          'As with the privacy page, a production deployment should replace this placeholder with a fully reviewed legal document.',
        ],
      },
    ]}
  />
);

export default TermsPage;
