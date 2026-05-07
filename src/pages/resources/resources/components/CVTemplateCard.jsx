import { Link } from 'react-router-dom';
import CVTemplatePreview from './CVTemplatePreview';

const CVTemplateCard = ({ template }) => (
  <article className={`cv-card cv-card--${template.variant}`}>
    <CVTemplatePreview variant={template.variant} />

    <div className="cv-card-body">
      <h3 className="cv-card-title">{template.title}</h3>
      <span className="cv-card-category">{template.category}</span>
      <Link to={`/dashboard/resources/editor/${template.id}`} className="cv-card-button">
        Use this template
      </Link>
    </div>
  </article>
);

export default CVTemplateCard;
