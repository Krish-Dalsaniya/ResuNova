import React, { forwardRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

const CoverLetterCanvas = forwardRef(function CoverLetterCanvas(
  { 
    resumeData, 
    coverLetterData, 
    templateId, 
    theme, 
    font, 
    spacing, 
    fontSize = 'regular',
    headerStyle = 'underline',
    zoom, 
    setZoom 
  },
  ref
) {
  const personalInfo = resumeData?.personalInfo || {};
  const recipient = coverLetterData?.recipient || {};
  const letter = coverLetterData?.letter || {};

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(1.4, Math.max(0.4, Number((prev + delta).toFixed(2)))));
  };

  const handleResetZoom = () => {
    setZoom(0.85);
  };

  return (
    <div className="preview-canvas-wrapper">
      {/* Floating Canvas Controls */}
      <div className="canvas-toolbar">
        <div className="zoom-controls">
          <button 
            type="button" 
            className="canvas-btn" 
            onClick={() => handleZoom(-0.1)} 
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
          <button 
            type="button" 
            className="canvas-btn" 
            onClick={() => handleZoom(0.1)} 
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button 
            type="button" 
            className="canvas-btn" 
            onClick={handleResetZoom} 
            title="Reset Zoom"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* 1-Page Badge */}
        <div className="paper-format-badge">
          <span>Matching A4 Cover Letter (1 Page)</span>
        </div>
      </div>

      {/* Viewport with full scrollability */}
      <div className="paper-viewport">
        <div 
          className="paper-scroll-sizer"
          style={{
            width: `${794 * zoom}px`,
            minHeight: `${1123 * zoom}px`,
            position: 'relative'
          }}
        >
          <div 
            className="paper-scale-container"
            style={{ 
              transform: `scale(${zoom})`, 
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '794px'
            }}
          >
          {/* Printable Document Root */}
          <div 
            ref={ref} 
            id="cover-letter-to-print" 
            className={`resume-sheet cover-letter-sheet font-scale-${fontSize} header-style-${headerStyle}`}
            style={{
              width: '210mm',
              minHeight: '297mm',
              height: '297mm',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--paper-shadow)',
              fontFamily: font?.font,
              color: theme?.text,
              position: 'relative',
              overflow: 'hidden',
              '--theme-primary': theme?.primary,
              '--theme-secondary': theme?.secondary,
              '--theme-accent': theme?.accent,
              '--theme-text': theme?.text
            }}
          >
            {/* Template Specific Matching Letterhead */}
            {/* 1. Creative Accent Banner */}
            {templateId === 'creative' && (
              <div className="creative-banner" style={{ backgroundColor: theme.primary, color: '#ffffff', padding: '24px 32px' }}>
                <div className="creative-banner-inner">
                  {personalInfo.showAvatar && personalInfo.avatar && (
                    <div className="creative-avatar-box">
                      <img src={personalInfo.avatar} alt={personalInfo.fullName} className="creative-avatar" />
                    </div>
                  )}
                  <div className="creative-header-text">
                    <h1 className="creative-name" style={{ color: '#ffffff', fontSize: '1.8rem' }}>
                      {personalInfo.fullName || "Your Full Name"}
                    </h1>
                    <p className="creative-role" style={{ color: theme.accent, fontSize: '0.95rem' }}>
                      {personalInfo.jobTitle || "Professional Title"}
                    </p>
                  </div>
                </div>
                <div className="creative-banner-contacts" style={{ backgroundColor: 'rgba(0,0,0,0.15)', marginTop: '12px' }}>
                  {personalInfo.email && <span><Mail size={11} /> {personalInfo.email}</span>}
                  {personalInfo.phone && <span><Phone size={11} /> {personalInfo.phone}</span>}
                  {personalInfo.location && <span><MapPin size={11} /> {personalInfo.location}</span>}
                  {personalInfo.linkedin && <span><LinkedinIcon size={11} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                </div>
              </div>
            )}

            {/* 2. Bold Timeline Hero */}
            {templateId === 'timeline' && (
              <header className="timeline-hero" style={{ padding: '24px 36px 14px' }}>
                <div className="timeline-hero-accent" style={{ backgroundColor: theme?.primary }} />
                <div className="timeline-hero-content">
                  {personalInfo.showAvatar && personalInfo.avatar && (
                    <div className="timeline-avatar-wrap">
                      <img 
                        src={personalInfo.avatar} 
                        alt={personalInfo.fullName} 
                        className="timeline-avatar-img"
                        style={{ borderColor: theme?.primary }}
                      />
                    </div>
                  )}
                  <div className="timeline-identity">
                    <h1 className="timeline-name" style={{ color: theme?.primary, fontSize: '1.85rem' }}>
                      {personalInfo.fullName || "Your Full Name"}
                    </h1>
                    <p className="timeline-role" style={{ color: theme?.secondary, fontSize: '0.95rem' }}>
                      {personalInfo.jobTitle || "Professional Title"}
                    </p>
                  </div>
                </div>
                <div className="timeline-contact-strip" style={{ backgroundColor: theme?.bgSidebar, borderColor: theme?.accent, marginTop: '12px' }}>
                  {personalInfo.email && <div className="timeline-contact-item"><Mail size={11} style={{ color: theme?.primary }} /> {personalInfo.email}</div>}
                  {personalInfo.phone && <div className="timeline-contact-item"><Phone size={11} style={{ color: theme?.primary }} /> {personalInfo.phone}</div>}
                  {personalInfo.location && <div className="timeline-contact-item"><MapPin size={11} style={{ color: theme?.primary }} /> {personalInfo.location}</div>}
                  {personalInfo.linkedin && <div className="timeline-contact-item"><LinkedinIcon size={11} style={{ color: theme?.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</div>}
                </div>
              </header>
            )}

            {/* 3. Modern Executive / TechDuo / Minimal / Compact / Elegant Letterhead */}
            {templateId !== 'creative' && templateId !== 'timeline' && (
              <header 
                className="cover-letter-header"
                style={{
                  padding: '36px 44px 20px',
                  borderBottom: `2px solid ${theme?.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                <div className="cl-header-titles">
                  <h1 
                    style={{ 
                      color: theme?.primary, 
                      fontSize: '1.9rem', 
                      fontWeight: 800, 
                      letterSpacing: '-0.02em', 
                      margin: 0, 
                      lineHeight: 1.15 
                    }}
                  >
                    {personalInfo.fullName || "Your Full Name"}
                  </h1>
                  <p 
                    style={{ 
                      color: theme?.secondary || '#64748b', 
                      fontSize: '0.95rem', 
                      fontWeight: 600, 
                      marginTop: '4px', 
                      margin: 0 
                    }}
                  >
                    {personalInfo.jobTitle || "Professional Title"}
                  </p>
                </div>

                <div 
                  className="cl-header-contacts"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                    fontSize: '0.78rem',
                    color: '#64748b'
                  }}
                >
                  {personalInfo.email && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Mail size={12} style={{ color: theme?.primary }} /> {personalInfo.email}
                    </span>
                  )}
                  {personalInfo.phone && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Phone size={12} style={{ color: theme?.primary }} /> {personalInfo.phone}
                    </span>
                  )}
                  {personalInfo.location && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={12} style={{ color: theme?.primary }} /> {personalInfo.location}
                    </span>
                  )}
                  {personalInfo.linkedin && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <LinkedinIcon size={12} style={{ color: theme?.primary }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  )}
                </div>
              </header>
            )}

            {/* Letter Body Area */}
            <div 
              className="cover-letter-body-content"
              style={{
                padding: templateId === 'creative' || templateId === 'timeline' ? '28px 44px 44px' : '28px 44px 44px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}
            >
              {/* Date & Recipient Block */}
              <div 
                className="cl-meta-grid"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  paddingBottom: '14px',
                  borderBottom: `1px solid ${theme?.accent || '#e2e8f0'}`
                }}
              >
                <div 
                  className="cl-recipient-box"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    fontSize: '0.84rem',
                    lineHeight: 1.45
                  }}
                >
                  <strong style={{ fontSize: '0.92rem', color: theme?.text || '#0f172a' }}>
                    {recipient.hiringManager || "Hiring Manager"}
                  </strong>
                  {recipient.roleTitle && <span style={{ color: theme?.secondary }}>{recipient.roleTitle}</span>}
                  {recipient.company && <strong style={{ color: theme?.primary }}>{recipient.company}</strong>}
                  {recipient.address && <span>{recipient.address}</span>}
                  {recipient.cityStateZip && <span>{recipient.cityStateZip}</span>}
                </div>

                <div 
                  className="cl-date-box"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#64748b'
                  }}
                >
                  {recipient.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Subject Line (if provided) */}
              {letter.subject && (
                <div 
                  className="cl-subject-bar"
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: theme?.primary,
                    padding: '4px 0'
                  }}
                >
                  RE: {letter.subject}
                </div>
              )}

              {/* Salutation */}
              <div 
                className="cl-salutation"
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: theme?.text || '#0f172a'
                }}
              >
                {letter.salutation || "Dear Hiring Team,"}
              </div>

              {/* Letter Paragraphs */}
              <div 
                className="cl-paragraphs"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontSize: '0.88rem',
                  lineHeight: 1.68,
                  color: theme?.text || '#334155'
                }}
              >
                {letter.intro && <p style={{ margin: 0, textAlign: 'justify' }}>{letter.intro}</p>}
                {letter.body1 && <p style={{ margin: 0, textAlign: 'justify' }}>{letter.body1}</p>}
                {letter.body2 && <p style={{ margin: 0, textAlign: 'justify' }}>{letter.body2}</p>}
                {letter.conclusion && <p style={{ margin: 0, textAlign: 'justify' }}>{letter.conclusion}</p>}
              </div>

              {/* Sign-off & Signature */}
              <div 
                className="cl-signoff-wrap"
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '0.9rem', color: theme?.text || '#334155' }}>
                  {letter.signOff || "Sincerely,"}
                </span>

                <div 
                  className="cl-signature-name"
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: theme?.primary,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {letter.signatureName || personalInfo.fullName || "Your Full Name"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
});

export default CoverLetterCanvas;
