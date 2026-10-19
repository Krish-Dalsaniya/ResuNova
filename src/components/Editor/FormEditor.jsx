import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import LanguagesForm from './LanguagesForm';

export default function FormEditor({ resumeData, setResumeData }) {
  // Open Personal Info and Experience by default
  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: false,
    experience: true,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
    languages: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const sectionsConfig = [
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Contact details, title, and profile picture",
      icon: User,
      badge: resumeData.personalInfo?.fullName ? "Completed" : "Required",
      component: <PersonalInfoForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "summary",
      title: "Professional Summary",
      subtitle: "Short executive bio and career objective",
      icon: FileText,
      badge: resumeData.summary ? "Added" : null,
      component: <SummaryForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "experience",
      title: "Work Experience",
      subtitle: "Employment history, roles & achievements",
      icon: Briefcase,
      badge: `${(resumeData.experience || []).length} added`,
      component: <ExperienceForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "skills",
      title: "Skills & Proficiencies",
      subtitle: "Categorized competencies & tool stack",
      icon: Wrench,
      badge: `${(resumeData.skills || []).reduce((acc, cat) => acc + (cat.items?.length || 0), 0)} skills`,
      component: <SkillsForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "education",
      title: "Education & Degrees",
      subtitle: "Academic history, colleges & credentials",
      icon: GraduationCap,
      badge: `${(resumeData.education || []).length} added`,
      component: <EducationForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "projects",
      title: "Projects & Open Source",
      subtitle: "Side projects, portfolio items & GitHub repos",
      icon: FolderGit2,
      badge: `${(resumeData.projects || []).length} added`,
      component: <ProjectsForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "certifications",
      title: "Certifications & Awards",
      subtitle: "Professional licenses and industry certificates",
      icon: Award,
      badge: `${(resumeData.certifications || []).length} added`,
      component: <CertificationsForm data={resumeData} onChange={setResumeData} />
    },
    {
      id: "languages",
      title: "Languages",
      subtitle: "Languages and fluency levels",
      icon: Languages,
      badge: `${(resumeData.languages || []).length} added`,
      component: <LanguagesForm data={resumeData} onChange={setResumeData} />
    }
  ];

  return (
    <div className="form-editor-container">
      <div className="form-editor-header">
        <h2 className="editor-heading">Resume Content</h2>
        <p className="editor-subtext">Fill in your information below. The live preview updates in real-time.</p>
      </div>

      <div className="accordion-wrapper">
        {sectionsConfig.map((sec) => {
          const Icon = sec.icon;
          const isOpen = openSections[sec.id];

          return (
            <div key={sec.id} className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
              <button 
                type="button" 
                className="accordion-header"
                onClick={() => toggleSection(sec.id)}
              >
                <div className="accordion-header-left">
                  <div className="section-icon-badge">
                    <Icon size={18} />
                  </div>
                  <div className="section-title-wrap">
                    <span className="section-main-title">{sec.title}</span>
                    <span className="section-sub-title">{sec.subtitle}</span>
                  </div>
                </div>

                <div className="accordion-header-right">
                  {sec.badge && (
                    <span className="section-status-pill">{sec.badge}</span>
                  )}
                  <span className="accordion-chevron">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="accordion-content">
                  {sec.component}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
