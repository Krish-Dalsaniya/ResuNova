import React from 'react';
import { 
  X, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Plus, 
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages
} from 'lucide-react';
import { defaultSectionOrder, defaultSectionSettings } from '../data/sampleResume';

const SECTION_METADATA = {
  summary: { label: "Professional Summary", icon: FileText, category: "Core" },
  experience: { label: "Work Experience", icon: Briefcase, category: "Core" },
  projects: { label: "Projects & Works", icon: FolderGit2, category: "Technical" },
  skills: { label: "Skills & Proficiencies", icon: Wrench, category: "Technical" },
  education: { label: "Education & Degrees", icon: GraduationCap, category: "Academic" },
  certifications: { label: "Certifications & Licenses", icon: Award, category: "Credentials" },
  languages: { label: "Languages", icon: Languages, category: "General" }
};

const PRESET_CUSTOM_SECTIONS = [
  { title: "Volunteer Work", icon: "🤝" },
  { title: "Awards & Honors", icon: "🏆" },
  { title: "Publications", icon: "📚" },
  { title: "Interests & Hobbies", icon: "🎯" },
  { title: "Conferences & Speaking", icon: "🎤" }
];

export default function ManageSectionsModal({ 
  isOpen, 
  onClose, 
  resumeData, 
  onChange 
}) {
  if (!isOpen) return null;

  const currentOrder = resumeData.sectionOrder || defaultSectionOrder;
  const currentSettings = resumeData.sectionSettings || defaultSectionSettings;
  const customSections = resumeData.customSections || [];

  const handleToggleVisibility = (secKey) => {
    const isCurrentlyVisible = currentSettings[secKey]?.visible !== false;
    onChange({
      ...resumeData,
      sectionSettings: {
        ...currentSettings,
        [secKey]: {
          ...(currentSettings[secKey] || {}),
          visible: !isCurrentlyVisible
        }
      }
    });
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    onChange({
      ...resumeData,
      sectionOrder: newOrder
    });
  };

  const handleResetOrder = () => {
    onChange({
      ...resumeData,
      sectionOrder: defaultSectionOrder,
      sectionSettings: defaultSectionSettings
    });
  };

  const handleAddPresetCustom = (presetTitle) => {
    const newId = `custom-${Date.now()}`;
    const newSection = {
      id: newId,
      title: presetTitle,
      items: [
        {
          id: `item-${Date.now()}`,
          title: "Lead Contributor",
          subtitle: presetTitle,
          date: "2023 – Present",
          description: "Summary of activities and achievements.",
          highlights: ["Demonstrated leadership and collaboration in key initiatives."]
        }
      ]
    };

    onChange({
      ...resumeData,
      customSections: [...customSections, newSection],
      sectionOrder: [...currentOrder, newId],
      sectionSettings: {
        ...currentSettings,
        [newId]: { visible: true, title: presetTitle }
      }
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Manage & Reorder Sections</h2>
            <p className="modal-subtitle">Control section display order and visibility across all resume templates.</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Action Toolbar */}
          <div className="manage-sections-toolbar flex-between mb-3">
            <span className="text-muted-sm">
              {currentOrder.filter(k => currentSettings[k]?.visible !== false).length} of {currentOrder.length} sections visible
            </span>
            <button 
              type="button" 
              className="btn btn-sm btn-secondary"
              onClick={handleResetOrder}
              title="Reset to default order"
            >
              <RotateCcw size={13} /> Reset Layout
            </button>
          </div>

          {/* Section List with Up/Down and Visibility */}
          <div className="reorder-sections-list">
            {currentOrder.map((secKey, idx) => {
              const meta = SECTION_METADATA[secKey] || {
                label: customSections.find(c => c.id === secKey)?.title || "Custom Section",
                icon: Sparkles,
                category: "Custom"
              };
              const Icon = meta.icon;
              const isVisible = currentSettings[secKey]?.visible !== false;

              return (
                <div 
                  key={secKey} 
                  className={`reorder-section-row ${!isVisible ? 'is-hidden' : ''}`}
                >
                  <div className="reorder-row-left">
                    <span className="reorder-index-badge">{idx + 1}</span>
                    <div className="reorder-icon-badge">
                      <Icon size={16} />
                    </div>
                    <div className="reorder-row-info">
                      <span className="reorder-row-title">{meta.label}</span>
                      <span className="reorder-row-cat">{meta.category}</span>
                    </div>
                  </div>

                  <div className="reorder-row-actions">
                    {/* Move Up / Down */}
                    <div className="btn-group">
                      <button 
                        type="button" 
                        className="reorder-step-btn"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        title="Move Up"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button 
                        type="button" 
                        className="reorder-step-btn"
                        disabled={idx === currentOrder.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        title="Move Down"
                      >
                        <ArrowDown size={15} />
                      </button>
                    </div>

                    {/* Visibility Toggle */}
                    <button 
                      type="button" 
                      className={`visibility-toggle-btn ${isVisible ? 'is-visible' : 'is-muted'}`}
                      onClick={() => handleToggleVisibility(secKey)}
                      title={isVisible ? "Hide section from resume" : "Show section on resume"}
                    >
                      {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      <span className="toggle-label-text">{isVisible ? "Visible" : "Hidden"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Add Custom Sections */}
          <div className="preset-custom-wrap mt-4">
            <h4 className="preset-custom-title">
              <Plus size={14} /> Add Additional Section
            </h4>
            <div className="preset-pills-grid">
              {PRESET_CUSTOM_SECTIONS.map((preset, i) => (
                <button 
                  key={i}
                  type="button" 
                  className="preset-custom-btn"
                  onClick={() => handleAddPresetCustom(preset.title)}
                >
                  <span className="preset-emoji">{preset.icon}</span>
                  <span>{preset.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
