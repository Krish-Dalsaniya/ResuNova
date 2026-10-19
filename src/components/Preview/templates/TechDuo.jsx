import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Code2, Terminal, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';

export default function TechDuo({ data, theme, font, spacing }) {
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

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="tech-block">
          <h2 className="tech-block-title" style={{ color: theme.primary }}>
            <Terminal size={14} className="inline-icon" /> Work Experience
          </h2>
          <div className="tech-timeline">
            {experience.map((exp) => (
              <div key={exp.id} className="tech-exp-card" style={{ borderLeftColor: theme.secondary }}>
                <div className="tech-exp-header">
                  <div>
                    <h3 className="tech-role">{exp.role}</h3>
                    <div className="tech-company" style={{ color: theme.primary }}>{exp.company}</div>
                  </div>
                  <span className="tech-dates" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="tech-desc">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="bullet-point" style={{ color: theme.secondary }}>▹</span>
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
        <section key="projects" className="tech-block">
          <h2 className="tech-block-title" style={{ color: theme.primary }}>
            <Code2 size={14} className="inline-icon" /> Featured Projects
          </h2>
          <div className="tech-projects-list">
            {projects.map((proj) => (
              <div key={proj.id} className="tech-proj-item" style={{ borderColor: theme.accent }}>
                <div className="tech-proj-top">
                  <strong className="tech-proj-name">{proj.name}</strong>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: theme.primary }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <div className="tech-pill-row">
                    {proj.technologies.split(',').map((t, tidx) => (
                      <span key={tidx} className="tech-badge" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {proj.highlights && (
                  <ul className="bullet-list small-bullets">
                    {proj.highlights.map((h, hi) => (
                      <li key={hi}>
                        <span className="bullet-point" style={{ color: theme.secondary }}>-</span>
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

    if (key.startsWith('custom-')) {
      const customSec = customSections.find(c => c.id === key);
      if (!customSec || !customSec.items || customSec.items.length === 0) return null;

      return (
        <section key={customSec.id} className="tech-block">
          <h2 className="tech-block-title" style={{ color: theme.primary }}>
            <Sparkles size={14} className="inline-icon" /> {customSec.title || "Additional Section"}
          </h2>
          <div className="tech-timeline">
            {customSec.items.map((item) => (
              <div key={item.id} className="tech-exp-card" style={{ borderLeftColor: theme.secondary }}>
                <div className="tech-exp-header">
                  <div>
                    <h3 className="tech-role">{item.title}</h3>
                    {item.subtitle && <div className="tech-company" style={{ color: theme.primary }}>{item.subtitle}</div>}
                  </div>
                  {item.date && (
                    <span className="tech-dates" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && <p className="tech-desc">{item.description}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="bullet-list">
                    {item.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>
                        <span className="bullet-point" style={{ color: theme.secondary }}>▹</span>
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

  const leftKeys = sectionOrder.filter(k => ['experience', 'projects'].includes(k) || k.startsWith('custom-'));

  return (
    <div 
      className="resume-page tech-duo-layout"
      style={{
        fontFamily: font.font,
        color: theme.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Modern Tech Header */}
      <header className="tech-header" style={{ borderColor: theme.primary }}>
        <div className="tech-header-left">
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="tech-avatar-wrap">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.fullName} 
                className="tech-avatar-img"
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}
          <div className="tech-header-text-block">
            <div className="tech-name-badge">
              <h1 className="tech-name" style={{ color: theme.primary }}>
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              <span className="tech-role-tag" style={{ backgroundColor: theme.primary, color: '#ffffff' }}>
                {personalInfo.jobTitle || "Software Engineer"}
              </span>
            </div>
            {isVisible('summary') && summary && <p className="tech-summary-text">{summary}</p>}
          </div>
        </div>

        <div className="tech-header-right" style={{ backgroundColor: theme.bgSidebar, borderColor: theme.accent }}>
          {personalInfo.email && (
            <div className="tech-contact-item">
              <Mail size={12} style={{ color: theme.primary }} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="tech-contact-item">
              <Phone size={12} style={{ color: theme.primary }} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="tech-contact-item">
              <MapPin size={12} style={{ color: theme.primary }} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.github && (
            <div className="tech-contact-item">
              <GithubIcon size={12} style={{ color: theme.primary }} /> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="tech-contact-item">
              <LinkedinIcon size={12} style={{ color: theme.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
          )}
          {personalInfo.website && (
            <div className="tech-contact-item">
              <Globe size={12} style={{ color: theme.primary }} /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </div>
          )}
        </div>
      </header>

      {/* Dual Column Grid */}
      <div className="tech-duo-body">
        {/* Main Col: Experience & Projects */}
        <div className="tech-left-col">
          {leftKeys.map(k => renderLeftSection(k))}
          {customSections
            .filter(c => !leftKeys.includes(c.id) && isVisible(c.id))
            .map(c => renderLeftSection(c.id))}
        </div>

        {/* Right Col: Skills & Education */}
        <div className="tech-right-col">
          {isVisible('skills') && skills && skills.length > 0 && (
            <section className="tech-block">
              <h2 className="tech-block-title" style={{ color: theme.primary }}>
                Skills & Tech Stack
              </h2>
              <div className="tech-skills-box">
                {skills.map((cat, i) => (
                  <div key={i} className="tech-skill-group">
                    <h4 className="tech-skill-cat">{cat.category}</h4>
                    <div className="tech-skill-tags">
                      {cat.items?.map((item, ii) => (
                        <span 
                          key={ii} 
                          className="tech-tag"
                          style={{ borderColor: theme.accent, backgroundColor: theme.bgSidebar, color: theme.text }}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isVisible('education') && education && education.length > 0 && (
            <section className="tech-block">
              <h2 className="tech-block-title" style={{ color: theme.primary }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="tech-edu-card" style={{ backgroundColor: theme.bgSidebar, borderColor: theme.accent }}>
                  <div className="edu-degree" style={{ color: theme.primary }}>{edu.degree}</div>
                  <div className="edu-institution">{edu.institution}</div>
                  <div className="edu-dates">{edu.startDate} – {edu.endDate}</div>
                  {edu.grade && <div className="edu-grade">{edu.grade}</div>}
                  {edu.honors && <div className="edu-honors">{edu.honors}</div>}
                </div>
              ))}
            </section>
          )}

          {isVisible('certifications') && certifications && certifications.length > 0 && (
            <section className="tech-block">
              <h2 className="tech-block-title" style={{ color: theme.primary }}>
                Certifications
              </h2>
              <div className="tech-cert-list">
                {certifications.map((c) => (
                  <div key={c.id} className="tech-cert-pill" style={{ borderColor: theme.accent }}>
                    <strong>{c.name}</strong>
                    <div className="tech-cert-meta">{c.issuer} • {c.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isVisible('languages') && languages && languages.length > 0 && (
            <section className="tech-block">
              <h2 className="tech-block-title" style={{ color: theme.primary }}>
                Languages
              </h2>
              <div className="tech-lang-row">
                {languages.map((l) => (
                  <div key={l.id} className="tech-lang-chip">
                    <span className="lang-n">{l.name}</span>
                    <span className="lang-l" style={{ color: theme.secondary }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
