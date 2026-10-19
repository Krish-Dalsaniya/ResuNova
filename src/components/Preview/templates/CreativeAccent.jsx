import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon } from '../../Icons';

export default function CreativeAccent({ data, theme, font, spacing }) {
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

  const renderLeftSection = (key) => {
    if (!isVisible(key)) return null;

    if (key === 'summary' && summary) {
      return (
        <section key="summary" className="creative-section">
          <h2 className="creative-title" style={{ color: theme.primary, borderLeftColor: theme.secondary }}>
            About Me
          </h2>
          <p className="summary-text">{summary}</p>
        </section>
      );
    }

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="creative-section">
          <h2 className="creative-title" style={{ color: theme.primary, borderLeftColor: theme.secondary }}>
            Work History
          </h2>
          <div className="creative-entries">
            {experience.map((exp) => (
              <div key={exp.id} className="creative-entry">
                <div className="creative-entry-head">
                  <div>
                    <h3 className="creative-exp-role">{exp.role}</h3>
                    <div className="creative-exp-company" style={{ color: theme.secondary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                  </div>
                  <span className="creative-badge" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="creative-desc">{exp.description}</p>}
                {exp.highlights && (
                  <ul className="bullet-list">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="bullet-point" style={{ color: theme.primary }}>✦</span>
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

    if (key === 'projects' && projects && projects.length > 0) {
      return (
        <section key="projects" className="creative-section">
          <h2 className="creative-title" style={{ color: theme.primary, borderLeftColor: theme.secondary }}>
            Selected Projects
          </h2>
          <div className="creative-projects-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="creative-proj-card" style={{ backgroundColor: theme.bgSidebar, borderColor: theme.accent }}>
                <div className="creative-proj-title">
                  <strong>{proj.name}</strong>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: theme.primary }}>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                {proj.technologies && <div className="creative-proj-tech" style={{ color: theme.primary }}>{proj.technologies}</div>}
                {proj.highlights && (
                  <ul className="bullet-list small-bullets">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="bullet-point" style={{ color: theme.secondary }}>•</span>
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

    // Custom sections
    if (key.startsWith('custom-')) {
      const customSec = customSections.find(c => c.id === key);
      if (!customSec || !customSec.items || customSec.items.length === 0) return null;

      return (
        <section key={customSec.id} className="creative-section">
          <h2 className="creative-title" style={{ color: theme.primary, borderLeftColor: theme.secondary }}>
            {customSec.title || "Additional Section"}
          </h2>
          <div className="creative-entries">
            {customSec.items.map((item) => (
              <div key={item.id} className="creative-entry">
                <div className="creative-entry-head">
                  <div>
                    <h3 className="creative-exp-role">{item.title}</h3>
                    {item.subtitle && (
                      <div className="creative-exp-company" style={{ color: theme.secondary }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  {item.date && (
                    <span className="creative-badge" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && <p className="creative-desc">{item.description}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {item.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>
                        <span className="bullet-point" style={{ color: theme.primary }}>✦</span>
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

  const leftKeys = sectionOrder.filter(k => ['summary', 'experience', 'projects'].includes(k) || k.startsWith('custom-'));

  return (
    <div 
      className="resume-page creative-accent-layout"
      style={{
        fontFamily: font.font,
        color: theme.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Top Banner */}
      <div className="creative-banner" style={{ backgroundColor: theme.primary, color: '#ffffff' }}>
        <div className="creative-banner-inner">
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="creative-avatar-box">
              <img src={personalInfo.avatar} alt={personalInfo.fullName} className="creative-avatar" />
            </div>
          )}
          <div className="creative-header-text">
            <h1 className="creative-name">{personalInfo.fullName || "Your Full Name"}</h1>
            <p className="creative-role" style={{ color: theme.accent }}>{personalInfo.jobTitle || "Creative Professional"}</p>
          </div>
        </div>

        <div className="creative-banner-contacts" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
          {personalInfo.email && <span><Mail size={11} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span><Phone size={11} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span><MapPin size={11} /> {personalInfo.location}</span>}
          {personalInfo.linkedin && <span><LinkedinIcon size={11} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {personalInfo.website && <span><Globe size={11} /> {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      <div className="creative-body-grid">
        {/* Left Column (65%) */}
        <div className="creative-left">
          {leftKeys.map(k => renderLeftSection(k))}
          {customSections
            .filter(c => !leftKeys.includes(c.id) && isVisible(c.id))
            .map(c => renderLeftSection(c.id))}
        </div>

        {/* Right Column (35%) */}
        <div className="creative-right" style={{ backgroundColor: theme.bgSidebar, borderColor: theme.accent }}>
          {isVisible('skills') && skills && skills.length > 0 && (
            <section className="creative-side-block">
              <h3 className="creative-side-title" style={{ color: theme.primary }}>
                Skills & Expertise
              </h3>
              {skills.map((cat, i) => (
                <div key={i} className="creative-skill-cat">
                  <div className="creative-cat-name">{cat.category}</div>
                  <div className="creative-skill-bars">
                    {cat.items?.map((item, ii) => (
                      <div key={ii} className="creative-bar-row">
                        <span>{item.name}</span>
                        <div className="creative-meter-bg">
                          <div 
                            className="creative-meter-fill"
                            style={{ 
                              width: `${(item.level / 5) * 100}%`,
                              backgroundColor: theme.primary 
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {isVisible('education') && education && education.length > 0 && (
            <section className="creative-side-block">
              <h3 className="creative-side-title" style={{ color: theme.primary }}>
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="creative-side-edu">
                  <div className="edu-deg">{edu.degree}</div>
                  <div className="edu-sch" style={{ color: theme.primary }}>{edu.institution}</div>
                  <div className="edu-dates">{edu.startDate} – {edu.endDate}</div>
                  {edu.grade && <div className="edu-gr">{edu.grade}</div>}
                  {edu.honors && <div className="edu-hn">{edu.honors}</div>}
                </div>
              ))}
            </section>
          )}

          {isVisible('certifications') && certifications && certifications.length > 0 && (
            <section className="creative-side-block">
              <h3 className="creative-side-title" style={{ color: theme.primary }}>
                Certifications
              </h3>
              {certifications.map((c) => (
                <div key={c.id} className="creative-cert-item">
                  <div className="c-name">{c.name}</div>
                  <div className="c-meta">{c.issuer} ({c.date})</div>
                </div>
              ))}
            </section>
          )}

          {isVisible('languages') && languages && languages.length > 0 && (
            <section className="creative-side-block">
              <h3 className="creative-side-title" style={{ color: theme.primary }}>
                Languages
              </h3>
              {languages.map((l) => (
                <div key={l.id} className="creative-lang-row">
                  <span>{l.name}</span>
                  <span className="lang-lvl" style={{ color: theme.secondary }}>{l.level}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
