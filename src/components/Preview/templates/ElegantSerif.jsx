import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
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

export default function ElegantSerif({ data, theme, font, spacing }) {
  const { 
    personalInfo = {}, 
    summary = "", 
    experience = [], 
    education = [], 
    skills = [], 
    projects = [], 
    certifications = [], 
    languages = [] 
  } = data || {};

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
            <span>•</span>
          )}
          {personalInfo.phone && (
            <span><Phone size={11} style={{ color: theme?.primary }} /> {personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span>•</span>
          )}
          {personalInfo.location && (
            <span><MapPin size={11} style={{ color: theme?.primary }} /> {personalInfo.location}</span>
          )}
          {personalInfo.linkedin && (
            <span>•</span>
          )}
          {personalInfo.linkedin && (
            <span><LinkedinIcon size={11} style={{ color: theme?.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.github && (
            <span>•</span>
          )}
          {personalInfo.github && (
            <span><GithubIcon size={11} style={{ color: theme?.primary }} /> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.website && (
            <span>•</span>
          )}
          {personalInfo.website && (
            <span><Globe size={11} style={{ color: theme?.primary }} /> {personalInfo.website.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Executive Profile</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <p className="elegant-summary-body">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="elegant-section">
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
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="elegant-section">
          <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
            <span className="elegant-heading-text">Selected Projects & Works</span>
            <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
          </div>
          <div className="elegant-entries">
            {projects.map((proj) => {
              const techList = getTechList(proj.technologies);
              return (
                <div key={proj.id} className="elegant-entry">
                  <div className="elegant-entry-top">
                    <div>
                      <h3 className="elegant-role">
                        {proj.name || proj.title}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="elegant-link" style={{ color: theme?.secondary }}>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </h3>
                      {proj.role && <div className="elegant-company" style={{ color: theme?.secondary }}>{proj.role}</div>}
                    </div>
                  </div>
                  {proj.description && <p className="elegant-desc">{proj.description}</p>}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="elegant-bullets">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {techList.length > 0 && (
                    <div className="elegant-tags">
                      {techList.map((t, idx) => (
                        <span key={idx} className="elegant-tag" style={{ borderColor: theme?.accent, color: theme?.primary }}>
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
      )}

      {/* Dual Row: Education & Skills */}
      <div className="elegant-dual-grid">
        {education && education.length > 0 && (
          <div className="elegant-col">
            <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
              <span className="elegant-heading-text">Education</span>
              <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
            </div>
            <div className="elegant-edu-list">
              {education.map((edu) => (
                <div key={edu.id} className="elegant-edu-item">
                  <h4 className="elegant-edu-degree">{edu.degree}</h4>
                  <div className="elegant-edu-inst" style={{ color: theme?.secondary }}>{edu.institution}</div>
                  <div className="elegant-edu-dates">
                    {edu.startDate} – {edu.endDate} {(edu.grade || edu.score) && `• ${edu.grade || edu.score}`}
                  </div>
                  {edu.description && <p className="elegant-desc">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="elegant-col">
            <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
              <span className="elegant-heading-text">Core Competencies</span>
              <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
            </div>
            <div className="elegant-skills-block">
              {skills.map((sg, i) => {
                const names = (sg.items || []).map(getSkillName).filter(Boolean).join(', ');
                return (
                  <div key={i} className="elegant-skill-row">
                    <strong className="elegant-cat-lbl" style={{ color: theme?.primary }}>{sg.category}: </strong>
                    <span className="elegant-cat-items">{names}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Certifications & Languages Bottom Strip */}
      {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
        <div className="elegant-dual-grid" style={{ marginTop: '12px' }}>
          {certifications && certifications.length > 0 && (
            <div className="elegant-col">
              <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
                <span className="elegant-heading-text">Honors & Certifications</span>
                <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
              </div>
              <ul className="elegant-cert-list">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <strong>{cert.name}</strong> — {cert.issuer} ({cert.date})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="elegant-col">
              <div className="elegant-sec-heading" style={{ color: theme?.primary }}>
                <span className="elegant-heading-text">Languages</span>
                <span className="elegant-heading-line" style={{ backgroundColor: theme?.accent }} />
              </div>
              <div className="elegant-lang-pills">
                {languages.map((l) => (
                  <span key={l.id} className="elegant-lang-pill" style={{ borderColor: theme?.accent }}>
                    <strong>{l.name || l.language}</strong> ({l.level})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
