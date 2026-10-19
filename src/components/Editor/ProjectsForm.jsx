import React from 'react';
import { Plus, Trash2, FolderGit2, PlusCircle, X, ExternalLink } from 'lucide-react';
import { showConfirm } from '../../utils/alert';

export default function ProjectsForm({ data, onChange }) {
  const projects = data.projects || [];

  const updateProjects = (newProj) => {
    onChange({
      ...data,
      projects: newProj
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: `proj-${Date.now()}`,
      name: "",
      role: "",
      link: "",
      technologies: "",
      highlights: ["Engineered solution utilizing modern frameworks with measurable performance gains."]
    };
    updateProjects([newItem, ...projects]);
  };

  const handleRemove = async (id) => {
    const confirmed = await showConfirm({
      title: "Delete Project?",
      text: "Are you sure you want to remove this project entry?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      isDanger: true
    });
    if (confirmed) {
      updateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleChange = (id, field, value) => {
    updateProjects(projects.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const handleAddBullet = (projId) => {
    updateProjects(projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          highlights: [...(p.highlights || []), ""]
        };
      }
      return p;
    }));
  };

  const handleBulletChange = (projId, bIndex, value) => {
    updateProjects(projects.map(p => {
      if (p.id === projId) {
        const newHighlights = [...(p.highlights || [])];
        newHighlights[bIndex] = value;
        return { ...p, highlights: newHighlights };
      }
      return p;
    }));
  };

  const handleRemoveBullet = (projId, bIndex) => {
    updateProjects(projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          highlights: (p.highlights || []).filter((_, idx) => idx !== bIndex)
        };
      }
      return p;
    }));
  };

  return (
    <div className="editor-subform">
      <div className="flex-between mb-3">
        <span className="text-muted-sm">{projects.length} projects added</span>
        <button 
          type="button" 
          className="btn btn-sm btn-primary"
          onClick={handleAdd}
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      <div className="list-items-container">
        {projects.map((proj) => (
          <div key={proj.id} className="item-card">
            <div className="item-card-header">
              <div className="item-card-title">
                <FolderGit2 size={16} className="text-primary" />
                <span>{proj.name || "Untitled Project"}</span>
              </div>
              <button 
                type="button" 
                className="icon-btn icon-btn-danger" 
                onClick={() => handleRemove(proj.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="item-card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="input-label">Project Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Next-Gen Cloud Dashboard"
                    value={proj.name || ""}
                    onChange={(e) => handleChange(proj.id, "name", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Project URL / GitHub</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. https://github.com/org/repo"
                    value={proj.link || ""}
                    onChange={(e) => handleChange(proj.id, "link", e.target.value)}
                  />
                </div>

                <div className="form-group col-span-2">
                  <label className="input-label">Tech Stack (comma separated)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. React, Node.js, GraphQL, Docker"
                    value={proj.technologies || ""}
                    onChange={(e) => handleChange(proj.id, "technologies", e.target.value)}
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-3">
                <div className="flex-between mb-1">
                  <label className="input-label">Highlights & Key Results</label>
                  <button 
                    type="button" 
                    className="btn btn-xs btn-outline"
                    onClick={() => handleAddBullet(proj.id)}
                  >
                    <PlusCircle size={12} /> Add Highlight
                  </button>
                </div>
                <div className="bullets-editor">
                  {(proj.highlights || []).map((h, bIdx) => (
                    <div key={bIdx} className="bullet-row-input">
                      <span className="bullet-icon">•</span>
                      <input 
                        type="text"
                        className="form-input bullet-input"
                        placeholder="Feature or metric accomplished..."
                        value={h}
                        onChange={(e) => handleBulletChange(proj.id, bIdx, e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="icon-btn-sm" 
                        onClick={() => handleRemoveBullet(proj.id, bIdx)}
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
