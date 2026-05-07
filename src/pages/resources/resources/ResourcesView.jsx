import colImage from '../../../assets/images/Col.png';
import CoverTemplateGrid from './components/CoverTemplateGrid';
import CoverTemplateModal from './components/CoverTemplateModal';
import CVTemplateGrid from './components/CVTemplateGrid';
import ResourceHero from './components/ResourceHero';

const ResourcesView = ({
  activeTab,
  copiedTemplateId,
  selectedCoverTemplate,
  templates,
  handleCopyTemplate,
  setActiveTab,
  setSelectedCoverTemplate,
}) => (
  <>
    <main className="resources-main">
      <div className="resources-shell">
        <ResourceHero activeTab={activeTab} heroImage={colImage} onTabChange={setActiveTab} />

        {activeTab === 'cover' ? (
          <CoverTemplateGrid
            copiedTemplateId={copiedTemplateId}
            templates={templates}
            onCopyTemplate={handleCopyTemplate}
            onViewTemplate={setSelectedCoverTemplate}
          />
        ) : (
          <CVTemplateGrid templates={templates} />
        )}
      </div>
    </main>

    <CoverTemplateModal template={selectedCoverTemplate} onClose={() => setSelectedCoverTemplate(null)} />
  </>
);

export default ResourcesView;
