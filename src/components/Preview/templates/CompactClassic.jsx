import React from 'react';

export default function CompactClassic({ data, theme, font, spacing }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

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

      {summary && (
        <section className="classic-section">
          <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
            PROFESSIONAL SUMMARY
          </div>
          <p className="classic-summary-text">{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="classic-section">
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
      )}

      {skills && skills.length > 0 && (
        <section className="classic-section">
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
      )}

      {education && education.length > 0 && (
        <section className="classic-section">
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
      )}

      {projects && projects.length > 0 && (
        <section className="classic-section">
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
      )}

      <div className="classic-footer-row">
        {certifications && certifications.length > 0 && (
          <div className="classic-half">
            <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
              CERTIFICATIONS
            </div>
            {certifications.map(c => (
              <div key={c.id} className="classic-sm-text">
                • {c.name} ({c.issuer}, {c.date})
              </div>
            ))}
          </div>
        )}
        {languages && languages.length > 0 && (
          <div className="classic-half">
            <div className="classic-sec-title" style={{ color: theme.primary, borderBottomColor: theme.secondary }}>
              LANGUAGES
            </div>
            <div className="classic-sm-text">
              {languages.map(l => `${l.name} (${l.level})`).join(" • ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
