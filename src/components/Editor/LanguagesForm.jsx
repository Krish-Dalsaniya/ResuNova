import React from 'react';
import { Plus, Trash2, Languages } from 'lucide-react';

export default function LanguagesForm({ data, onChange }) {
  const languages = data.languages || [];

  const updateLanguages = (newLang) => {
    onChange({
      ...data,
      languages: newLang
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: `lang-${Date.now()}`,
      name: "",
      level: "Professional Working"
    };
    updateLanguages([...languages, newItem]);
  };

  const handleRemove = (id) => {
    updateLanguages(languages.filter(l => l.id !== id));
  };

  const handleChange = (id, field, value) => {
    updateLanguages(languages.map(l => {
      if (l.id === id) {
        return { ...l, [field]: value };
      }
      return l;
    }));
  };

  const levels = [
    "Native / Bilingual",
    "Fluent",
    "Professional Working",
    "Limited Working",
    "Elementary",
    "Beginner"
  ];

  return (
    <div className="editor-subform">
      <div className="flex-between mb-3">
        <span className="text-muted-sm">{languages.length} languages</span>
        <button 
          type="button" 
          className="btn btn-sm btn-primary"
          onClick={handleAdd}
        >
          <Plus size={14} /> Add Language
        </button>
      </div>

      <div className="list-items-container">
        {languages.map((lang) => (
          <div key={lang.id} className="item-card compact-card">
            <div className="form-grid-flex">
              <div className="form-group flex-1">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. English, Spanish, Mandarin"
                  value={lang.name || ""}
                  onChange={(e) => handleChange(lang.id, "name", e.target.value)}
                />
              </div>

              <div className="form-group flex-1">
                <select 
                  className="form-select"
                  value={lang.level}
                  onChange={(e) => handleChange(lang.id, "level", e.target.value)}
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              <button 
                type="button" 
                className="icon-btn icon-btn-danger" 
                onClick={() => handleRemove(lang.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
