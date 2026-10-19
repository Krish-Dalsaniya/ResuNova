import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Briefcase, GraduationCap, Award, FolderGit2, Sparkles } from 'lucide-react';
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

export default function BoldTimeline({ data, theme, font, spacing }) {
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

  const renderMainItem = (key) => {
    if (!isVisible(key)) return null;

    if (key === 'experience' && experience && experience.length > 0) {
      return (
        <section key="experience" className="timeline-section">
          <div className="timeline-sec-header">
            <span className="timeline-icon-box" style={{ backgroundColor: theme?.primary, color: '#ffffff' }}>
              <Briefcase size={14} />
            </span>
            <h2 className="timeline-sec-title" style={{ color: theme?.primary }}>Work Experience</h2>
          </div>

          <div className="timeline-track-container">
            <div className="timeline-track-line" style={{ backgroundColor: theme?.secondary }} />
            <div className="timeline-entries">
              {experience.map((exp) => (
                <div key={exp.id} className="timeline-entry">
                  <div className="timeline-node" style={{ borderColor: theme?.primary, backgroundColor: '#ffffff' }}>
                    <span className="timeline-node-inner" style={{ backgroundColor: theme?.primary }} />
                  </div>
                  <div className="timeline-entry-content">
                    <div className="timeline-entry-head">
                      <div>
                        <h3 className="timeline-entry-role">{exp.role}</h3>
                        <div className="timeline-entry-company" style={{ color: theme?.secondary }}>
                          {exp.company} {exp.location && <span>• {exp.location}</span>}
                        </div>
                      </div>
                      <span className="timeline-entry-date" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="timeline-desc">{exp.description}</p>}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="timeline-bullets">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (key === 'projects' && projects && projects.length > 0) {
      return (
        <section key="projects" className="timeline-section">
          <div className="timeline-sec-header">
            <span className="timeline-icon-box" style={{ backgroundColor: theme?.primary, color: '#ffffff' }}>
              <FolderGit2 size={14} />
            </span>
            <h2 className="timeline-sec-title" style={{ color: theme?.primary }}>Featured Projects</h2>
          </div>

          <div className="timeline-track-container">
            <div className="timeline-track-line" style={{ backgroundColor: theme?.secondary }} />
            <div className="timeline-entries">
              {projects.map((proj) => {
                const techList = getTechList(proj.technologies);
                return (
                  <div key={proj.id} className="timeline-entry">
                    <div className="timeline-node" style={{ borderColor: theme?.primary, backgroundColor: '#ffffff' }}>
                      <span className="timeline-node-inner" style={{ backgroundColor: theme?.primary }} />
                    </div>
                    <div className="timeline-entry-content">
                      <div className="timeline-entry-head">
                        <h3 className="timeline-entry-role">
                          {proj.name || proj.title}
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="timeline-proj-link" style={{ color: theme?.secondary }}>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </h3>
                      </div>
                      {proj.role && <div className="timeline-entry-company" style={{ color: theme?.secondary }}>{proj.role}</div>}
                      {proj.description && <p className="timeline-desc">{proj.description}</p>}
                      {proj.highlights && proj.highlights.length > 0 && (
                        <ul className="timeline-bullets">
                          {proj.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                      {techList.length > 0 && (
                        <div className="timeline-tags">
                          {techList.map((t, i) => (
                            <span key={i} className="timeline-tag" style={{ backgroundColor: theme?.bgSidebar, borderColor: theme?.accent }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    if (key.startsWith('custom-')) {
      const customSec = customSections.find(c => c.id === key);
      if (!customSec || !customSec.items || customSec.items.length === 0) return null;

      return (
        <section key={customSec.id} className="timeline-section">
          <div className="timeline-sec-header">
            <span className="timeline-icon-box" style={{ backgroundColor: theme?.primary, color: '#ffffff' }}>
              <Sparkles size={14} />
            </span>
            <h2 className="timeline-sec-title" style={{ color: theme?.primary }}>
              {customSec.title || "Additional Section"}
            </h2>
          </div>

          <div className="timeline-track-container">
            <div className="timeline-track-line" style={{ backgroundColor: theme?.secondary }} />
            <div className="timeline-entries">
              {customSec.items.map((item) => (
                <div key={item.id} className="timeline-entry">
                  <div className="timeline-node" style={{ borderColor: theme?.primary, backgroundColor: '#ffffff' }}>
                    <span className="timeline-node-inner" style={{ backgroundColor: theme?.primary }} />
                  </div>
                  <div className="timeline-entry-content">
                    <div className="timeline-entry-head">
                      <div>
                        <h3 className="timeline-entry-role">{item.title}</h3>
                        {item.subtitle && (
                          <div className="timeline-entry-company" style={{ color: theme?.secondary }}>
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      {item.date && (
                        <span className="timeline-entry-date" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.description && <p className="timeline-desc">{item.description}</p>}
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="timeline-bullets">
                        {item.highlights.filter(Boolean).map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    return null;
  };

  const mainKeys = sectionOrder.filter(k => ['experience', 'projects'].includes(k) || k.startsWith('custom-'));

  return (
    <div 
      className="resume-page bold-timeline-layout"
      style={{
        fontFamily: font?.font,
        color: theme?.text,
        backgroundColor: '#ffffff'
      }}
    >
      {/* Top Hero Banner */}
      <header className="timeline-hero">
        <div className="timeline-hero-accent" style={{ backgroundColor: theme?.primary }} />
        <div className="timeline-hero-content">
          {personalInfo.showAvatar && personalInfo.avatar && (
            <div className="timeline-avatar-wrap">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.fullName || "Profile"} 
                className="timeline-avatar-img"
                style={{ borderColor: theme?.primary }}
              />
            </div>
          )}
          <div className="timeline-identity">
            <h1 className="timeline-name" style={{ color: theme?.primary }}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="timeline-role" style={{ color: theme?.secondary }}>
              {personalInfo.jobTitle || "Professional Title"}
            </p>
            {isVisible('summary') && summary && <p className="timeline-summary">{summary}</p>}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="timeline-contact-strip" style={{ backgroundColor: theme?.bgSidebar, borderColor: theme?.accent }}>
          {personalInfo.email && (
            <div className="timeline-contact-item">
              <Mail size={12} style={{ color: theme?.primary }} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="timeline-contact-item">
              <Phone size={12} style={{ color: theme?.primary }} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="timeline-contact-item">
              <MapPin size={12} style={{ color: theme?.primary }} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="timeline-contact-item">
              <Globe size={12} style={{ color: theme?.primary }} /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="timeline-contact-item">
              <LinkedinIcon size={12} style={{ color: theme?.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
          )}
          {personalInfo.github && (
            <div className="timeline-contact-item">
              <GithubIcon size={12} style={{ color: theme?.primary }} /> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
          )}
        </div>
      </header>

      {/* Main Content with Timeline Track */}
      <div className="timeline-body-grid">
        {/* Left Column: Experience & Projects with Connected Timeline */}
        <div className="timeline-main-col">
          {mainKeys.map(k => renderMainItem(k))}
          {customSections
            .filter(c => !mainKeys.includes(c.id) && isVisible(c.id))
            .map(c => renderMainItem(c.id))}
        </div>

        {/* Right Column: Education, Skills, Languages, Certifications */}
        <div className="timeline-side-col">
          {isVisible('education') && education && education.length > 0 && (
            <section className="timeline-side-sec">
              <div className="timeline-sec-header">
                <span className="timeline-icon-box" style={{ backgroundColor: theme?.primary, color: '#ffffff' }}>
                  <GraduationCap size={14} />
                </span>
                <h2 className="timeline-sec-title" style={{ color: theme?.primary }}>Education</h2>
              </div>
              <div className="timeline-side-items">
                {education.map((edu) => (
                  <div key={edu.id} className="timeline-side-card" style={{ borderColor: theme?.accent }}>
                    <h4 className="timeline-side-role">{edu.degree}</h4>
                    <div className="timeline-side-comp" style={{ color: theme?.secondary }}>{edu.institution}</div>
                    <div className="timeline-side-meta">
                      <span>{edu.startDate} – {edu.endDate}</span>
                      {(edu.grade || edu.score) && (
                        <span className="timeline-score-pill" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>
                          {edu.grade || edu.score}
                        </span>
                      )}
                    </div>
                    {edu.description && <p className="timeline-side-desc">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {isVisible('skills') && skills && skills.length > 0 && (
            <section className="timeline-side-sec">
              <div className="timeline-sec-header">
                <span className="timeline-icon-box" style={{ backgroundColor: theme?.primary, color: '#ffffff' }}>
                  <Award size={14} />
                </span>
                <h2 className="timeline-sec-title" style={{ color: theme?.primary }}>Key Skills</h2>
              </div>
              <div className="timeline-skills-list">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} className="timeline-skill-group">
                    <span className="timeline-cat-name" style={{ color: theme?.primary }}>{skillGroup.category}</span>
                    <div className="timeline-skill-pills">
                      {skillGroup.items?.map((item, i) => {
                        const skillName = getSkillName(item);
                        return (
                          <span key={i} className="timeline-skill-pill" style={{ borderColor: theme?.accent, backgroundColor: theme?.bgSidebar }}>
                            {skillName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isVisible('certifications') && certifications && certifications.length > 0 && (
            <section className="timeline-side-sec">
              <h3 className="timeline-side-subhead" style={{ color: theme?.primary, borderBottomColor: theme?.accent }}>Certifications</h3>
              <div className="timeline-cert-list">
                {certifications.map((cert) => (
                  <div key={cert.id} className="timeline-cert-item">
                    <span className="timeline-cert-dot" style={{ backgroundColor: theme?.primary }} />
                    <div>
                      <strong className="timeline-cert-name">{cert.name}</strong>
                      <div className="timeline-cert-issuer">{cert.issuer} • {cert.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isVisible('languages') && languages && languages.length > 0 && (
            <section className="timeline-side-sec">
              <h3 className="timeline-side-subhead" style={{ color: theme?.primary, borderBottomColor: theme?.accent }}>Languages</h3>
              <div className="timeline-lang-list">
                {languages.map((lang) => (
                  <div key={lang.id} className="timeline-lang-row">
                    <span className="timeline-lang-name">{lang.name || lang.language}</span>
                    <span className="timeline-lang-badge" style={{ backgroundColor: theme?.accent, color: theme?.primary }}>{lang.level}</span>
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
