import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';

export default function MinimalClean({ data, theme, font, spacing }) {
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
        <section key="summary" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>
            Summary
          </h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <p className="summary-text">{summary}</p>
        </section>
      );
    }

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>
            Experience
          </h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-entries">
            {experience.map((exp) => (
              <div key={exp.id} className="minimal-entry">
                <div className="minimal-entry-header">
                  <div>
                    <strong className="minimal-entry-role">{exp.role}</strong>
                    <span className="minimal-entry-company" style={{ color: theme.primary }}> — {exp.company}</span>
                    {exp.location && <span className="minimal-entry-loc">, {exp.location}</span>}
                  </div>
                  <span className="minimal-date-badge">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="minimal-desc">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>
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

    if (key === 'skills' && skills && skills.length > 0) {
      return (
        <section key="skills" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>
            Key Skills & Competencies
          </h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-skills-grid">
            {skills.map((cat, idx) => (
              <div key={idx} className="minimal-skill-item">
                <strong style={{ color: theme.primary }}>{cat.category}: </strong>
                <span>{cat.items?.map(it => it.name).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'education' && education && education.length > 0) {
      return (
        <section key="education" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>
            Education
          </h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-entries">
            {education.map((edu) => (
              <div key={edu.id} className="minimal-entry">
                <div className="minimal-entry-header">
                  <div>
                    <strong className="minimal-entry-role">{edu.degree}</strong>
                    <span className="minimal-entry-company" style={{ color: theme.primary }}> — {edu.institution}</span>
                    {edu.location && <span>, {edu.location}</span>}
                  </div>
                  <span className="minimal-date-badge">{edu.startDate} – {edu.endDate}</span>
                </div>
                {(edu.grade || edu.honors) && (
                  <p className="minimal-desc">
                    {edu.grade && <span>{edu.grade} </span>}
                    {edu.honors && <span>• {edu.honors}</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'projects' && projects && projects.length > 0) {
      return (
        <section key="projects" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>
            Projects
          </h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-entries">
            {projects.map((proj) => (
              <div key={proj.id} className="minimal-entry">
                <div className="minimal-entry-header">
                  <div>
                    <strong className="minimal-entry-role">{proj.name}</strong>
                    {proj.technologies && <span className="minimal-tech" style={{ color: theme.secondary }}> ({proj.technologies})</span>}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: theme.primary }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>
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
        <section key="certifications" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>Certifications</h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-entries">
            {certifications.map((c) => (
              <div key={c.id} className="minimal-sm-item" style={{ marginBottom: '6px' }}>
                <strong>{c.name}</strong> — {c.issuer} ({c.date})
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'languages' && languages && languages.length > 0) {
      return (
        <section key="languages" className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>Languages</h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-lang-wrap">
            {languages.map((l) => (
              <span key={l.id} className="minimal-lang-pill" style={{ borderColor: theme.accent, backgroundColor: theme.bgSidebar }}>
                {l.name} <em style={{ color: theme.secondary }}>({l.level})</em>
              </span>
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
        <section key={customSec.id} className="minimal-section">
          <h2 className="minimal-section-title" style={{ color: theme.primary }}>
            {customSec.title || "Additional Section"}
          </h2>
          <div className="minimal-title-underline" style={{ backgroundColor: theme.primary }} />
          <div className="minimal-entries">
            {customSec.items.map((item) => (
              <div key={item.id} className="minimal-entry">
                <div className="minimal-entry-header">
                  <div>
                    <strong className="minimal-entry-role">{item.title}</strong>
                    {item.subtitle && <span className="minimal-entry-company" style={{ color: theme.primary }}> — {item.subtitle}</span>}
                  </div>
                  {item.date && <span className="minimal-date-badge">{item.date}</span>}
                </div>
                {item.description && <p className="minimal-desc">{item.description}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {item.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>
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

    return null;
  };

  return (
    <div 
      className="resume-page minimal-clean-layout"
      style={{
        fontFamily: font.font,
        color: theme.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Top Header */}
      <header className="minimal-header" style={{ borderBottomColor: theme.primary }}>
        <div className="minimal-header-main">
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="minimal-avatar-wrap">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.fullName} 
                className="minimal-avatar-img"
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}
          <div className="minimal-titles">
            <h1 className="minimal-name" style={{ color: theme.primary }}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="minimal-role" style={{ color: theme.secondary }}>
              {personalInfo.jobTitle || "Your Professional Title"}
            </p>
          </div>
        </div>

        {/* Contact Links Row */}
        <div className="minimal-contact-row">
          {personalInfo.email && (
            <span>
              <Mail size={12} style={{ color: theme.primary }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span>
              <Phone size={12} style={{ color: theme.primary }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span>
              <MapPin size={12} style={{ color: theme.primary }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span>
              <Globe size={12} style={{ color: theme.primary }} /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              <LinkedinIcon size={12} style={{ color: theme.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {personalInfo.github && (
            <span>
              <GithubIcon size={12} style={{ color: theme.primary }} /> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
        </div>
      </header>

      {/* Render sections in specified order */}
      {sectionOrder.map((secKey) => renderSection(secKey))}

      {/* Render any custom sections not in sectionOrder */}
      {customSections
        .filter((c) => !sectionOrder.includes(c.id))
        .map((c) => renderSection(c.id))}
    </div>
  );
}
