const CoverTemplateModal = ({ template, onClose }) => {
  if (!template) {
    return null;
  }

  return (
    <div className="cover-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="cover-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cover-template-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cover-modal-close" aria-label="Close" onClick={onClose}>
          x
        </button>
        <h3 id="cover-template-modal-title">{template.title}</h3>
        <p className="cover-modal-type">{template.category}</p>
        <pre>{template.fullText}</pre>
      </div>
    </div>
  );
};

export default CoverTemplateModal;
