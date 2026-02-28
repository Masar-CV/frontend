import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Profile.css';

const Profile = () => {
  const [profileData] = useState({
    name: 'Ahmed Hassan',
    title: 'Senior Software Engineer',
    email: 'ahmed.hassan@email.com',
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia',
    about: 'Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Looking to leverage my skills in innovative projects that make a difference.',
    experience: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        period: '2021 - Present',
        description: 'Leading development of enterprise web applications using React and Node.js. Mentoring junior developers and implementing best practices.'
      },
      {
        id: 2,
        title: 'Software Engineer',
        company: 'Digital Innovations',
        period: '2018 - 2021',
        description: 'Developed and maintained multiple client-facing applications. Collaborated with cross-functional teams to deliver high-quality software solutions.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Computer Science',
        institution: 'King Saud University',
        year: '2018',
        gpa: '3.8/4.0'
      },
      {
        id: 2,
        degree: 'Master of Software Engineering',
        institution: 'King Fahd University',
        year: '2020',
        gpa: '3.9/4.0'
      }
    ],
    skills: [
      { name: 'React', level: 'Expert', percentage: 95 },
      { name: 'TypeScript', level: 'Expert', percentage: 90 },
      { name: 'Node.js', level: 'Advanced', percentage: 85 },
      { name: 'Python', level: 'Advanced', percentage: 80 },
      { name: 'AWS', level: 'Intermediate', percentage: 65 },
      { name: 'Docker', level: 'Advanced', percentage: 75 },
      { name: 'MongoDB', level: 'Advanced', percentage: 78 },
      { name: 'PostgreSQL', level: 'Expert', percentage: 88 }
    ],
    stats: {
      profileCompletion: 95,
      applications: 24,
      interviews: 8,
      cvDownloads: 12
    }
  });

  const EditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return '#2563eb';
      case 'Advanced': return '#3b82f6';
      case 'Intermediate': return '#60a5fa';
      default: return '#93c5fd';
    }
  };

  return (
    <div className="profile-page">
      <Navbar />

      {/* Profile Header */}
      <section className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-title">{profileData.title}</p>
            <div className="profile-contact">
              <span className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {profileData.email}
              </span>
              <span className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {profileData.phone}
              </span>
              <span className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {profileData.location}
              </span>
            </div>
          </div>
          <button className="edit-profile-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-container">
          {/* Left Column */}
          <div className="profile-left-column">
            {/* About Section */}
            <div className="profile-card">
              <div className="card-header">
                <h2 className="card-title">About</h2>
                <button className="card-edit-btn">
                  <EditIcon />
                </button>
              </div>
              <p className="about-text">{profileData.about}</p>
            </div>

            {/* Experience Section */}
            <div className="profile-card">
              <div className="card-header">
                <h2 className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  Experience
                </h2>
                <button className="card-edit-btn">
                  <EditIcon />
                </button>
              </div>
              <div className="experience-list">
                {profileData.experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <h3 className="exp-title">{exp.title}</h3>
                    <Link to="#" className="exp-company">{exp.company}</Link>
                    <p className="exp-period">{exp.period}</p>
                    <p className="exp-description">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="profile-card">
              <div className="card-header">
                <h2 className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  Education
                </h2>
                <button className="card-edit-btn">
                  <EditIcon />
                </button>
              </div>
              <div className="education-list">
                {profileData.education.map((edu) => (
                  <div key={edu.id} className="education-item">
                    <div className="edu-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div className="edu-content">
                      <h3 className="edu-degree">{edu.degree}</h3>
                      <p className="edu-institution">{edu.institution}</p>
                      <p className="edu-details">
                        <span>{edu.year}</span>
                        <span className="edu-separator">GPA:</span>
                        <span>{edu.gpa}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="profile-right-column">
            {/* Skills Section */}
            <div className="profile-card">
              <div className="card-header">
                <h2 className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Skills
                </h2>
                <button className="card-edit-btn">
                  <EditIcon />
                </button>
              </div>
              <div className="skills-list">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level" style={{ color: getSkillLevelColor(skill.level) }}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ 
                          width: `${skill.percentage}%`,
                          backgroundColor: getSkillLevelColor(skill.level)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Statistics */}
            <div className="profile-card">
              <h2 className="card-title">Profile Statistics</h2>
              <div className="stats-section">
                <div className="stat-item completion">
                  <div className="stat-header">
                    <span className="stat-label">Profile Completion</span>
                    <span className="stat-value completion-value">{profileData.stats.profileCompletion}%</span>
                  </div>
                  <div className="completion-bar">
                    <div 
                      className="completion-progress" 
                      style={{ width: `${profileData.stats.profileCompletion}%` }}
                    />
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Applications</span>
                  <span className="stat-value">{profileData.stats.applications}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Interviews</span>
                  <span className="stat-value">{profileData.stats.interviews}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">CV Downloads</span>
                  <span className="stat-value">{profileData.stats.cvDownloads}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="profile-card">
              <h2 className="card-title">Quick Actions</h2>
              <div className="quick-actions">
                <button className="action-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </button>
                <button className="action-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email Preferences
                </button>
                <button className="action-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Certifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
