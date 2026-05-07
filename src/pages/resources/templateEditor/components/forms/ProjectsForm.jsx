const ProjectsForm = ({ projects, onAddProject, onProjectChange, onRemoveProject }) => (
  <div className="editor-repeater">
    {projects.map((project, index) => (
      <div key={project.id} className="editor-repeater-card">
        <div className="editor-repeater-card-header">
          <h4>Project #{index + 1}</h4>
          {projects.length > 1 && (
            <button type="button" className="editor-link-danger" onClick={() => onRemoveProject(index)}>
              Remove
            </button>
          )}
        </div>

        <label className="editor-form-group">
          <span className="editor-form-label">Project Name</span>
          <input
            type="text"
            className="editor-input"
            value={project.heading}
            onChange={(event) => onProjectChange(index, 'heading', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Tech Stack / Link Label</span>
          <input
            type="text"
            className="editor-input"
            value={project.subheading}
            onChange={(event) => onProjectChange(index, 'subheading', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Context (Company, Year, etc.)</span>
          <input
            type="text"
            className="editor-input"
            value={project.period}
            onChange={(event) => onProjectChange(index, 'period', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Link Label</span>
          <input
            type="text"
            className="editor-input"
            value={project.linkLabel || ''}
            placeholder="GitHub, Live Demo, Google Play"
            onChange={(event) => onProjectChange(index, 'linkLabel', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">URL</span>
          <input
            type="url"
            className="editor-input"
            value={project.url || ''}
            placeholder="https://example.com/project"
            onChange={(event) => onProjectChange(index, 'url', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Description</span>
          <textarea
            className="editor-textarea editor-textarea--compact"
            rows={3}
            value={project.description}
            onChange={(event) => onProjectChange(index, 'description', event.target.value)}
          />
        </label>
      </div>
    ))}
    <button type="button" className="editor-add-button" onClick={onAddProject}>
      + Add Project
    </button>
  </div>
);

export default ProjectsForm;
