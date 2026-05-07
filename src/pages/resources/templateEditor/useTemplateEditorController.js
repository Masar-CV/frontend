import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTemplateById } from '../templateData';
import { LATEX_TEMPLATE_DEFAULT_DATA, buildLatexTemplate, createLatexFileName } from '../latexTemplate';
import {
  cloneCvData,
  createCustomSection,
  createCustomSectionItem,
  createEducationItem,
  createExperienceItem,
  createProjectItem,
  parseSkills,
} from './templateEditorUtils';

export const useTemplateEditorController = () => {
  const { templateId = 'creative' } = useParams();
  const selectedTemplate = getTemplateById(templateId);
  const [activeTab, setActiveTab] = useState('personal');
  const [cvData, setCvData] = useState(() => cloneCvData(LATEX_TEMPLATE_DEFAULT_DATA));
  const [skillsInput, setSkillsInput] = useState(() => LATEX_TEMPLATE_DEFAULT_DATA.skills.join(', '));
  const [latexPreviewMode, setLatexPreviewMode] = useState('rendered');

  const isLatexTemplate = selectedTemplate.id === 'latex';
  const themeClass = `cv-preview-theme-${selectedTemplate.variant}`;
  const latexPreview = useMemo(() => buildLatexTemplate(cvData), [cvData]);

  const contactLine = useMemo(() => {
    const items = [cvData.personal.email, cvData.personal.phone, cvData.personal.location].filter(Boolean);
    return items.join(' | ');
  }, [cvData.personal.email, cvData.personal.phone, cvData.personal.location]);

  const visibleCustomSections = useMemo(
    () =>
      cvData.customSections.filter(
        (section) => section.title.trim() || section.items.some((item) => item.heading.trim() || item.description.trim()),
      ),
    [cvData.customSections],
  );

  const handlePersonalChange = (field, value) => {
    setCvData((previous) => ({
      ...previous,
      personal: {
        ...previous.personal,
        [field]: value,
      },
    }));
  };

  const handleSummaryChange = (value) => {
    setCvData((previous) => ({
      ...previous,
      summary: value,
    }));
  };

  const handleCollectionChange = (collectionName, index, field, value) => {
    setCvData((previous) => ({
      ...previous,
      [collectionName]: previous[collectionName].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addCollectionItem = (collectionName, createItem) => {
    setCvData((previous) => ({
      ...previous,
      [collectionName]: [...previous[collectionName], createItem()],
    }));
  };

  const removeCollectionItem = (collectionName, index) => {
    setCvData((previous) => ({
      ...previous,
      [collectionName]: previous[collectionName].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleCustomSectionChange = (sectionIndex, field, value) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const handleCustomSectionItemChange = (sectionIndex, itemIndex, field, value) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, itemIndexInSection) =>
                itemIndexInSection === itemIndex ? { ...item, [field]: value } : item,
              ),
            }
          : section,
      ),
    }));
  };

  const addCustomSection = () => {
    setCvData((previous) => ({
      ...previous,
      customSections: [...previous.customSections, createCustomSection()],
    }));
  };

  const removeCustomSection = (sectionIndex) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const addCustomSectionItem = (sectionIndex) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex ? { ...section, items: [...section.items, createCustomSectionItem()] } : section,
      ),
    }));
  };

  const removeCustomSectionItem = (sectionIndex, itemIndex) => {
    setCvData((previous) => ({
      ...previous,
      customSections: previous.customSections.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: section.items.filter((_, itemIndexInSection) => itemIndexInSection !== itemIndex) }
          : section,
      ),
    }));
  };

  const handleSkillsChange = (value) => {
    setSkillsInput(value);
    setCvData((previous) => ({
      ...previous,
      skills: parseSkills(value),
    }));
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleDownloadLatex = () => {
    const blob = new Blob([latexPreview], { type: 'text/x-tex;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = createLatexFileName(cvData.personal.fullName);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);
  };

  return {
    activeTab,
    contactLine,
    cvData,
    isLatexTemplate,
    latexPreview,
    latexPreviewMode,
    selectedTemplate,
    skillsInput,
    themeClass,
    visibleCustomSections,
    addCustomSection,
    addCustomSectionItem,
    addEducation: () => addCollectionItem('education', createEducationItem),
    addExperience: () => addCollectionItem('experiences', createExperienceItem),
    addProject: () => addCollectionItem('projects', createProjectItem),
    handleCustomSectionChange,
    handleCustomSectionItemChange,
    handleDownloadLatex,
    handleDownloadPdf,
    handleEducationChange: (index, field, value) => handleCollectionChange('education', index, field, value),
    handleExperienceChange: (index, field, value) => handleCollectionChange('experiences', index, field, value),
    handlePersonalChange,
    handleProjectChange: (index, field, value) => handleCollectionChange('projects', index, field, value),
    handleSkillsChange,
    handleSummaryChange,
    removeCustomSection,
    removeCustomSectionItem,
    removeEducation: (index) => removeCollectionItem('education', index),
    removeExperience: (index) => removeCollectionItem('experiences', index),
    removeProject: (index) => removeCollectionItem('projects', index),
    setActiveTab,
    setLatexPreviewMode,
  };
};
