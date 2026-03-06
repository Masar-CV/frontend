import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import useProfile from '../../features/profile/hooks/useProfile';
import useSkills from '../../features/profile/hooks/useSkills';
import useExperiences from '../../features/profile/hooks/useExperiences';
import useStatistics from '../../features/profile/hooks/useStatistics';
import ProfileHeader from '../../features/profile/components/ProfileHeader/ProfileHeader';
import AboutSection from '../../features/profile/components/AboutSection/AboutSection';
import ExperienceSection from '../../features/profile/components/ExperienceSection/ExperienceSection';
import EducationSection from '../../features/profile/components/EducationSection/EducationSection';
import SkillsSection from '../../features/profile/components/SkillsSection/SkillsSection';
import StatisticsCard from '../../features/profile/components/StatisticsCard/StatisticsCard';
import QuickActions from '../../features/profile/components/QuickActions/QuickActions';
import './ProfilePage.css';

const ProfilePage = () => {
  const profileHook = useProfile();
  const skillsHook = useSkills();
  const expHook = useExperiences();
  const { statistics } = useStatistics();

  if (profileHook.loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-loading">
          <div className="profile-spinner" />
          <p>Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (profileHook.error) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-error">
          <p>{profileHook.error}</p>
          <button className="edit-profile-btn" style={{ margin: '0 auto' }} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <ProfileHeader
        profile={profileHook.profile}
        isEditing={profileHook.isEditing}
        editForm={profileHook.editForm}
        saving={profileHook.saving}
        saveError={profileHook.saveError}
        onEditOpen={profileHook.openEdit}
        onEditClose={profileHook.closeEdit}
        onFormChange={profileHook.changeEditForm}
        onSave={profileHook.saveProfile}
      />

      <main className="profile-main">
        <div className="profile-container">
          {/* Left Column */}
          <div className="profile-left-column">
            <AboutSection
              about={profileHook.profile?.about}
              isEditing={profileHook.isEditingAbout}
              aboutText={profileHook.aboutText}
              setAboutText={profileHook.setAboutText}
              saving={profileHook.savingAbout}
              error={profileHook.aboutError}
              onEditOpen={profileHook.openAboutEdit}
              onEditClose={profileHook.closeAboutEdit}
              onSave={profileHook.saveAbout}
            />

            <ExperienceSection
              experiences={expHook.experiences}
              isModalOpen={expHook.isModalOpen}
              editingExp={expHook.editingExp}
              form={expHook.form}
              saving={expHook.saving}
              error={expHook.error}
              onAdd={expHook.openAdd}
              onEdit={expHook.openEdit}
              onClose={expHook.closeModal}
              onChange={expHook.changeForm}
              onSave={expHook.save}
              onDelete={expHook.remove}
            />

            <EducationSection />
          </div>

          {/* Right Column */}
          <div className="profile-right-column">
            <SkillsSection
              skills={skillsHook.skills}
              isModalOpen={skillsHook.isModalOpen}
              editingSkill={skillsHook.editingSkill}
              form={skillsHook.form}
              saving={skillsHook.saving}
              error={skillsHook.error}
              onAdd={skillsHook.openAdd}
              onEdit={skillsHook.openEdit}
              onClose={skillsHook.closeModal}
              onChange={skillsHook.changeForm}
              onSave={skillsHook.save}
              onDelete={skillsHook.remove}
            />

            <StatisticsCard statistics={statistics} />
            <QuickActions />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
