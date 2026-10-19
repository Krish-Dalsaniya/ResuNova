import React, { useState, useRef } from 'react';
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
  Moon
} from 'lucide-react';

import { colorThemes, fontFamilies, templates } from '../data/sampleResume';
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
  onLoadSample,
  onResetData,
  onExportJSON,
  onImportJSON,
  onPrint,
  onDownloadPDF,
  isGeneratingPDF,
  appTheme,
  onToggleAppTheme
}) {
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSpacingMenu, setShowSpacingMenu] = useState(false);
  const jsonFileInputRef = useRef(null);

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

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

  return (
    <header className="app-navbar">
      {/* Brand Logo (Light / Dark) */}
      <div className="navbar-brand">
        <img 
          src={appTheme === 'dark' ? "/logo-dark.png" : "/logo-light.png"} 
          alt="ResuNova" 
          className="brand-logo-img" 
        />
        <span className="brand-badge hide-mobile">Studio Pro</span>
      </div>

      {/* Main Customization Tools */}
      <div className="navbar-toolbar">
        {/* Template Selector Trigger */}
        <button 
          type="button" 
          className="tool-btn highlight-btn"
          onClick={onOpenTemplateModal}
          title="Select Resume Template"
        >
          <Layout size={16} />
          <span className="tool-label">Template:</span>
          <strong className="tool-value">{currentTemplate.name}</strong>
          <ChevronDown size={14} />
        </button>

        {/* Color Palette Menu */}
        <div className="dropdown-wrapper">
          <button 
            type="button" 
            className="tool-btn"
            onClick={() => setShowColorMenu(!showColorMenu)}
            title="Choose Color Palette"
          >
            <span 
              className="color-dot-indicator" 
              style={{ backgroundColor: selectedTheme.primary }} 
            />
            <span className="tool-label">Color:</span>
            <span className="tool-value">{selectedTheme.name}</span>
            <ChevronDown size={14} />
          </button>

          {showColorMenu && (
            <div className="dropdown-menu color-menu" onMouseLeave={() => setShowColorMenu(false)}>
              <div className="dropdown-title">Color Palettes</div>
              <div className="color-swatches-grid">
                {colorThemes.map((thm) => (
                  <button
                    key={thm.id}
                    type="button"
                    className={`color-swatch-item ${selectedTheme.id === thm.id ? 'active' : ''}`}
                    onClick={() => {
                      onSelectTheme(thm);
                      setShowColorMenu(false);
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
            className="tool-btn"
            onClick={() => setShowFontMenu(!showFontMenu)}
            title="Choose Typography"
          >
            <Type size={16} />
            <span className="tool-label">Font:</span>
            <span className="tool-value">{selectedFont.name.split(' ')[0]}</span>
            <ChevronDown size={14} />
          </button>

          {showFontMenu && (
            <div className="dropdown-menu" onMouseLeave={() => setShowFontMenu(false)}>
              <div className="dropdown-title">Typography</div>
              {fontFamilies.map((fnt) => (
                <button
                  key={fnt.id}
                  type="button"
                  className={`dropdown-item ${selectedFont.id === fnt.id ? 'active' : ''}`}
                  style={{ fontFamily: fnt.font }}
                  onClick={() => {
                    onSelectFont(fnt);
                    setShowFontMenu(false);
                  }}
                >
                  <span>{fnt.name}</span>
                  {selectedFont.id === fnt.id && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Spacing Selector */}
        <div className="dropdown-wrapper">
          <button 
            type="button" 
            className="tool-btn"
            onClick={() => setShowSpacingMenu(!showSpacingMenu)}
            title="Layout Spacing"
          >
            <Sliders size={16} />
            <span className="tool-label">Spacing:</span>
            <span className="tool-value capitalize">{spacing}</span>
            <ChevronDown size={14} />
          </button>

          {showSpacingMenu && (
            <div className="dropdown-menu" onMouseLeave={() => setShowSpacingMenu(false)}>
              <div className="dropdown-title">Document Spacing</div>
              {['compact', 'balanced', 'spacious'].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  className={`dropdown-item capitalize ${spacing === sp ? 'active' : ''}`}
                  onClick={() => {
                    onSelectSpacing(sp);
                    setShowSpacingMenu(false);
                  }}
                >
                  <span>{sp}</span>
                  {spacing === sp && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side Actions: Sample, Reset, Export, Download */}
      <div className="navbar-actions">
        {/* Sample Data & Reset */}
        <button 
          type="button" 
          className="btn btn-ghost btn-sm"
          onClick={onLoadSample}
          title="Load Sample Data"
        >
          <Sparkles size={14} className="text-amber" />
          <span className="hide-mobile">Sample</span>
        </button>

        <button 
          type="button" 
          className="btn btn-ghost btn-sm"
          onClick={onResetData}
          title="Clear / Reset All Fields"
        >
          <RotateCcw size={14} />
          <span className="hide-mobile">Clear</span>
        </button>

        {/* Hidden JSON file input */}
        <input 
          type="file" 
          ref={jsonFileInputRef} 
          style={{ display: 'none' }} 
          accept=".json"
          onChange={handleJsonUpload}
        />
        <button 
          type="button" 
          className="btn btn-ghost btn-sm"
          onClick={() => jsonFileInputRef.current?.click()}
          title="Import Resume JSON"
        >
          <Upload size={14} />
          <span className="hide-mobile">Import</span>
        </button>

        {/* Theme Toggle Button (Light/Dark Mode) */}
        <button 
          type="button" 
          className="btn btn-ghost btn-sm theme-toggle-btn"
          onClick={onToggleAppTheme}
          title={appTheme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {appTheme === 'dark' ? (
            <Sun size={15} className="text-amber" />
          ) : (
            <Moon size={15} className="text-indigo" />
          )}
          <span className="hide-mobile">{appTheme === 'dark' ? "Light" : "Dark"}</span>
        </button>

        {/* Print Button */}
        <button 
          type="button" 
          className="btn btn-secondary btn-sm"
          onClick={onPrint}
          title="Print Resume (Native Browser Print)"
        >
          <Printer size={15} />
          <span className="hide-mobile">Print</span>
        </button>

        {/* Download PDF Button */}
        <button 
          type="button" 
          className="btn btn-success btn-sm font-semibold"
          onClick={onDownloadPDF}
          disabled={isGeneratingPDF}
          title="Download PDF Document"
        >
          <Download size={15} />
          <span>{isGeneratingPDF ? "Generating PDF..." : "Download PDF"}</span>
        </button>
      </div>
    </header>
  );
}
