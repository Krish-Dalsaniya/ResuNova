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
  Sparkles,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sliders,
  Plus
} from 'lucide-react';

import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import LanguagesForm from './LanguagesForm';
import CustomSectionForm from './CustomSectionForm';
import ManageSectionsModal from '../ManageSectionsModal';

import { defaultSectionOrder, defaultSectionSettings } from '../../data/sampleResume';
import { showConfirm } from '../../utils/alert';

export default function FormEditor({ resumeData, setResumeData, atsAnalysis, onOpenOptimizer }) {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  // Track accordion expand/collapse state
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

  const sectionOrder = resumeData.sectionOrder || defaultSectionOrder;
  const sectionSettings = resumeData.sectionSettings || defaultSectionSettings;
  const customSections = resumeData.customSections || [];

  const handleToggleVisibility = (secKey) => {
    const isCurrentlyVisible = sectionSettings[secKey]?.visible !== false;
    setResumeData({
      ...resumeData,
      sectionSettings: {
        ...sectionSettings,
        [secKey]: {
          ...(sectionSettings[secKey] || {}),
          visible: !isCurrentlyVisible
        }
      }
    });
  };

  const handleMoveSection = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    setResumeData({
      ...resumeData,
      sectionOrder: newOrder
    });
  };

  const handleRemoveCustomSection = async (customId) => {
    const sec = customSections.find(c => c.id === customId);
    const confirmed = await showConfirm({
      title: "Delete Section?",
      text: `Are you sure you want to remove "${sec?.title || 'this section'}"?`,
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      isDanger: true
    });
    if (confirmed) {
      setResumeData({
        ...resumeData,
        customSections: customSections.filter(c => c.id !== customId),
        sectionOrder: sectionOrder.filter(k => k !== customId)
      });
    }
  };

  const handleAddCustomSection = () => {
    const newId = `custom-${Date.now()}`;
    const newSection = {
      id: newId,
      title: "Additional Section",
      items: [
        {
          id: `item-${Date.now()}`,
          title: "Title / Role",
          subtitle: "Organization or Event",
          date: "2023 – Present",
          description: "Overview of your accomplishments...",
          highlights: ["Key achievement or milestone."]
        }
      ]
    };

    setResumeData({
      ...resumeData,
      customSections: [...customSections, newSection],
      sectionOrder: [...sectionOrder, newId],
      sectionSettings: {
        ...sectionSettings,
        [newId]: { visible: true, title: "Additional Section" }
      }
    });

    setOpenSections(prev => ({ ...prev, [newId]: true }));
  };

  // Base configurations for standard sections
  const getSectionConfig = (secKey) => {
    switch (secKey) {
      case 'summary':
        return {
          id: 'summary',
          title: "Professional Summary",
          subtitle: "Short executive bio and career objective",
          icon: FileText,
          badge: resumeData.summary ? "Added" : null,
          component: <SummaryForm data={resumeData} onChange={setResumeData} />
        };
      case 'experience':
        return {
          id: 'experience',
          title: "Work Experience",
          subtitle: "Employment history, roles & achievements",
          icon: Briefcase,
          badge: `${(resumeData.experience || []).length} added`,
          component: <ExperienceForm data={resumeData} onChange={setResumeData} />
        };
      case 'projects':
        return {
          id: 'projects',
          title: "Projects & Open Source",
          subtitle: "Side projects, portfolio items & GitHub repos",
          icon: FolderGit2,
          badge: `${(resumeData.projects || []).length} added`,
          component: <ProjectsForm data={resumeData} onChange={setResumeData} />
        };
      case 'skills':
        return {
          id: 'skills',
          title: "Skills & Proficiencies",
          subtitle: "Categorized competencies & tool stack",
          icon: Wrench,
          badge: `${(resumeData.skills || []).reduce((acc, cat) => acc + (cat.items?.length || 0), 0)} skills`,
          component: <SkillsForm data={resumeData} onChange={setResumeData} />
        };
      case 'education':
        return {
          id: 'education',
          title: "Education & Degrees",
          subtitle: "Academic history, colleges & credentials",
          icon: GraduationCap,
          badge: `${(resumeData.education || []).length} added`,
          component: <EducationForm data={resumeData} onChange={setResumeData} />
        };
      case 'certifications':
        return {
          id: 'certifications',
          title: "Certifications & Awards",
          subtitle: "Professional licenses and industry certificates",
          icon: Award,
          badge: `${(resumeData.certifications || []).length} added`,
          component: <CertificationsForm data={resumeData} onChange={setResumeData} />
        };
      case 'languages':
        return {
          id: 'languages',
          title: "Languages",
          subtitle: "Languages and fluency levels",
          icon: Languages,
          badge: `${(resumeData.languages || []).length} added`,
          component: <LanguagesForm data={resumeData} onChange={setResumeData} />
        };
      default:
        if (secKey.startsWith('custom-')) {
          const customSec = customSections.find(c => c.id === secKey);
          if (!customSec) return null;
          return {
            id: customSec.id,
            title: customSec.title || "Custom Section",
            subtitle: "Custom entries & achievements",
            icon: Sparkles,
            badge: `${(customSec.items || []).length} entries`,
            component: (
              <CustomSectionForm 
                section={customSec} 
                data={resumeData} 
                onChange={setResumeData} 
                onRemoveSection={handleRemoveCustomSection} 
              />
            )
          };
        }
        return null;
    }
  };

  const visibleCount = sectionOrder.filter(k => sectionSettings[k]?.visible !== false).length;

  return (
    <div className="form-editor-container">
      {/* Editor Header with Layout Management Action */}
      <div className="form-editor-header flex-between">
        <div>
          <h2 className="editor-heading">Resume Content</h2>
          <p className="editor-subtext">{visibleCount} of {sectionOrder.length} sections active on resume.</p>
        </div>
        <div className="flex-row gap-2">
          {onOpenOptimizer && (
            <button 
              type="button" 
              className="ats-score-pill-btn"
              onClick={onOpenOptimizer}
              title={`ATS Score: ${atsAnalysis?.score ?? 0}/100 - Click to optimize`}
            >
              <span 
                className="ats-mini-dot" 
                style={{ backgroundColor: atsAnalysis?.statusColor || 'var(--primary)' }} 
              />
              <span 
                className="ats-score-pill-val" 
                style={{ color: atsAnalysis?.statusColor || 'var(--primary)' }}
              >
                {atsAnalysis?.score ?? 0}%
              </span>
              <span className="ats-score-pill-lbl">ATS</span>
            </button>
          )}

          <button 
            type="button" 
            className="btn btn-sm btn-secondary manage-sections-trigger-btn"
            onClick={() => setIsManageModalOpen(true)}
            title="Reorder and customize section visibility"
          >
            <Sliders size={14} />
            <span>Layout & Order</span>
          </button>
        </div>
      </div>

      <div className="accordion-wrapper">
        {/* Pinned Personal Information Section */}
        <div className={`accordion-item ${openSections.personal ? 'is-open' : ''}`}>
          <div 
            className="accordion-header"
            onClick={() => toggleSection('personal')}
          >
            <div className="accordion-header-left">
              <div className="section-icon-badge">
                <User size={18} />
              </div>
              <div className="section-title-wrap">
                <span className="section-main-title">Personal Information</span>
                <span className="section-sub-title">Contact details, title, and profile picture</span>
              </div>
            </div>

            <div className="accordion-header-right">
              <span className="section-status-pill">
                {resumeData.personalInfo?.fullName ? "Completed" : "Required"}
              </span>
              <span className="accordion-chevron">
                {openSections.personal ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </div>
          </div>

          {openSections.personal && (
            <div className="accordion-content">
              <PersonalInfoForm data={resumeData} onChange={setResumeData} />
            </div>
          )}
        </div>

        {/* Dynamic Reorderable Sections */}
        {sectionOrder.map((secKey, idx) => {
          const config = getSectionConfig(secKey);
          if (!config) return null;

          const Icon = config.icon;
          const isOpen = openSections[config.id];
          const isVisible = sectionSettings[secKey]?.visible !== false;

          return (
            <div 
              key={config.id} 
              className={`accordion-item ${isOpen ? 'is-open' : ''} ${!isVisible ? 'is-section-hidden' : ''}`}
            >
              <div 
                className="accordion-header"
                onClick={() => toggleSection(config.id)}
              >
                <div className="accordion-header-left">
                  <div className="section-icon-badge">
                    <Icon size={18} />
                  </div>
                  <div className="section-title-wrap">
                    <span className="section-main-title">
                      {config.title}
                      {!isVisible && <span className="hidden-tag">Hidden</span>}
                    </span>
                    <span className="section-sub-title">{config.subtitle}</span>
                  </div>
                </div>

                <div className="accordion-header-right">
                  {/* Inline Reorder Up/Down */}
                  <div className="accordion-reorder-group" onClick={(e) => e.stopPropagation()}>
                    <button 
                      type="button" 
                      className="accordion-tool-btn"
                      disabled={idx === 0}
                      onClick={() => handleMoveSection(idx, -1)}
                      title="Move section up"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button 
                      type="button" 
                      className="accordion-tool-btn"
                      disabled={idx === sectionOrder.length - 1}
                      onClick={() => handleMoveSection(idx, 1)}
                      title="Move section down"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>

                  {/* Inline Visibility Eye Toggle */}
                  <button 
                    type="button" 
                    className={`accordion-eye-btn ${!isVisible ? 'is-muted' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleVisibility(secKey);
                    }}
                    title={isVisible ? "Hide from resume" : "Show on resume"}
                  >
                    {isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>

                  {/* Badge */}
                  {config.badge && (
                    <span className="section-status-pill">{config.badge}</span>
                  )}

                  <span className="accordion-chevron">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </div>
              </div>

              {isOpen && (
                <div className="accordion-content">
                  {!isVisible && (
                    <div className="section-hidden-banner mb-3">
                      <EyeOff size={14} />
                      <span>This section is currently hidden from your live resume and PDF export. Click the eye icon above to make it visible.</span>
                    </div>
                  )}
                  {config.component}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Custom Section Button at Bottom */}
        <div className="add-custom-sec-wrap mt-3">
          <button 
            type="button" 
            className="btn btn-outline-primary btn-block add-sec-dashed-btn"
            onClick={handleAddCustomSection}
          >
            <Plus size={16} /> Add Custom Section (Volunteer, Awards, Publications)
          </button>
        </div>
      </div>

      {/* Modal for Full Layout & Section Reordering */}
      <ManageSectionsModal 
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        resumeData={resumeData}
        onChange={setResumeData}
      />
    </div>
  );
}
