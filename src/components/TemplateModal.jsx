import React from 'react';
import { X, Check } from 'lucide-react';
import { templates } from '../data/sampleResume';

export default function TemplateModal({ isOpen, onClose, selectedTemplate, onSelectTemplate }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Select Resume Template</h2>
            <p className="modal-subtitle">Choose from professionally crafted layouts optimized for readability and ATS parsing.</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="templates-grid">
            {templates.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div 
                  key={tpl.id}
                  className={`template-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    onSelectTemplate(tpl.id);
                    onClose();
                  }}
                >
                  <div className="template-card-preview">
                    {/* Visual miniature representation */}
                    <div className={`mini-preview mini-preview-${tpl.id}`}>
                      {tpl.id === 'executive' && (
                        <div className="mini-exec">
                          <div className="mini-sidebar" />
                          <div className="mini-main">
                            <div className="mini-line mini-line-title" />
                            <div className="mini-line" />
                            <div className="mini-block" />
                            <div className="mini-block" />
                          </div>
                        </div>
                      )}
                      {tpl.id === 'minimal' && (
                        <div className="mini-clean">
                          <div className="mini-line mini-line-center" />
                          <div className="mini-line-sub" />
                          <div className="mini-block-full" />
                          <div className="mini-block-full" />
                        </div>
                      )}
                      {tpl.id === 'techduo' && (
                        <div className="mini-tech">
                          <div className="mini-header-bar" />
                          <div className="mini-dual-grid">
                            <div className="mini-col-60" />
                            <div className="mini-col-40" />
                          </div>
                        </div>
                      )}
                      {tpl.id === 'creative' && (
                        <div className="mini-creative">
                          <div className="mini-banner" />
                          <div className="mini-dual-grid">
                            <div className="mini-col-65" />
                            <div className="mini-col-35" />
                          </div>
                        </div>
                      )}
                      {tpl.id === 'compact' && (
                        <div className="mini-compact">
                          <div className="mini-header-center" />
                          <div className="mini-lines-dense" />
                        </div>
                      )}
                      {tpl.id === 'timeline' && (
                        <div className="mini-timeline">
                          <div className="mini-header-bar" />
                          <div className="mini-timeline-body">
                            <div className="mini-timeline-track">
                              <span className="mini-dot" />
                              <span className="mini-dot" />
                              <span className="mini-dot" />
                            </div>
                            <div className="mini-timeline-text" />
                          </div>
                        </div>
                      )}
                      {tpl.id === 'elegant' && (
                        <div className="mini-elegant">
                          <div className="mini-top-rule" />
                          <div className="mini-line-center" style={{ width: '50%' }} />
                          <div className="mini-line-sub" style={{ width: '30%' }} />
                          <div className="mini-dual-grid" style={{ marginTop: '6px' }}>
                            <div className="mini-col-50" />
                            <div className="mini-col-50" />
                          </div>
                        </div>
                      )}
                      {tpl.id === 'graduate' && (
                        <div className="mini-grad">
                          <div className="mini-grad-main">
                            <div className="mini-line mini-line-title" style={{ width: '80%' }} />
                            <div className="mini-block" />
                            <div className="mini-block" />
                          </div>
                          <div className="mini-grad-sidebar" />
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <div className="selected-badge">
                        <Check size={14} /> Active
                      </div>
                    )}
                  </div>

                  <div className="template-card-info">
                    <h3 className="template-name">{tpl.name}</h3>
                    <span className="template-tagline">{tpl.tagline}</span>
                    <p className="template-desc">{tpl.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
