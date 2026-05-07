const CustomSectionsForm = ({
  customSections,
  onAddCustomSection,
  onAddCustomSectionItem,
  onCustomSectionChange,
  onCustomSectionItemChange,
  onRemoveCustomSection,
  onRemoveCustomSectionItem,
}) => (
  <div className="editor-repeater">
    {customSections.map((section, sectionIndex) => (
      <div key={section.id} className="editor-repeater-card">
        <div className="editor-repeater-card-header">
          <h4>Section #{sectionIndex + 1}</h4>
          {customSections.length > 1 && (
            <button type="button" className="editor-link-danger" onClick={() => onRemoveCustomSection(sectionIndex)}>
              Remove Section
            </button>
          )}
        </div>

        <label className="editor-form-group">
          <span className="editor-form-label">Section Title</span>
          <input
            type="text"
            className="editor-input"
            value={section.title}
            onChange={(event) => onCustomSectionChange(sectionIndex, 'title', event.target.value)}
          />
        </label>

        {section.items.map((item, itemIndex) => (
          <div key={item.id} className="editor-repeater-card editor-repeater-card--nested">
            <div className="editor-repeater-card-header">
              <h4>Entry #{itemIndex + 1}</h4>
              {section.items.length > 1 && (
                <button
                  type="button"
                  className="editor-link-danger"
                  onClick={() => onRemoveCustomSectionItem(sectionIndex, itemIndex)}
                >
                  Remove Entry
                </button>
              )}
            </div>

            <label className="editor-form-group">
              <span className="editor-form-label">Title</span>
              <input
                type="text"
                className="editor-input"
                value={item.heading}
                onChange={(event) => onCustomSectionItemChange(sectionIndex, itemIndex, 'heading', event.target.value)}
              />
            </label>
            <label className="editor-form-group">
              <span className="editor-form-label">Subtitle</span>
              <input
                type="text"
                className="editor-input"
                value={item.subheading}
                onChange={(event) => onCustomSectionItemChange(sectionIndex, itemIndex, 'subheading', event.target.value)}
              />
            </label>
            <label className="editor-form-group">
              <span className="editor-form-label">Date / Context</span>
              <input
                type="text"
                className="editor-input"
                value={item.period}
                onChange={(event) => onCustomSectionItemChange(sectionIndex, itemIndex, 'period', event.target.value)}
              />
            </label>
            <label className="editor-form-group">
              <span className="editor-form-label">Details (new line or ; for each bullet)</span>
              <textarea
                className="editor-textarea editor-textarea--compact"
                rows={3}
                value={item.description}
                onChange={(event) => onCustomSectionItemChange(sectionIndex, itemIndex, 'description', event.target.value)}
              />
            </label>
          </div>
        ))}

        <button type="button" className="editor-add-button" onClick={() => onAddCustomSectionItem(sectionIndex)}>
          + Add Entry
        </button>
      </div>
    ))}

    <button type="button" className="editor-add-button" onClick={onAddCustomSection}>
      + Add New Section
    </button>
  </div>
);

export default CustomSectionsForm;
