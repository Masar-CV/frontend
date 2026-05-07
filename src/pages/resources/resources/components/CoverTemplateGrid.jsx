import CoverTemplateCard from './CoverTemplateCard';

const CoverTemplateGrid = ({ copiedTemplateId, templates, onCopyTemplate, onViewTemplate }) => (
  <section className="cover-grid" aria-label="Cover letter resources">
    {templates.map((template) => (
      <CoverTemplateCard
        copiedTemplateId={copiedTemplateId}
        key={template.id}
        template={template}
        onCopyTemplate={onCopyTemplate}
        onViewTemplate={onViewTemplate}
      />
    ))}
  </section>
);

export default CoverTemplateGrid;
