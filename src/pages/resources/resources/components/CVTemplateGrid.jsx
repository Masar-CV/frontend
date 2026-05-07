import CVTemplateCard from './CVTemplateCard';

const CVTemplateGrid = ({ templates }) => (
  <section className="cv-grid" aria-label="CV template resources">
    {templates.map((template) => (
      <CVTemplateCard key={template.id} template={template} />
    ))}
  </section>
);

export default CVTemplateGrid;
