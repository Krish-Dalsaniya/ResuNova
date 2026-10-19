import React from 'react';
import { Plus, Trash2, Sparkles, PlusCircle, X, Edit3 } from 'lucide-react';
import { showConfirm } from '../../utils/alert';

export default function CustomSectionForm({ section, data, onChange, onRemoveSection }) {
  const customSections = data.customSections || [];

  const updateCurrentSection = (updatedFields) => {
    const updated = customSections.map(s => {
      if (s.id === section.id) {
        return { ...s, ...updatedFields };
      }
      return s;
    });
    onChange({
      ...data,
      customSections: updated
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: "",
      subtitle: "",
      date: "",
      description: "",
      highlights: ["Key contribution or accomplishment."]
    };
    const currentItems = section.items || [];
    updateCurrentSection({ items: [newItem, ...currentItems] });
  };

  const handleRemoveItem = async (itemId) => {
    const confirmed = await showConfirm({
      title: "Delete Entry?",
      text: "Are you sure you want to remove this item?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      isDanger: true
    });
    if (confirmed) {
      const currentItems = section.items || [];
      updateCurrentSection({ items: currentItems.filter(i => i.id !== itemId) });
    }
  };

  const handleItemChange = (itemId, field, value) => {
    const currentItems = section.items || [];
    const updated = currentItems.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateCurrentSection({ items: updated });
  };

  const handleAddBullet = (itemId) => {
    const currentItems = section.items || [];
    const updated = currentItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          highlights: [...(item.highlights || []), ""]
        };
      }
      return item;
    });
    updateCurrentSection({ items: updated });
  };

  const handleBulletChange = (itemId, bIdx, value) => {
    const currentItems = section.items || [];
    const updated = currentItems.map(item => {
      if (item.id === itemId) {
        const newHighlights = [...(item.highlights || [])];
        newHighlights[bIdx] = value;
        return { ...item, highlights: newHighlights };
      }
      return item;
    });
    updateCurrentSection({ items: updated });
  };

  const handleRemoveBullet = (itemId, bIdx) => {
    const currentItems = section.items || [];
    const updated = currentItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          highlights: (item.highlights || []).filter((_, i) => i !== bIdx)
        };
      }
      return item;
    });
    updateCurrentSection({ items: updated });
  };

  const items = section.items || [];

  return (
    <div className="editor-subform">
      {/* Section Title Customizer */}
      <div className="custom-sec-title-bar mb-3">
        <div className="form-group flex-1">
          <label className="input-label">Section Heading Displayed on Resume</label>
          <div className="input-with-icon">
            <Edit3 size={15} className="input-icon" />
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Volunteer Work, Awards, Publications"
              value={section.title || ""}
              onChange={(e) => updateCurrentSection({ title: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex-between mb-3">
        <span className="text-muted-sm">{items.length} entries in this section</span>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn btn-sm btn-primary"
            onClick={handleAddItem}
          >
            <Plus size={14} /> Add Entry
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-danger"
            onClick={() => onRemoveSection(section.id)}
            title="Remove entire custom section"
          >
            <Trash2 size={14} /> Delete Section
          </button>
        </div>
      </div>

      <div className="list-items-container">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-card-header">
              <div className="item-card-title">
                <Sparkles size={16} className="text-primary" />
                <span>{item.title || "Untitled Entry"}</span>
              </div>
              <button 
                type="button" 
                className="icon-btn-danger"
                onClick={() => handleRemoveItem(item.id)}
                title="Remove entry"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="input-label">Title / Role</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Community Mentor / Lead Author"
                  value={item.title || ""}
                  onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Organization / Issuer</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Red Cross / IEEE Publishing"
                  value={item.subtitle || ""}
                  onChange={(e) => handleItemChange(item.id, "subtitle", e.target.value)}
                />
              </div>

              <div className="form-group col-span-2">
                <label className="input-label">Date / Timeframe</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 2022 – Present / March 2023"
                  value={item.date || ""}
                  onChange={(e) => handleItemChange(item.id, "date", e.target.value)}
                />
              </div>

              <div className="form-group col-span-2">
                <label className="input-label">Brief Description</label>
                <textarea 
                  className="form-textarea" 
                  rows={2}
                  placeholder="Brief overview of your involvement or achievements..."
                  value={item.description || ""}
                  onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                />
              </div>

              {/* Bullet Points */}
              <div className="form-group col-span-2">
                <div className="flex-between mb-1">
                  <label className="input-label">Key Highlights & Bullet Points</label>
                  <button 
                    type="button" 
                    className="btn-text-action"
                    onClick={() => handleAddBullet(item.id)}
                  >
                    <PlusCircle size={13} /> Add Point
                  </button>
                </div>

                <div className="bullet-inputs-wrap">
                  {(item.highlights || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="bullet-input-row">
                      <span className="bullet-dot">•</span>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Detail a notable contribution or milestone..."
                        value={bullet}
                        onChange={(e) => handleBulletChange(item.id, bIdx, e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="bullet-remove-btn"
                        onClick={() => handleRemoveBullet(item.id, bIdx)}
                      >
                        <X size={14} />
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
