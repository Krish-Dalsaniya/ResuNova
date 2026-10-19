import React, { forwardRef, useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Scissors, Sparkles } from 'lucide-react';

import ModernExecutive from './templates/ModernExecutive';
import MinimalClean from './templates/MinimalClean';
import TechDuo from './templates/TechDuo';
import CreativeAccent from './templates/CreativeAccent';
import CompactClassic from './templates/CompactClassic';
import BoldTimeline from './templates/BoldTimeline';
import ElegantSerif from './templates/ElegantSerif';
import GraduateSidebar from './templates/GraduateSidebar';

import { adjustPageBreaks, A4_PAGE_HEIGHT } from '../../utils/pageBreakAdjuster';

class TemplateErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Template render failed:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '60px 40px', textAlign: 'center', color: '#b91c1c' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Template Rendering Notice</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>A field format issue occurred with the current resume data in this template.</p>
          <button 
            type="button" 
            onClick={() => this.setState({ hasError: false })}
            style={{ marginTop: '16px', padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Retry Render
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ResumeCanvas = forwardRef(function ResumeCanvas(
  { data, templateId, theme, font, spacing, zoom, setZoom },
  ref
) {
  const [sheetHeight, setSheetHeight] = useState(1123);
  const [autoPageBreak, setAutoPageBreak] = useState(true);
  const [pageCount, setPageCount] = useState(1);

  // Monitor sheet content and dynamically adjust sections that straddle page boundaries
  useEffect(() => {
    const target = ref?.current || document.getElementById('resume-to-print');
    if (!target) return;

    const performAdjustment = () => {
      const computedPages = adjustPageBreaks(target, autoPageBreak);
      const computedHeight = target.scrollHeight || target.offsetHeight || 1123;
      setSheetHeight(computedHeight);
      setPageCount(computedPages);
    };

    // Delay slightly to ensure fonts and layout dimensions have rendered
    const timer = setTimeout(performAdjustment, 40);

    const observer = new ResizeObserver(() => {
      performAdjustment();
    });
    observer.observe(target);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ref, data, templateId, spacing, font, autoPageBreak]);

  const renderTemplate = () => {
    const props = { data, theme, font, spacing };
    switch (templateId) {
      case 'minimal':
        return <MinimalClean {...props} />;
      case 'techduo':
        return <TechDuo {...props} />;
      case 'creative':
        return <CreativeAccent {...props} />;
      case 'compact':
        return <CompactClassic {...props} />;
      case 'timeline':
        return <BoldTimeline {...props} />;
      case 'elegant':
        return <ElegantSerif {...props} />;
      case 'graduate':
        return <GraduateSidebar {...props} />;
      case 'executive':
      default:
        return <ModernExecutive {...props} />;
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const handleZoomReset = () => setZoom(0.85);

  const effectiveHeight = Math.max(sheetHeight, pageCount * A4_PAGE_HEIGHT);

  return (
    <div className="preview-canvas-wrapper">
      {/* Floating Canvas Controls */}
      <div className="canvas-toolbar">
        <div className="zoom-controls">
          <button 
            type="button" 
            className="canvas-btn" 
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
          <button 
            type="button" 
            className="canvas-btn" 
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button 
            type="button" 
            className="canvas-btn" 
            onClick={handleZoomReset}
            title="Reset Zoom"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* Auto Page-Break Adjustment Toggle */}
        <button 
          type="button" 
          className={`canvas-btn canvas-toggle-btn ${autoPageBreak ? 'is-active' : ''}`}
          onClick={() => setAutoPageBreak(prev => !prev)}
          title="Automatically shift sections and cards so they never get sliced across page breaks"
        >
          <Scissors size={14} />
          <span>{autoPageBreak ? "Auto-Break: ON" : "Auto-Break: OFF"}</span>
        </button>

        <div className="paper-format-badge">
          <span>{pageCount > 1 ? `Multi-Page A4 (${pageCount} Pages)` : "Standard A4 (1 Page)"}</span>
        </div>
      </div>

      {/* Viewport with full scrollability */}
      <div className="paper-viewport">
        {/* Outer Sizer matches exact scaled dimensions to give the viewport perfect scroll bounds */}
        <div 
          className="paper-scroll-sizer"
          style={{
            width: `${794 * zoom}px`,
            minHeight: `${effectiveHeight * zoom}px`,
            position: 'relative'
          }}
        >
          {/* Scaled paper container */}
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
            {/* Printable Resume Container */}
            <div 
              id="resume-to-print" 
              ref={ref} 
              className="a4-resume-sheet"
            >
              <TemplateErrorBoundary key={templateId}>
                {renderTemplate()}
              </TemplateErrorBoundary>

              {/* Dynamic Page Break Indicators */}
              {Array.from({ length: Math.max(0, pageCount - 1) }, (_, idx) => {
                const pageNum = idx + 1;
                const breakTop = pageNum * A4_PAGE_HEIGHT;
                return (
                  <div key={pageNum} className="page-break-indicator" style={{ top: `${breakTop}px` }}>
                    <div className="page-break-tag-group">
                      <span className="page-break-tag page-break-tag-prev">Page {pageNum} End</span>
                      <span className="page-break-badge-center">
                        {autoPageBreak ? "Page Break Adjusted" : "A4 Page Cut Line"}
                      </span>
                      <span className="page-break-tag page-break-tag-next">Page {pageNum + 1} Start</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResumeCanvas;
