import React from 'react';

export default function CompactClassic({ data, theme, font, spacing }) {
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

  const renderSection = (key) => {
    if (!isVisible(key)) return null;

    if (key === 'summary' && summary) {
      return (
        <section key="summary" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            PROFESSIONAL SUMMARY
          </div>
          <p className="classic-summary-text">{summary}</p>
        </section>
      );
    }

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            PROFESSIONAL EXPERIENCE
          </div>
          {experience.map((exp) => (
            <div key={exp.id} className="classic-exp-item">
              <div className="classic-row-between">
                <div>
                  <strong className="classic-role">{exp.role}</strong> — <span className="classic-comp" style={{ color: theme.primary }}>{exp.company}</span>
                  {exp.location && <span className="classic-loc">, {exp.location}</span>}
                </div>
                <div className="classic-dates">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
              </div>
              {exp.description && <div className="classic-desc">{exp.description}</div>}
              {exp.highlights && (
                <ul className="classic-bullets">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      );
    }

    if (key === 'skills' && skills && skills.length > 0) {
      return (
        <section key="skills" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            TECHNICAL & PROFESSIONAL SKILLS
          </div>
          <div className="classic-skills-list">
            {skills.map((cat, i) => (
              <div key={i} className="classic-skill-row">
                <strong>{cat.category}: </strong>
                <span>{cat.items?.map(it => it.name).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'education' && education && education.length > 0) {
      return (
        <section key="education" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            EDUCATION
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="classic-exp-item">
              <div className="classic-row-between">
                <div>
                  <strong>{edu.degree}</strong>, <span style={{ color: theme.primary }}>{edu.institution}</span>
                </div>
                <div className="classic-dates">{edu.startDate} – {edu.endDate}</div>
              </div>
              {(edu.grade || edu.honors) && (
                <div className="classic-desc">
                  {edu.grade && <span>GPA: {edu.grade} </span>}
                  {edu.honors && <span>• {edu.honors}</span>}
                </div>
              )}
            </div>
          ))}
        </section>
      );
    }

    if (key === 'projects' && projects && projects.length > 0) {
      return (
        <section key="projects" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            PROJECTS & CONTRIBUTIONS
          </div>
          {projects.map((proj) => (
            <div key={proj.id} className="classic-exp-item">
              <div className="classic-row-between">
                <div>
                  <strong>{proj.name}</strong> {proj.technologies && <em>({proj.technologies})</em>}
                </div>
                {proj.link && <span className="classic-loc">{proj.link.replace(/^https?:\/\//, '')}</span>}
              </div>
              {proj.highlights && (
                <ul className="classic-bullets">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      );
    }

    if (key === 'certifications' && certifications && certifications.length > 0) {
      return (
        <section key="certifications" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            CERTIFICATIONS
          </div>
          {certifications.map(c => (
            <div key={c.id} className="classic-sm-text" style={{ marginBottom: '4px' }}>
              • <strong>{c.name}</strong> ({c.issuer}, {c.date})
            </div>
          ))}
        </section>
      );
    }

    if (key === 'languages' && languages && languages.length > 0) {
      return (
        <section key="languages" className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            LANGUAGES
          </div>
          <div className="classic-sm-text">
            {languages.map(l => `${l.name} (${l.level})`).join(" • ")}
          </div>
        </section>
      );
    }

    // Custom sections
    if (key.startsWith('custom-')) {
      const customSec = customSections.find(c => c.id === key);
      if (!customSec || !customSec.items || customSec.items.length === 0) return null;

      return (
        <section key={customSec.id} className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            {(customSec.title || "ADDITIONAL SECTION").toUpperCase()}
          </div>
          {customSec.items.map((item) => (
            <div key={item.id} className="classic-exp-item">
              <div className="classic-row-between">
                <div>
                  <strong className="classic-role">{item.title}</strong>
                  {item.subtitle && <span className="classic-comp" style={{ color: theme.primary }}> — {item.subtitle}</span>}
                </div>
                {item.date && <div className="classic-dates">{item.date}</div>}
              </div>
              {item.description && <div className="classic-desc">{item.description}</div>}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="classic-bullets">
                  {item.highlights.filter(Boolean).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      );
    }

    return null;
  };

  return (
    <div 
      className="resume-page compact-classic-layout"
      style={{
        fontFamily: font.font,
        color: theme.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header */}
      <header className="classic-header" style={{ borderBottomColor: theme.primary }}>
        <div className="classic-header-main">
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="classic-avatar-wrap">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.fullName} 
                className="classic-avatar-img"
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}
          <div className="classic-header-text">
            <h1 className="classic-name" style={{ color: theme.primary }}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <div className="classic-subhead" style={{ color: theme.secondary }}>
              {personalInfo.jobTitle}
            </div>
          </div>
        </div>
        <div className="classic-contact-line">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Dynamic Sections */}
      {sectionOrder.map((secKey) => renderSection(secKey))}

      {/* Render any custom sections not in sectionOrder */}
      {customSections
        .filter((c) => !sectionOrder.includes(c.id))
        .map((c) => renderSection(c.id))}
    </div>
  );
}
