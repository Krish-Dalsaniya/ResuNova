import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';

export default function ModernExecutive({ data, theme, font, spacing }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

  const spacingClasses = {
    compact: { gap: '10px', itemGap: '8px', padding: '24px' },
    balanced: { gap: '16px', itemGap: '12px', padding: '32px' },
    spacious: { gap: '22px', itemGap: '16px', padding: '40px' }
  }[spacing] || { gap: '16px', itemGap: '12px', padding: '32px' };

  return (
    <div 
      className="resume-page modern-executive-layout"
      style={{
        fontFamily: font.font,
        color: theme.text,
        backgroundColor: '#ffffff'
      }}
    >
      <div className="executive-grid">
        {/* Left Sidebar */}
        <aside 
          className="executive-sidebar"
          style={{ backgroundColor: theme.bgSidebar, borderColor: theme.accent }}
        >
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="avatar-wrapper">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.fullName} 
                className="resume-avatar"
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}

          {/* Contact Details */}
          <div className="sidebar-section">
            <h3 className="sidebar-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
              Contact
            </h3>
            <ul className="contact-list">
              {personalInfo.email && (
                <li>
                  <Mail size={13} style={{ color: theme.primary }} />
                  <span>{personalInfo.email}</span>
                </li>
              )}
              {personalInfo.phone && (
                <li>
                  <Phone size={13} style={{ color: theme.primary }} />
                  <span>{personalInfo.phone}</span>
                </li>
              )}
              {personalInfo.location && (
                <li>
                  <MapPin size={13} style={{ color: theme.primary }} />
                  <span>{personalInfo.location}</span>
                </li>
              )}
              {personalInfo.website && (
                <li>
                  <Globe size={13} style={{ color: theme.primary }} />
                  <a href={personalInfo.website} target="_blank" rel="noreferrer">
                    {personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
              {personalInfo.linkedin && (
                <li>
                  <LinkedinIcon size={13} style={{ color: theme.primary }} />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </li>
              )}
              {personalInfo.github && (
                <li>
                  <GithubIcon size={13} style={{ color: theme.primary }} />
                  <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
                Skills
              </h3>
              <div className="skills-container">
                {skills.map((cat, idx) => (
                  <div key={idx} className="skill-category-block">
                    {cat.category && <h4 className="skill-cat-title">{cat.category}</h4>}
                    <div className="skill-items-list">
                      {cat.items && cat.items.map((skill, sIdx) => (
                        <div key={sIdx} className="skill-row">
                          <span className="skill-name">{skill.name}</span>
                          {skill.level && (
                            <div className="skill-bar-track">
                              <div 
                                className="skill-bar-fill"
                                style={{ 
                                  width: `${(skill.level / 5) * 100}%`,
                                  backgroundColor: theme.primary 
                                }}
                              />
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
          {education && education.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
                Education
              </h3>
              <div className="edu-list">
                {education.map((edu) => (
                  <div key={edu.id} className="sidebar-edu-item">
                    <div className="edu-degree" style={{ color: theme.text }}>{edu.degree}</div>
                    <div className="edu-institution" style={{ color: theme.primary }}>{edu.institution}</div>
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

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
                Languages
              </h3>
              <div className="lang-list">
                {languages.map((lang) => (
                  <div key={lang.id} className="lang-row">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level" style={{ color: theme.secondary }}>{lang.level}</span>
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
            <h1 className="resume-name" style={{ color: theme.primary }}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="resume-job-title" style={{ color: theme.secondary }}>
              {personalInfo.jobTitle || "Your Professional Title"}
            </p>
          </header>

          {/* Summary */}
          {summary && (
            <section className="main-section">
              <h2 className="section-title" style={{ color: theme.primary, borderBottomColor: theme.accent }}>
                Professional Summary
              </h2>
              <p className="summary-text">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="main-section">
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
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="main-section">
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
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="main-section">
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
          )}
        </main>
      </div>
    </div>
  );
}
