const ImprovementCards = ({ computed }) => (
  <section className="cv-results-two-col">
    <article className="cv-results-card">
      <header className="results-card-header">
        <h2>Areas to Improve</h2>
        <p>Issues identified in your CV</p>
      </header>

      <div className="improvement-list">
        {computed.areasToImprove.map((item) => (
          <div key={item.title} className={`improvement-item ${item.severity}`}>
            <div className="improvement-row">
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </article>

    <article className="cv-results-card">
      <header className="results-card-header">
        <h2>Suggested Edits</h2>
        <p>Quick wins to improve your CV</p>
      </header>

      <ul className="suggestion-list">
        {computed.suggestedEdits.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  </section>
);

export default ImprovementCards;
