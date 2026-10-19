import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { showConfirm } from '../../utils/alert';

export default function EducationForm({ data, onChange }) {
  const educations = data.education || [];

  const updateEducation = (newEdu) => {
    onChange({
      ...data,
      education: newEdu
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: "",
      honors: ""
    };
    updateEducation([newItem, ...educations]);
  };

  const handleRemove = async (id) => {
    const confirmed = await showConfirm({
      title: "Delete Degree?",
      text: "Are you sure you want to remove this education entry?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      isDanger: true
    });
    if (confirmed) {
      updateEducation(educations.filter(e => e.id !== id));
    }
  };

  const handleChange = (id, field, value) => {
    updateEducation(educations.map(e => {
      if (e.id === id) {
        return { ...e, [field]: value };
      }
      return e;
    }));
  };

  return (
    <div className="editor-subform">
      <div className="flex-between mb-3">
        <span className="text-muted-sm">{educations.length} degrees added</span>
        <button 
          type="button" 
          className="btn btn-sm btn-primary"
          onClick={handleAdd}
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      <div className="list-items-container">
        {educations.map((edu) => (
          <div key={edu.id} className="item-card">
            <div className="item-card-header">
              <div className="item-card-title">
                <GraduationCap size={16} className="text-primary" />
                <span>{edu.degree || "Untitled Degree"}</span>
                {edu.institution && <small className="text-muted">at {edu.institution}</small>}
              </div>
              <button 
                type="button" 
                className="icon-btn icon-btn-danger" 
                onClick={() => handleRemove(edu.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="item-card-body">
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label className="input-label">Degree & Major</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. B.S. in Computer Science"
                    value={edu.degree || ""}
                    onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                  />
                </div>

                <div className="form-group col-span-2">
                  <label className="input-label">School / University</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Stanford University"
                    value={edu.institution || ""}
                    onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Stanford, CA"
                    value={edu.location || ""}
                    onChange={(e) => handleChange(edu.id, "location", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Graduation Year / Dates</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 2018 - 2022"
                    value={edu.endDate || ""}
                    onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">GPA / Score (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 3.9/4.0"
                    value={edu.grade || ""}
                    onChange={(e) => handleChange(edu.id, "grade", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Honors / Minors (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Summa Cum Laude"
                    value={edu.honors || ""}
                    onChange={(e) => handleChange(edu.id, "honors", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
