import { useMemo, useState } from 'react';
import { COVER_TEMPLATES, CV_TEMPLATES } from '../templateData';

export const useResourcesController = () => {
  const [activeTab, setActiveTab] = useState('cover');
  const [selectedCoverTemplate, setSelectedCoverTemplate] = useState(null);
  const [copiedTemplateId, setCopiedTemplateId] = useState('');

  const templates = useMemo(() => (activeTab === 'cover' ? COVER_TEMPLATES : CV_TEMPLATES), [activeTab]);

  const handleCopyTemplate = async (template) => {
    try {
      await navigator.clipboard.writeText(template.fullText || template.excerpt || template.title);
      setCopiedTemplateId(template.id);
      window.setTimeout(() => {
        setCopiedTemplateId((previousTemplateId) => (previousTemplateId === template.id ? '' : previousTemplateId));
      }, 1400);
    } catch {
      setCopiedTemplateId('');
    }
  };

  return {
    activeTab,
    copiedTemplateId,
    selectedCoverTemplate,
    templates,
    handleCopyTemplate,
    setActiveTab,
    setSelectedCoverTemplate,
  };
};
