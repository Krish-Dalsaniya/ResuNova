import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SummaryForm({ data, onChange }) {
  const handleChange = (e) => {
    onChange({
      ...data,
      summary: e.target.value
    });
  };

  const templates = [
    "Results-oriented professional with extensive experience leading teams and driving strategic initiatives.",
    "Senior software engineer with deep expertise in full-stack architecture, microservices, and modern web development.",
    "Creative product leader experienced in user-centric design, rapid prototyping, and delivering high-impact SaaS products."
  ];

  const wordCount = (data.summary || "").trim() ? (data.summary || "").trim().split(/\s+/).length : 0;

  return (
    <div className="editor-subform">
      <div className="form-group">
        <div className="flex-between mb-1">
          <label className="input-label">Executive / Professional Summary</label>
          <span className="text-muted-sm">{wordCount} words</span>
        </div>
        <textarea 
          className="form-textarea" 
          rows={5}
          placeholder="Write a concise 2-4 sentence summary highlighting your top achievements, skills, and industry impact..."
          value={data.summary || ""}
          onChange={handleChange}
        />
      </div>

      <div className="inspiration-box">
        <div className="inspiration-title">
          <Sparkles size={14} className="text-amber" /> Quick Starters:
        </div>
        <div className="inspiration-chips">
          {templates.map((tpl, i) => (
            <button 
              key={i} 
              type="button" 
              className="chip-btn"
              onClick={() => onChange({ ...data, summary: tpl })}
            >
              "{tpl.slice(0, 48)}..."
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
