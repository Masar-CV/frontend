import './CompanyPage.css';

const CompanyPage = ({ eyebrow, title, intro, sections = [], contact = null }) => (
  <main className="company-page">
    <div className="company-page-shell">
      <header className="company-page-hero">
        <p className="company-page-eyebrow">{eyebrow}</p>
        <h1 className="company-page-title">{title}</h1>
        <p className="company-page-intro">{intro}</p>
      </header>

      <div className="company-page-grid">
        <section className="company-page-card">
          {sections.map((section, sectionIndex) => (
            <div key={`${section.title}-${sectionIndex}`} className="company-page-section">
              <h2 className="company-page-section-title">{section.title}</h2>
              {section.content.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-${paragraphIndex}`} className="company-page-text">
                  {paragraph}
                </p>
              ))}
              {section.list?.length ? (
                <ul className="company-page-list">
                  {section.list.map((item, itemIndex) => (
                    <li key={`${section.title}-item-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>

        {contact ? (
          <aside className="company-page-contact">
            <h2 className="company-page-section-title">{contact.title}</h2>
            {contact.content.map((paragraph, paragraphIndex) => (
              <p key={`${contact.title}-${paragraphIndex}`} className="company-page-text">
                {paragraph}
              </p>
            ))}
            {contact.list?.length ? (
              <ul className="company-page-list">
                {contact.list.map((item, itemIndex) => (
                  <li key={`${contact.title}-item-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </aside>
        ) : null}
      </div>
    </div>
  </main>
);

export default CompanyPage;
