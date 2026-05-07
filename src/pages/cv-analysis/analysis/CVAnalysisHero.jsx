const CVAnalysisHero = () => (
  <section className="cv-analysis-hero">
    <div className="cv-analysis-hero-copy">
      <h1>CV Analysis &amp; Job Matching</h1>
      <p>
        Get AI-powered insights on your CV and see how well it matches job
        requirements
      </p>
    </div>

    <div className="cv-analysis-hero-graphic" aria-hidden="true">
      <svg viewBox="0 0 260 190">
        <rect
          x="38"
          y="24"
          width="184"
          height="130"
          rx="12"
          fill="#FFFFFF"
          stroke="#191A15"
          strokeWidth="2"
        />
        <rect x="38" y="24" width="184" height="44" rx="12" fill="#2563EB" />
        <line x1="38" y1="68" x2="222" y2="68" stroke="#191A15" strokeWidth="2" />
        <path
          d="M68 106L106 68L132 90L160 66L186 90"
          fill="none"
          stroke="#191A15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="68" y1="154" x2="196" y2="154" stroke="#191A15" strokeWidth="2" />
        <line
          x1="64"
          y1="46"
          x2="76"
          y2="46"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="46"
          x2="130"
          y2="46"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  </section>
);

export default CVAnalysisHero;
