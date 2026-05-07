import CustomSectionsForm from './CustomSectionsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PersonalForm from './PersonalForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import SummaryForm from './SummaryForm';

const FormRenderer = (props) => {
  if (props.activeTab === 'summary') {
    return <SummaryForm summary={props.cvData.summary} onSummaryChange={props.handleSummaryChange} />;
  }

  if (props.activeTab === 'experience') {
    return (
      <ExperienceForm
        experiences={props.cvData.experiences}
        onAddExperience={props.addExperience}
        onExperienceChange={props.handleExperienceChange}
        onRemoveExperience={props.removeExperience}
      />
    );
  }

  if (props.activeTab === 'education') {
    return (
      <EducationForm
        education={props.cvData.education}
        onAddEducation={props.addEducation}
        onEducationChange={props.handleEducationChange}
        onRemoveEducation={props.removeEducation}
      />
    );
  }

  if (props.activeTab === 'skills') {
    return (
      <SkillsForm
        skills={props.cvData.skills}
        skillsInput={props.skillsInput}
        onSkillsChange={props.handleSkillsChange}
      />
    );
  }

  if (props.activeTab === 'projects') {
    return (
      <ProjectsForm
        projects={props.cvData.projects}
        onAddProject={props.addProject}
        onProjectChange={props.handleProjectChange}
        onRemoveProject={props.removeProject}
      />
    );
  }

  if (props.activeTab === 'custom') {
    return (
      <CustomSectionsForm
        customSections={props.cvData.customSections}
        onAddCustomSection={props.addCustomSection}
        onAddCustomSectionItem={props.addCustomSectionItem}
        onCustomSectionChange={props.handleCustomSectionChange}
        onCustomSectionItemChange={props.handleCustomSectionItemChange}
        onRemoveCustomSection={props.removeCustomSection}
        onRemoveCustomSectionItem={props.removeCustomSectionItem}
      />
    );
  }

  return <PersonalForm personal={props.cvData.personal} onPersonalChange={props.handlePersonalChange} />;
};

export default FormRenderer;
