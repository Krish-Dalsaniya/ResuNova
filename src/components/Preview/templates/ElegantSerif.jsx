import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';

export default function ElegantSerif({ data, theme, font, spacing }) {
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
        <section key="summary" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Executive Profile</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <p className="elegant-summary-body">{summary}</p>
        </section>
      );
    }

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Professional Experience</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-entries">
            {experience.map((exp) => (
              <div key={exp.id} className="elegant-entry">
                <div className="elegant-entry-top">
                  <div>
                    <h3 className="elegant-role">{exp.role}</h3>
                    <div className="elegant-company" style={{ color: theme?.secondary }}>
                      <strong>{exp.company}</strong> {exp.location && <span>— {exp.location}</span>}
                    </div>
                  </div>
                  <div className="elegant-dates" style={{ color: theme?.primary }}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                {exp.description && <p className="elegant-desc">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="elegant-bullets">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
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
        <section key="skills" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Areas of Expertise</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-skills-matrix">
            {skills.map((cat, i) => (
              <div key={i} className="elegant-skill-group">
                <strong className="elegant-cat-label" style={{ color: theme?.primary }}>{cat.category}: </strong>
                <span>{cat.items?.map(it => it.name).join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'education' && education && education.length > 0) {
      return (
        <section key="education" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Academic Background</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-entries">
            {education.map((edu) => (
              <div key={edu.id} className="elegant-entry">
                <div className="elegant-entry-top">
                  <div>
                    <h3 className="elegant-role">{edu.degree}</h3>
                    <div className="elegant-company" style={{ color: theme?.secondary }}>
                      <strong>{edu.institution}</strong> {edu.location && <span>— {edu.location}</span>}
                    </div>
                  </div>
                  <div className="elegant-dates" style={{ color: theme?.primary }}>
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                {(edu.grade || edu.honors) && (
                  <p className="elegant-desc">
                    {edu.grade && <span>Honors: {edu.grade} </span>}
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
        <section key="projects" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Key Initiatives & Works</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-entries">
            {projects.map((proj) => (
              <div key={proj.id} className="elegant-entry">
                <div className="elegant-entry-top">
                  <div>
                    <h3 className="elegant-role">{proj.name}</h3>
                    {proj.technologies && <span className="elegant-company"> ({proj.technologies})</span>}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: theme?.primary }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="elegant-bullets">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
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
        <section key="certifications" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Credentials & Accreditations</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-dual-grid">
            {certifications.map((c) => (
              <div key={c.id} className="elegant-mini-item">
                <strong>{c.name}</strong> — {c.issuer} ({c.date})
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'languages' && languages && languages.length > 0) {
      return (
        <section key="languages" className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Languages</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-dual-grid">
            {languages.map((l) => (
              <div key={l.id} className="elegant-mini-item">
                <strong>{l.name}</strong>: {l.level}
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
        <section key={customSec.id} className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">{customSec.title || "Additional Section"}</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-entries">
            {customSec.items.map((item) => (
              <div key={item.id} className="elegant-entry">
                <div className="elegant-entry-top">
                  <div>
                    <h3 className="elegant-role">{item.title}</h3>
                    {item.subtitle && (
                      <div className="elegant-company" style={{ color: theme?.secondary }}>
                        <strong>{item.subtitle}</strong>
                      </div>
                    )}
                  </div>
                  {item.date && (
                    <div className="elegant-dates" style={{ color: theme?.primary }}>
                      {item.date}
                    </div>
                  )}
                </div>
                {item.description && <p className="elegant-desc">{item.description}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="elegant-bullets">
                    {item.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>{h}</li>
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
      className="resume-page elegant-serif-layout"
      style={{
        fontFamily: font?.font,
        color: theme?.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Decorative Top Border Line */}
      <div className="elegant-top-accent" style={{ backgroundColor: theme?.primary }} />

      {/* Header */}
      <header className="elegant-header" style={{ borderBottomColor: theme?.accent }}>
        {personalInfo.showAvatar && personalInfo.avatar && (
          <div className="elegant-avatar-frame">
            <img 
              src={personalInfo.avatar} 
              alt={personalInfo.fullName || "Profile"} 
              className="elegant-avatar-img"
              style={{ borderColor: theme?.primary }}
            />
          </div>
        )}
        <h1 className="elegant-name" style={{ color: theme?.primary }}>
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="elegant-title" style={{ color: theme?.secondary }}>
          {personalInfo.jobTitle || "Professional Title"}
        </p>

        {/* Contact Links */}
        <div className="elegant-contact-bar">
          {personalInfo.email && (
            <span><Mail size={11} style={{ color: theme?.primary }} /> {personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span>• <Phone size={11} style={{ color: theme?.primary }} /> {personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span>• <MapPin size={11} style={{ color: theme?.primary }} /> {personalInfo.location}</span>
          )}
          {personalInfo.linkedin && (
            <span>• <LinkedinIcon size={11} style={{ color: theme?.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.github && (
            <span>• <GithubIcon size={11} style={{ color: theme?.primary }} /> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.website && (
            <span>• <Globe size={11} style={{ color: theme?.primary }} /> {personalInfo.website.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </header>

      {/* Render sections in order */}
      {sectionOrder.map((secKey) => renderSection(secKey))}

      {/* Render any custom sections not in sectionOrder */}
      {customSections
        .filter((c) => !sectionOrder.includes(c.id))
        .map((c) => renderSection(c.id))}
    </div>
  );
}
