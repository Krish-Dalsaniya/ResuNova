import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Layout, 
  Palette, 
  Type, 
  Sliders, 
  Download, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  Upload, 
  Check, 
  ChevronDown, 
  Sun, 
  Moon,
  Mail,
  ALargeSmall,
  Heading,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

import { colorThemes, fontFamilies, templates, fontSizes, headerStyles } from '../data/sampleResume';
import { showAlert } from '../utils/alert';

export default function Navbar({
  selectedTemplate,
  onOpenTemplateModal,
  selectedTheme,
  onSelectTheme,
  selectedFont,
  onSelectFont,
  spacing,
  onSelectSpacing,
  selectedFontSize = 'regular',
  onSelectFontSize,
  selectedHeaderStyle = 'underline',
  onSelectHeaderStyle,
  onLoadSample,
  onResetData,
  onExportJSON,
  onImportJSON,
  onPrint,
  onDownloadPDF,
  isGeneratingPDF,
  appTheme,
  onToggleAppTheme,
  atsAnalysis,
  onOpenOptimizer,
  activeDoc = 'resume',
  onSelectActiveDoc
}) {
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSpacingMenu, setShowSpacingMenu] = useState(false);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
  const [showHeaderStyleMenu, setShowHeaderStyleMenu] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const jsonFileInputRef = useRef(null);
  const navRef = useRef(null);

  // Close any open dropdown if user clicks anywhere outside the navigation bar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeAllMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];
  const currentFontSize = fontSizes.find(f => f.id === selectedFontSize) || fontSizes[1];
  const currentHeaderStyle = headerStyles.find(h => h.id === selectedHeaderStyle) || headerStyles[0];

  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          onImportJSON(parsed);
        } catch (err) {
          showAlert({
            title: "Invalid File Format",
            text: "The selected file is not a valid ResuNova JSON resume backup.",
            icon: "error"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const closeAllMenus = () => {
    setShowColorMenu(false);
    setShowFontMenu(false);
    setShowSpacingMenu(false);
    setShowFontSizeMenu(false);
    setShowHeaderStyleMenu(false);
    setShowActionsMenu(false);
  };

  const toggleMenu = (setter, currentVal, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const next = !currentVal;
    closeAllMenus();
    setter(next);
  };

  return (
    <header className="app-navbar-container" ref={navRef}>
      {/* Tier 1: Main Application Header */}
      <div className="navbar-top-row">
        {/* Brand & Document Switcher */}
        <div className="navbar-brand-group">
          <div className="navbar-brand">
            <img 
              src={appTheme === 'dark' ? "/logo-dark.png" : "/logo-light.png"} 
              alt="ResuNova" 
              className="brand-logo-img" 
            />
            <span className="brand-badge">PRO</span>
          </div>

          {/* Document Switcher: Resume vs Matching Cover Letter */}
          {onSelectActiveDoc && (
            <div className="doc-mode-toggle">
              <button 
                type="button"
                className={`doc-mode-btn ${activeDoc === 'resume' ? 'is-active' : ''}`}
                onClick={() => onSelectActiveDoc('resume')}
                title="Edit and preview Resume"
              >
                <FileText size={14} />
                <span>Resume</span>
              </button>
              <button 
                type="button"
                className={`doc-mode-btn ${activeDoc === 'coverLetter' ? 'is-active' : ''}`}
                onClick={() => onSelectActiveDoc('coverLetter')}
                title="Edit matching 1-Page Cover Letter"
              >
                <Mail size={14} />
                <span>Cover Letter</span>
                <span className="doc-mode-badge">Match</span>
              </button>
            </div>
          )}
        </div>

        {/* Center Live Status Indicator */}
        <div className="navbar-center-status hide-mobile">
          <CheckCircle2 size={13} className="text-emerald" />
          <span>Auto-Saved to Browser</span>
        </div>

        {/* Right Primary Actions */}
        <div className="navbar-actions">
          {/* Live ATS Score Pill */}
          {onOpenOptimizer && (
            <button 
              type="button" 
              className="ats-score-pill-btn"
              onClick={onOpenOptimizer}
              title={`ATS Optimization Score: ${atsAnalysis?.score ?? 0}/100 (${atsAnalysis?.statusTier || 'Calculating...'}) - Click for Insights`}
            >
              <span 
                className="ats-mini-dot" 
                style={{ 
                  backgroundColor: atsAnalysis?.statusColor || 'var(--primary)', 
                  boxShadow: `0 0 8px ${atsAnalysis?.statusColor || 'var(--primary)'}` 
                }} 
              />
              <span 
                className="ats-score-pill-val" 
                style={{ color: atsAnalysis?.statusColor || 'var(--primary)' }}
              >
                {atsAnalysis?.score ?? 0}%
              </span>
              <span className="ats-score-pill-lbl hide-mobile">ATS Score</span>
            </button>
          )}

          {/* Data & Actions Dropdown (Sample, Clear, Import, Export) */}
          <div className="dropdown-wrapper">
            <button 
              type="button" 
              className={`btn btn-ghost btn-sm ${showActionsMenu ? 'is-active' : ''}`}
              onClick={(e) => toggleMenu(setShowActionsMenu, showActionsMenu, e)}
              title="File Actions & Samples"
            >
              <Sparkles size={14} className="text-amber" />
              <span className="hide-mobile">Actions</span>
              <ChevronDown size={13} />
            </button>

            {showActionsMenu && (
              <div className="dropdown-menu actions-menu">
                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => { onLoadSample(); closeAllMenus(); }}
                >
                  <Sparkles size={14} className="text-amber" />
                  <span>Load Sample Resume</span>
                </button>
                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => { jsonFileInputRef.current?.click(); closeAllMenus(); }}
                >
                  <Upload size={14} />
                  <span>Import Resume JSON</span>
                </button>
                <button 
                  type="button" 
                  className="dropdown-item" 
                  onClick={() => { onExportJSON(); closeAllMenus(); }}
                >
                  <Download size={14} />
                  <span>Export JSON Backup</span>
                </button>
                <div className="dropdown-divider" />
                <button 
                  type="button" 
                  className="dropdown-item text-danger" 
                  onClick={() => { onResetData(); closeAllMenus(); }}
                >
                  <RotateCcw size={14} />
                  <span>Clear All Fields</span>
                </button>
              </div>
            )}
          </div>

          {/* Hidden JSON file input */}
          <input 
            type="file" 
            ref={jsonFileInputRef} 
            style={{ display: 'none' }} 
            accept=".json"
            onChange={handleJsonUpload}
          />

          {/* Theme Toggle Button */}
          <button 
            type="button" 
            className="icon-btn theme-toggle-btn"
            onClick={onToggleAppTheme}
            title={appTheme === 'dark' ? "Switch to Light Studio" : "Switch to Dark Studio"}
          >
            {appTheme === 'dark' ? (
              <Sun size={17} className="text-amber" />
            ) : (
              <Moon size={17} className="text-indigo" />
            )}
          </button>

          {/* Native Print Button */}
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onPrint}
            title="Native Print / Save via Browser"
          >
            <Printer size={15} />
            <span className="hide-mobile">Print</span>
          </button>

          {/* Download PDF Button — Prominent Hero CTA */}
          <button 
            type="button" 
            className="btn btn-primary btn-sm btn-download-hero"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            title={activeDoc === 'coverLetter' ? "Download Cover Letter PDF" : "Download Resume PDF"}
          >
            <Download size={15} />
            <span>
              {isGeneratingPDF 
                ? "Generating PDF..." 
                : activeDoc === 'coverLetter' 
                ? "Download Letter" 
                : "Download PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* Tier 2: Customization & Formatting Toolbar */}
      <div className="navbar-sub-row">
        <div className="sub-row-inner">
          {/* Template Selector Trigger */}
          <button 
            type="button" 
            className="tool-btn highlight-btn"
            onClick={() => { closeAllMenus(); onOpenTemplateModal(); }}
            title="Browse Resume Templates"
          >
            <Layout size={15} />
            <span className="tool-label">Template:</span>
            <strong className="tool-value">{currentTemplate.name}</strong>
            <ChevronDown size={13} />
          </button>

          <span className="tool-divider" />

          {/* Color Palette Menu */}
          <div className="dropdown-wrapper">
            <button 
              type="button" 
              className={`tool-btn ${showColorMenu ? 'highlight-btn' : ''}`}
              onClick={(e) => toggleMenu(setShowColorMenu, showColorMenu, e)}
              title="Choose Palette"
            >
              <span 
                className="color-dot-indicator" 
                style={{ backgroundColor: selectedTheme.primary }} 
              />
              <span className="tool-label">Color:</span>
              <span className="tool-value">{selectedTheme.name}</span>
              <ChevronDown size={13} />
            </button>

            {showColorMenu && (
              <div className="dropdown-menu color-menu">
                <div className="dropdown-title">Color Palettes</div>
                <div className="color-swatches-grid">
                  {colorThemes.map((thm) => (
                    <button
                      key={thm.id}
                      type="button"
                      className={`color-swatch-item ${selectedTheme.id === thm.id ? 'active' : ''}`}
                      onClick={() => {
                        onSelectTheme(thm);
                        closeAllMenus();
                      }}
                    >
                      <span className="swatch-bubble" style={{ backgroundColor: thm.primary }} />
                      <span className="swatch-label">{thm.name}</span>
                      {selectedTheme.id === thm.id && <Check size={14} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Font Family Menu */}
          <div className="dropdown-wrapper">
            <button 
              type="button" 
              className={`tool-btn ${showFontMenu ? 'highlight-btn' : ''}`}
              onClick={(e) => toggleMenu(setShowFontMenu, showFontMenu, e)}
              title="Choose Typography"
            >
              <Type size={15} />
              <span className="tool-label">Font:</span>
              <span className="tool-value">{selectedFont.name.split(' ')[0]}</span>
              <ChevronDown size={13} />
            </button>

            {showFontMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-title">Typography</div>
                {fontFamilies.map((fnt) => (
                  <button
                    key={fnt.id}
                    type="button"
                    className={`dropdown-item ${selectedFont.id === fnt.id ? 'active' : ''}`}
                    style={{ fontFamily: fnt.font }}
                    onClick={() => {
                      onSelectFont(fnt);
                      closeAllMenus();
                    }}
                  >
                    <span>{fnt.name}</span>
                    {selectedFont.id === fnt.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Font Size Scaling (NovoResume Density) */}
          {onSelectFontSize && (
            <div className="dropdown-wrapper">
              <button 
                type="button" 
                className={`tool-btn ${showFontSizeMenu ? 'highlight-btn' : ''}`}
                onClick={(e) => toggleMenu(setShowFontSizeMenu, showFontSizeMenu, e)}
                title="Font Size & Layout Density"
              >
                <ALargeSmall size={15} />
                <span className="tool-label">Size:</span>
                <span className="tool-value">{currentFontSize?.label || "10pt"}</span>
                <ChevronDown size={13} />
              </button>

              {showFontSizeMenu && (
                <div className="dropdown-menu" style={{ minWidth: '220px' }}>
                  <div className="dropdown-title">Font Size & Density</div>
                  {fontSizes.map((fSize) => (
                    <button
                      key={fSize.id}
                      type="button"
                      className={`dropdown-item ${selectedFontSize === fSize.id ? 'active' : ''}`}
                      onClick={() => {
                        onSelectFontSize(fSize.id);
                        closeAllMenus();
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                        <span style={{ fontWeight: 600 }}>{fSize.name}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fSize.desc}</span>
                      </div>
                      {selectedFontSize === fSize.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Spacing Selector */}
          <div className="dropdown-wrapper">
            <button 
              type="button" 
              className={`tool-btn ${showSpacingMenu ? 'highlight-btn' : ''}`}
              onClick={(e) => toggleMenu(setShowSpacingMenu, showSpacingMenu, e)}
              title="Layout Spacing"
            >
              <Sliders size={14} />
              <span className="tool-label">Spacing:</span>
              <span className="tool-value capitalize">{spacing}</span>
              <ChevronDown size={13} />
            </button>

            {showSpacingMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-title">Document Spacing</div>
                {['compact', 'balanced', 'spacious'].map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    className={`dropdown-item capitalize ${spacing === sp ? 'active' : ''}`}
                    onClick={() => {
                      onSelectSpacing(sp);
                      closeAllMenus();
                    }}
                  >
                    <span>{sp}</span>
                    {spacing === sp && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section Header Accent Style */}
          {onSelectHeaderStyle && (
            <div className="dropdown-wrapper">
              <button 
                type="button" 
                className={`tool-btn ${showHeaderStyleMenu ? 'highlight-btn' : ''}`}
                onClick={(e) => toggleMenu(setShowHeaderStyleMenu, showHeaderStyleMenu, e)}
                title="Section Header Accent Style"
              >
                <Heading size={15} />
                <span className="tool-label">Header:</span>
                <span className="tool-value">{currentHeaderStyle?.name.split(' ')[0] || "Underline"}</span>
                <ChevronDown size={13} />
              </button>

              {showHeaderStyleMenu && (
                <div className="dropdown-menu" style={{ minWidth: '230px' }}>
                  <div className="dropdown-title">Header Accent Styles</div>
                  {headerStyles.map((hStyle) => (
                    <button
                      key={hStyle.id}
                      type="button"
                      className={`dropdown-item ${selectedHeaderStyle === hStyle.id ? 'active' : ''}`}
                      onClick={() => {
                        onSelectHeaderStyle(hStyle.id);
                        closeAllMenus();
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', textAlign: 'left' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem', minWidth: '18px', textAlign: 'center', color: 'var(--primary)' }}>
                          {hStyle.icon}
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: 600 }}>{hStyle.name}</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hStyle.desc}</span>
                        </div>
                      </div>
                      {selectedHeaderStyle === hStyle.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
