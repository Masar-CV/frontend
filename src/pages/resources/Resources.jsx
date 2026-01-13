import './Resources.css';

const Resources = () => {
  return (
    <div className="resources">
      <div className="resources-header">
        <h1 className="page-title">Resources Library</h1>
        <p className="page-subtitle">Courses, templates, and career development resources</p>
      </div>

      <div className="resources-content">
        <div className="resources-filter">
          <button type="button" className="filter-btn active">All</button>
          <button type="button" className="filter-btn">Courses</button>
          <button type="button" className="filter-btn">Templates</button>
          <button type="button" className="filter-btn">Guides</button>
        </div>

        <div className="resources-grid">
          <div className="resource-card">
            <h3 className="resource-title">Course Title</h3>
            <p className="resource-description">Course description will appear here</p>
            <button type="button" className="btn btn-primary">View Course</button>
          </div>

          <div className="resource-card">
            <h3 className="resource-title">Template Title</h3>
            <p className="resource-description">Template description will appear here</p>
            <button type="button" className="btn btn-primary">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;

