import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';

export default function ModernExecutive({ data, theme, font, spacing }) {
  const { 
    personalInfo = {}, 
    summary = "", 
    experience = [], 
    education = [], 
    skills = [], 
    projects = [], 
    certifications = [], 
    languages = [],
    customSections = [],
    sectionOrder = ['summary', 'experience', 'projects', 'skills', 'education', 'certifications', 'languages'],
    sectionSettings = {}
  } = data || {};

  const isVisible = (secKey) => sectionSettings[secKey]?.visible !== false;

  // Helper to render main content sections
  const renderMainSection = (key) => {
    if (!isVisible(key)) return null;

    if (key === 'summary' && summary) {
      return (
        <section key="summary" className="main-section">
          <h2 className="section-title" style={{ color: theme.primary, borderBottomColor: theme.accent }}>
            Professional Summary
          </h2>
          <p className="summary-text">{summary}</p>
        </section>
      );
    }

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="main-section">
          <h2 className="section-title" style={{ color: theme.primary, borderBottomColor: theme.accent }}>
            Work Experience
          </h2>
          <div className="timeline-list">
            {experience.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot" style={{ backgroundColor: theme.primary }} />
                <div className="timeline-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && <span>• {exp.location}</span>}
                    </div>
                  </div>
                  <span className="exp-dates" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                    <Calendar size={11} className="inline-icon" />
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>

                {exp.description && <p className="exp-desc">{exp.description}</p>}

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx}>
                        <span className="bullet-point" style={{ color: theme.primary }}>▸</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'projects' && projects && projects.length > 0) {
      return (
        <section key="projects" className="main-section">
          <h2 className="section-title" style={{ color: theme.primary, borderBottomColor: theme.accent }}>
            Key Projects
          </h2>
          <div className="projects-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="project-card" style={{ borderColor: theme.accent }}>
                <div className="project-card-header">
                  <h3 className="project-title">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: theme.primary }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <div className="project-tech" style={{ color: theme.secondary }}>
                    {proj.technologies}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="bullet-list small-bullets">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>
                        <span className="bullet-point" style={{ color: theme.primary }}>•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'certifications' && certifications && certifications.length > 0) {
      return (
        <section key="certifications" className="main-section">
          <h2 className="section-title" style={{ color: theme.primary, borderBottomColor: theme.accent }}>
            Certifications
          </h2>
          <div className="cert-list">
            {certifications.map((cert) => (
              <div key={cert.id} className="cert-row">
                <div>
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-issuer"> — {cert.issuer}</span>
                </div>
                <span className="cert-date">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // Custom sections
    if (key.startsWith('custom-')) {
      const customSec = customSections.find(c => c.id === key);
      if (!customSec || !customSec.items || customSec.items.length === 0) return null;

      return (
        <section key={customSec.id} className="main-section">
          <h2 className="section-title" style={{ color: theme.primary, borderBottomColor: theme.accent }}>
            {customSec.title || "Additional Section"}
          </h2>
          <div className="timeline-list">
            {customSec.items.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot" style={{ backgroundColor: theme.primary }} />
                <div className="timeline-header">
                  <div>
                    <h3 className="exp-role">{item.title}</h3>
                    {item.subtitle && (
                      <div className="exp-company" style={{ color: theme.primary }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  {item.date && (
                    <span className="exp-dates" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && <p className="exp-desc">{item.description}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {item.highlights.filter(Boolean).map((h, hIdx) => (
                      <li key={hIdx}>
                        <span className="bullet-point" style={{ color: theme.primary }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    return null;
  };

  // Main column section keys in preferred order
  const mainKeys = sectionOrder.filter(k => 
    ['summary', 'experience', 'projects', 'certifications'].includes(k) || k.startsWith('custom-')
  );

  return (
    <div 
      className="resume-page modern-executive-layout"
      style={{
        fontFamily: font?.font,
        color: theme?.text,
        backgroundColor: '#ffffff'
      }}
    >
      <div className="executive-grid">
        {/* Left Sidebar */}
        <aside 
          className="executive-sidebar"
          style={{ backgroundColor: theme?.bgSidebar, borderColor: theme?.accent }}
        >
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="avatar-wrapper">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.fullName} 
                className="resume-avatar"
                style={{ borderColor: theme?.primary }}
              />
            </div>
          )}

          {/* Contact Details */}
          <div className="sidebar-section">
            <h3 className="sidebar-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
              Contact
            </h3>
            <ul className="contact-list">
              {personalInfo.email && (
                <li>
                  <Mail size={13} style={{ color: theme?.primary }} />
                  <span>{personalInfo.email}</span>
                </li>
              )}
              {personalInfo.phone && (
                <li>
                  <Phone size={13} style={{ color: theme?.primary }} />
                  <span>{personalInfo.phone}</span>
                </li>
              )}
              {personalInfo.location && (
                <li>
                  <MapPin size={13} style={{ color: theme?.primary }} />
                  <span>{personalInfo.location}</span>
                </li>
              )}
              {personalInfo.website && (
                <li>
                  <Globe size={13} style={{ color: theme?.primary }} />
                  <a href={personalInfo.website} target="_blank" rel="noreferrer">
                    {personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
              {personalInfo.linkedin && (
                <li>
                  <LinkedinIcon size={13} style={{ color: theme?.primary }} />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </li>
              )}
              {personalInfo.github && (
                <li>
                  <GithubIcon size={13} style={{ color: theme?.primary }} />
                  <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Skills in Sidebar */}
          {isVisible('skills') && skills && skills.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Skills
              </h3>
              <div className="skills-container">
                {skills.map((cat, idx) => (
                  <div key={idx} className="skill-category-block">
                    {cat.category && <h4 className="skill-cat-title">{cat.category}</h4>}
                    <div className="skill-items-list">
                      {cat.items && cat.items.map((skill, sIdx) => (
                        <div 
                          key={sIdx} 
                          className="skill-pill-item"
                          style={{ 
                            backgroundColor: `${theme?.primary}10`,
                            borderColor: `${theme?.primary}25`,
                            color: '#1e293b'
                          }}
                        >
                          <span className="skill-pill-name">{skill.name}</span>
                          {skill.level && (
                            <div className="skill-level-dots" title={`Proficiency: ${skill.level}/5`}>
                              {[1, 2, 3, 4, 5].map((dot) => (
                                <span 
                                  key={dot} 
                                  className={`rating-dot ${dot <= skill.level ? 'filled' : ''}`}
                                  style={{ backgroundColor: dot <= skill.level ? theme?.primary : '#cbd5e1' }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {isVisible('education') && education && education.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Education
              </h3>
              <div className="edu-list">
                {education.map((edu) => (
                  <div key={edu.id} className="sidebar-edu-item">
                    <div className="edu-degree" style={{ color: theme?.text }}>{edu.degree}</div>
                    <div className="edu-institution" style={{ color: theme?.primary }}>{edu.institution}</div>
                    <div className="edu-dates">
                      {edu.startDate} – {edu.endDate}
                    </div>
                    {edu.grade && <div className="edu-grade">{edu.grade}</div>}
                    {edu.honors && <div className="edu-honors">{edu.honors}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages in Sidebar */}
          {isVisible('languages') && languages && languages.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Languages
              </h3>
              <div className="lang-list">
                {languages.map((lang) => (
                  <div key={lang.id} className="lang-row">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level" style={{ color: theme?.secondary }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="executive-main">
          {/* Header */}
          <header className="resume-header">
            <h1 className="resume-name" style={{ color: theme?.primary }}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="resume-job-title" style={{ color: theme?.secondary }}>
              {personalInfo.jobTitle || "Your Professional Title"}
            </p>
          </header>

          {/* Dynamic main sections */}
          {mainKeys.map(k => renderMainSection(k))}

          {/* Render any custom sections not in mainKeys */}
          {customSections
            .filter(c => !mainKeys.includes(c.id) && isVisible(c.id))
            .map(c => renderMainSection(c.id))}
        </main>
      </div>
    </div>
  );
}
