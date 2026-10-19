import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';

const getTechList = (tech) => {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  if (typeof tech === 'string') return tech.split(',').map(s => s.trim()).filter(Boolean);
  return [];
};

const getSkillName = (item) => {
  if (!item) return '';
  if (typeof item === 'object') return item.name || '';
  return String(item);
};

export default function GraduateSidebar({ data, theme, font, spacing }) {
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

  const renderMainSection = (key) => {
    if (!isVisible(key)) return null;

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="graduate-sec">
          <h2 className="graduate-sec-title" style={{ color: theme?.primary, borderLeftColor: theme?.secondary }}>
            Experience & Leadership
          </h2>
          <div className="graduate-entries">
            {experience.map((exp) => (
              <div key={exp.id} className="graduate-entry">
                <div className="graduate-entry-header">
                  <div>
                    <strong className="graduate-entry-role">{exp.role}</strong>
                    <div className="graduate-entry-company" style={{ color: theme?.secondary }}>
                      {exp.company} {exp.location && <span>• {exp.location}</span>}
                    </div>
                  </div>
                  <span className="graduate-entry-date" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="graduate-desc">{exp.description}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="graduate-bullets">
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

    if (key === 'projects' && projects && projects.length > 0) {
      return (
        <section key="projects" className="graduate-sec">
          <h2 className="graduate-sec-title" style={{ color: theme?.primary, borderLeftColor: theme?.secondary }}>
            Academic & Portfolio Projects
          </h2>
          <div className="graduate-entries">
            {projects.map((proj) => {
              const techList = getTechList(proj.technologies);
              return (
                <div key={proj.id} className="graduate-entry">
                  <div className="graduate-entry-header">
                    <strong className="graduate-entry-role">
                      {proj.name || proj.title}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="graduate-link" style={{ color: theme?.secondary }}>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </strong>
                  </div>
                  {proj.role && <div className="graduate-entry-company" style={{ color: theme?.secondary }}>{proj.role}</div>}
                  {proj.description && <p className="graduate-desc">{proj.description}</p>}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="graduate-bullets">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {techList.length > 0 && (
                    <div className="graduate-tech-tags">
                      {techList.map((t, i) => (
                        <span key={i} className="graduate-tech-tag" style={{ backgroundColor: theme?.bgSidebar, borderColor: theme?.accent }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    if (key.startsWith('custom-')) {
      const customSec = customSections.find(c => c.id === key);
      if (!customSec || !customSec.items || customSec.items.length === 0) return null;

      return (
        <section key={customSec.id} className="graduate-sec">
          <h2 className="graduate-sec-title" style={{ color: theme?.primary, borderLeftColor: theme?.secondary }}>
            {customSec.title || "Additional Section"}
          </h2>
          <div className="graduate-entries">
            {customSec.items.map((item) => (
              <div key={item.id} className="graduate-entry">
                <div className="graduate-entry-header">
                  <div>
                    <strong className="graduate-entry-role">{item.title}</strong>
                    {item.subtitle && (
                      <div className="graduate-entry-company" style={{ color: theme?.secondary }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  {item.date && (
                    <span className="graduate-entry-date" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && <p className="graduate-desc">{item.description}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="graduate-bullets">
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

  const mainKeys = sectionOrder.filter(k => ['experience', 'projects'].includes(k) || k.startsWith('custom-'));

  return (
    <div 
      className="resume-page graduate-sidebar-layout"
      style={{
        fontFamily: font?.font,
        color: theme?.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Top Banner Identity */}
      <header className="graduate-header" style={{ borderBottomColor: theme?.primary }}>
        <div className="graduate-header-left">
          <h1 className="graduate-name" style={{ color: theme?.primary }}>
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="graduate-title" style={{ color: theme?.secondary }}>
            {personalInfo.jobTitle || "Recent Graduate & Professional"}
          </p>
          {isVisible('summary') && summary && <p className="graduate-summary-text">{summary}</p>}
        </div>

        {personalInfo.showAvatar && personalInfo.avatar && (
          <div className="graduate-avatar-box">
            <img 
              src={personalInfo.avatar} 
              alt={personalInfo.fullName || "Profile"} 
              className="graduate-avatar-img"
              style={{ borderColor: theme?.primary }}
            />
          </div>
        )}
      </header>

      {/* Main Body Grid: 65% Main Column, 35% Credentials Sidebar */}
      <div className="graduate-body-grid">
        {/* Left Column: Experience & Projects */}
        <div className="graduate-main-col">
          {mainKeys.map(k => renderMainSection(k))}
          {customSections
            .filter(c => !mainKeys.includes(c.id) && isVisible(c.id))
            .map(c => renderMainSection(c.id))}
        </div>

        {/* Right Sidebar: Contact, Education, Skills, Languages, Certs */}
        <aside className="graduate-sidebar-col" style={{ backgroundColor: theme?.bgSidebar, borderColor: theme?.accent }}>
          {/* Contact Details */}
          <div className="graduate-side-sec">
            <h3 className="graduate-side-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
              Contact
            </h3>
            <div className="graduate-contact-items">
              {personalInfo.email && (
                <div className="graduate-contact-item">
                  <Mail size={12} style={{ color: theme?.primary }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="graduate-contact-item">
                  <Phone size={12} style={{ color: theme?.primary }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="graduate-contact-item">
                  <MapPin size={12} style={{ color: theme?.primary }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="graduate-contact-item">
                  <LinkedinIcon size={12} style={{ color: theme?.primary }} />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="graduate-contact-item">
                  <GithubIcon size={12} style={{ color: theme?.primary }} />
                  <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="graduate-contact-item">
                  <Globe size={12} style={{ color: theme?.primary }} />
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education Highlight */}
          {isVisible('education') && education && education.length > 0 && (
            <div className="graduate-side-sec">
              <h3 className="graduate-side-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Education
              </h3>
              <div className="graduate-edu-list">
                {education.map((edu) => (
                  <div key={edu.id} className="graduate-edu-card">
                    <h4 className="graduate-edu-deg">{edu.degree}</h4>
                    <div className="graduate-edu-school" style={{ color: theme?.secondary }}>{edu.institution}</div>
                    <div className="graduate-edu-year">{edu.startDate} – {edu.endDate}</div>
                    {(edu.grade || edu.score) && (
                      <span className="graduate-gpa-badge" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>
                        GPA / Grade: {edu.grade || edu.score}
                      </span>
                    )}
                    {edu.description && <p className="graduate-edu-desc">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Categorized */}
          {isVisible('skills') && skills && skills.length > 0 && (
            <div className="graduate-side-sec">
              <h3 className="graduate-side-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Skills & Tools
              </h3>
              <div className="graduate-skills-wrap">
                {skills.map((sg, i) => (
                  <div key={i} className="graduate-skill-group">
                    <span className="graduate-skill-cat" style={{ color: theme?.primary }}>{sg.category}</span>
                    <div className="graduate-skill-pills">
                      {sg.items?.map((item, idx) => {
                        const skillName = getSkillName(item);
                        return (
                          <span key={idx} className="graduate-skill-pill" style={{ borderColor: theme?.accent }}>
                            {skillName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {isVisible('certifications') && certifications && certifications.length > 0 && (
            <div className="graduate-side-sec">
              <h3 className="graduate-side-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Certifications
              </h3>
              <div className="graduate-side-items-compact">
                {certifications.map((c) => (
                  <div key={c.id} className="graduate-compact-item">
                    <strong>{c.name}</strong>
                    <div className="text-muted-xs">{c.issuer} ({c.date})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {isVisible('languages') && languages && languages.length > 0 && (
            <div className="graduate-side-sec">
              <h3 className="graduate-side-title" style={{ color: theme?.primary, borderBottomColor: theme?.secondary }}>
                Languages
              </h3>
              <div className="graduate-lang-grid">
                {languages.map((l) => (
                  <div key={l.id} className="graduate-lang-box">
                    <strong>{l.name || l.language}</strong>
                    <span style={{ color: theme?.secondary }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
