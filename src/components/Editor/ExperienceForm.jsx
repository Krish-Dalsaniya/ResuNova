import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Briefcase, PlusCircle, X } from 'lucide-react';
import { showConfirm } from '../../utils/alert';

export default function ExperienceForm({ data, onChange }) {
  const experiences = data.experience || [];

  const updateExperiences = (newExp) => {
    onChange({
      ...data,
      experience: newExp
    });
  };

  const handleAddExperience = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "Present",
      current: true,
      description: "",
      highlights: ["Accomplished [X] by implementing [Y], resulting in [Z]% improvement."]
    };
    updateExperiences([newItem, ...experiences]);
  };

  const handleRemove = async (id) => {
    const confirmed = await showConfirm({
      title: "Delete Role?",
      text: "Are you sure you want to remove this job experience entry?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      isDanger: true
    });
    if (confirmed) {
      updateExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const handleFieldChange = (id, field, value) => {
    updateExperiences(experiences.map(e => {
      if (e.id === id) {
        return { ...e, [field]: value };
      }
      return e;
    }));
  };

  const handleMove = (index, direction) => {
    const newItems = [...experiences];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    updateExperiences(newItems);
  };

  const handleAddHighlight = (expId) => {
    updateExperiences(experiences.map(e => {
      if (e.id === expId) {
        return {
          ...e,
          highlights: [...(e.highlights || []), ""]
        };
      }
      return e;
    }));
  };

  const handleHighlightChange = (expId, hIndex, value) => {
    updateExperiences(experiences.map(e => {
      if (e.id === expId) {
        const newHighlights = [...(e.highlights || [])];
        newHighlights[hIndex] = value;
        return { ...e, highlights: newHighlights };
      }
      return e;
    }));
  };

  const handleRemoveHighlight = (expId, hIndex) => {
    updateExperiences(experiences.map(e => {
      if (e.id === expId) {
        return {
          ...e,
          highlights: (e.highlights || []).filter((_, idx) => idx !== hIndex)
        };
      }
      return e;
    }));
  };

  return (
    <div className="editor-subform">
      <div className="flex-between mb-3">
        <span className="text-muted-sm">{experiences.length} positions added</span>
        <button 
          type="button" 
          className="btn btn-sm btn-primary"
          onClick={handleAddExperience}
        >
          <Plus size={14} /> Add Position
        </button>
      </div>

      <div className="list-items-container">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="item-card">
            <div className="item-card-header">
              <div className="item-card-title">
                <Briefcase size={16} className="text-primary" />
                <span>{exp.role || "Untitled Position"}</span>
                {exp.company && <small className="text-muted">at {exp.company}</small>}
              </div>

              <div className="item-actions">
                <button 
                  type="button" 
                  className="icon-btn" 
                  title="Move Up"
                  disabled={index === 0}
                  onClick={() => handleMove(index, -1)}
                >
                  <ArrowUp size={14} />
                </button>
                <button 
                  type="button" 
                  className="icon-btn" 
                  title="Move Down"
                  disabled={index === experiences.length - 1}
                  onClick={() => handleMove(index, 1)}
                >
                  <ArrowDown size={14} />
                </button>
                <button 
                  type="button" 
                  className="icon-btn icon-btn-danger" 
                  title="Delete"
                  onClick={() => handleRemove(exp.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="item-card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="input-label">Job Title / Role</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Senior Software Engineer"
                    value={exp.role || ""}
                    onChange={(e) => handleFieldChange(exp.id, "role", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Company / Organization</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Google"
                    value={exp.company || ""}
                    onChange={(e) => handleFieldChange(exp.id, "company", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={exp.location || ""}
                    onChange={(e) => handleFieldChange(exp.id, "location", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Start Date</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 2021-03 or Mar 2021"
                    value={exp.startDate || ""}
                    onChange={(e) => handleFieldChange(exp.id, "startDate", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <div className="flex-between">
                    <label className="input-label">End Date</label>
                    <label className="checkbox-label-sm">
                      <input 
                        type="checkbox"
                        checked={exp.current || false}
                        onChange={(e) => {
                          handleFieldChange(exp.id, "current", e.target.checked);
                          if (e.target.checked) handleFieldChange(exp.id, "endDate", "Present");
                        }}
                      />
                      <span>Current Job</span>
                    </label>
                  </div>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 2024-01 or Present"
                    disabled={exp.current}
                    value={exp.endDate || ""}
                    onChange={(e) => handleFieldChange(exp.id, "endDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Bullet Points / Highlights */}
              <div className="mt-3">
                <div className="flex-between mb-1">
                  <label className="input-label">Key Achievements / Bullets</label>
                  <button 
                    type="button" 
                    className="btn btn-xs btn-outline"
                    onClick={() => handleAddHighlight(exp.id)}
                  >
                    <PlusCircle size={12} /> Add Bullet
                  </button>
                </div>

                <div className="bullets-editor">
                  {(exp.highlights || []).map((highlight, hIdx) => (
                    <div key={hIdx} className="bullet-row-input">
                      <span className="bullet-icon">•</span>
                      <input 
                        type="text"
                        className="form-input bullet-input"
                        placeholder="Action verb + Context + Measurable result..."
                        value={highlight}
                        onChange={(e) => handleHighlightChange(exp.id, hIdx, e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="icon-btn-sm" 
                        onClick={() => handleRemoveHighlight(exp.id, hIdx)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
