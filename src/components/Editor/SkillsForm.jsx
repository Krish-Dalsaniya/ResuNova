import React, { useState } from 'react';
import { Plus, Trash2, X, Star } from 'lucide-react';
import { showConfirm } from '../../utils/alert';

export default function SkillsForm({ data, onChange }) {
  const skillGroups = data.skills || [];
  const [newCatName, setNewCatName] = useState("");
  const [newSkillText, setNewSkillText] = useState({});

  const updateSkills = (newGroups) => {
    onChange({
      ...data,
      skills: newGroups
    });
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newGroup = {
      category: newCatName.trim(),
      items: []
    };
    updateSkills([...skillGroups, newGroup]);
    setNewCatName("");
  };

  const handleRemoveCategory = async (catIndex) => {
    const groupName = skillGroups[catIndex]?.category || "this skill category";
    const confirmed = await showConfirm({
      title: "Delete Category?",
      text: `Are you sure you want to delete "${groupName}" and all its skills?`,
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      isDanger: true
    });
    if (confirmed) {
      updateSkills(skillGroups.filter((_, i) => i !== catIndex));
    }
  };

  const handleAddSkillItem = (catIndex) => {
    const text = (newSkillText[catIndex] || "").trim();
    if (!text) return;
    const newGroups = [...skillGroups];
    newGroups[catIndex].items = [
      ...(newGroups[catIndex].items || []),
      { name: text, level: 5 }
    ];
    updateSkills(newGroups);
    setNewSkillText({ ...newSkillText, [catIndex]: "" });
  };

  const handleRemoveSkillItem = (catIndex, itemIndex) => {
    const newGroups = [...skillGroups];
    newGroups[catIndex].items = newGroups[catIndex].items.filter((_, i) => i !== itemIndex);
    updateSkills(newGroups);
  };

  const handleSkillLevelChange = (catIndex, itemIndex, level) => {
    const newGroups = [...skillGroups];
    newGroups[catIndex].items[itemIndex].level = level;
    updateSkills(newGroups);
  };

  return (
    <div className="editor-subform">
      {/* Add New Category */}
      <div className="add-category-bar mb-3">
        <input 
          type="text" 
          className="form-input" 
          placeholder="New Skill Group (e.g. Databases, Cloud & DevOps, Leadership)"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
        />
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={handleAddCategory}
        >
          <Plus size={14} /> Add Group
        </button>
      </div>

      <div className="list-items-container">
        {skillGroups.map((group, catIndex) => (
          <div key={catIndex} className="item-card">
            <div className="item-card-header">
              <input 
                type="text"
                className="category-title-input"
                value={group.category}
                onChange={(e) => {
                  const newGroups = [...skillGroups];
                  newGroups[catIndex].category = e.target.value;
                  updateSkills(newGroups);
                }}
              />
              <button 
                type="button" 
                className="icon-btn icon-btn-danger" 
                onClick={() => handleRemoveCategory(catIndex)}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="item-card-body">
              {/* Add Skill to this group */}
              <div className="skill-input-row mb-2">
                <input 
                  type="text" 
                  className="form-input form-input-sm" 
                  placeholder={`Add a skill to ${group.category}... (press Enter)`}
                  value={newSkillText[catIndex] || ""}
                  onChange={(e) => setNewSkillText({ ...newSkillText, [catIndex]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkillItem(catIndex)}
                />
                <button 
                  type="button" 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleAddSkillItem(catIndex)}
                >
                  <Plus size={13} /> Add
                </button>
              </div>

              {/* Skills Tag Pills / Rating */}
              <div className="skill-tags-list">
                {(group.items || []).map((skill, itemIndex) => (
                  <div key={itemIndex} className="skill-item-badge">
                    <span className="skill-badge-name">{skill.name}</span>
                    <div className="skill-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-dot ${star <= (skill.level || 5) ? 'active' : ''}`}
                          title={`Proficiency: ${star}/5`}
                          onClick={() => handleSkillLevelChange(catIndex, itemIndex, star)}
                        />
                      ))}
                    </div>
                    <button 
                      type="button" 
                      className="skill-remove-btn"
                      onClick={() => handleRemoveSkillItem(catIndex, itemIndex)}
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
