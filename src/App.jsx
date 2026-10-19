import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Navbar from './components/Navbar';
import FormEditor from './components/Editor/FormEditor';
import ResumeCanvas from './components/Preview/ResumeCanvas';
import TemplateModal from './components/TemplateModal';
import ResumeOptimizerModal from './components/ResumeOptimizerModal';
import CoverLetterEditor from './components/Editor/CoverLetterEditor';
import CoverLetterCanvas from './components/Preview/CoverLetterCanvas';

import { 
  initialResumeData, 
  emptyResumeData, 
  initialCoverLetterData,
  colorThemes, 
  fontFamilies, 
  templates 
} from './data/sampleResume';

import { adjustPageBreaks } from './utils/pageBreakAdjuster';
import { showAlert, showConfirm, showSwalToast } from './utils/alert';
import { calculateAtsScore } from './utils/atsScorer';

export default function App() {
  const [activeDoc, setActiveDoc] = useState('resume'); // 'resume' | 'coverLetter'
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);

  // Load initial data from localStorage if available
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resunova_resume_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load saved resume", e);
    }
    return initialResumeData;
  });

  // Load cover letter data from localStorage if available
  const [coverLetterData, setCoverLetterData] = useState(() => {
    try {
      const saved = localStorage.getItem('resunova_cover_letter_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load saved cover letter", e);
    }
    return initialCoverLetterData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0]);
  const [selectedFont, setSelectedFont] = useState(fontFamilies[0]);
  const [spacing, setSpacing] = useState('balanced');
  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('resunova_font_size');
      if (saved) return saved;
    } catch (e) {
      console.error("Failed to load font size", e);
    }
    return 'regular';
  });
  const [headerStyle, setHeaderStyle] = useState(() => {
    try {
      const saved = localStorage.getItem('resunova_header_style');
      if (saved) return saved;
    } catch (e) {
      console.error("Failed to load header style", e);
    }
    return 'underline';
  });
  const [zoom, setZoom] = useState(0.85);

  // App UI theme (dark or light studio)
  const [appTheme, setAppTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('resunova_app_theme');
      if (savedTheme) return savedTheme;
    } catch (e) {
      console.error("Failed to load app theme", e);
    }
    return 'light'; // Default to clean modern Light theme
  });

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [toast, setToast] = useState(null);

  // Document element refs for PDF generation & native print
  const resumePrintRef = useRef(null);
  const coverLetterPrintRef = useRef(null);

  // Auto-save cover letter to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resunova_cover_letter_data', JSON.stringify(coverLetterData));
    } catch (e) {
      console.error("Failed to save cover letter to localStorage", e);
    }
  }, [coverLetterData]);

  // Sync appTheme with document element and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme);
    try {
      localStorage.setItem('resunova_app_theme', appTheme);
    } catch (e) {
      console.error("Failed to save app theme", e);
    }
  }, [appTheme]);

  const toggleAppTheme = () => {
    const nextTheme = appTheme === 'light' ? 'dark' : 'light';
    setAppTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Studio theme`, "info");
  };

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resunova_resume_data', JSON.stringify(resumeData));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [resumeData]);

  // Auto-save font size to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resunova_font_size', fontSize);
    } catch (e) {
      console.error("Failed to save font size to localStorage", e);
    }
  }, [fontSize]);

  // Auto-save header style to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resunova_header_style', headerStyle);
    } catch (e) {
      console.error("Failed to save header style to localStorage", e);
    }
  }, [headerStyle]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleLoadSample = async () => {
    const confirmed = await showConfirm({
      title: "Load Sample Resume?",
      text: "This will replace your current edits with our comprehensive executive sample resume.",
      icon: "question",
      confirmButtonText: "Yes, Load Sample"
    });
    if (confirmed) {
      setResumeData(initialResumeData);
      showToast("Sample data loaded successfully!", "success");
    }
  };

  const handleResetData = async () => {
    const confirmed = await showConfirm({
      title: "Clear Entire Resume?",
      text: "Are you sure? All sections, entries, and inputs will be cleared.",
      icon: "warning",
      confirmButtonText: "Yes, Clear Everything",
      isDanger: true
    });
    if (confirmed) {
      setResumeData(emptyResumeData);
      showToast("Resume cleared.", "info");
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `resume_${(resumeData.personalInfo?.fullName || 'export').replace(/\s+/g, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Resume exported as JSON file.", "success");
  };

  const handleImportJSON = (importedData) => {
    if (importedData && typeof importedData === 'object' && importedData.personalInfo) {
      setResumeData(importedData);
      showToast("Resume data imported successfully!", "success");
    } else {
      showAlert({
        title: "Import Error",
        text: "The uploaded file does not match ResuNova resume backup structure.",
        icon: "error"
      });
    }
  };

  const handlePrint = () => {
    if (activeDoc === 'coverLetter') {
      window.print();
      return;
    }
    const element = resumePrintRef.current || document.getElementById('resume-to-print');
    if (element) {
      adjustPageBreaks(element, true);
    }
    setTimeout(() => {
      window.print();
    }, 50);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    const prevZoom = zoom;

    try {
      if (activeDoc === 'coverLetter') {
        const element = coverLetterPrintRef.current || document.getElementById('cover-letter-to-print');
        if (!element) return;

        showToast("Generating 1-page Cover Letter PDF...", "info");

        // Temporarily reset zoom to 1:1 for pixel-perfect unscaled vector-sharp capture
        setZoom(1);
        await new Promise(r => setTimeout(r, 80));

        const fullHeight = 1123;
        const fullWidth = 794;

        const canvas = await html2canvas(element, {
          scale: 2, // 2x DPI for crisp 300 DPI high-resolution export
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: fullWidth,
          height: fullHeight,
          windowWidth: fullWidth,
          windowHeight: fullHeight,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            const clonedEl = clonedDoc.getElementById('cover-letter-to-print');
            if (clonedEl) {
              clonedEl.style.transform = 'none';
              clonedEl.style.boxShadow = 'none';
              clonedEl.style.margin = '0';
              const parentScale = clonedEl.closest('.paper-scale-container');
              if (parentScale) {
                parentScale.style.transform = 'none';
                parentScale.style.position = 'static';
                parentScale.style.width = '794px';
                parentScale.style.height = 'auto';
              }
            }
            clonedDoc.querySelectorAll('.canvas-toolbar, .paper-format-badge, .zoom-controls, .app-navbar-container, .app-navbar, .studio-editor-panel').forEach(el => el.remove());
          }
        });

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

        const fileName = `${(resumeData.personalInfo?.fullName || 'Cover_Letter').replace(/\s+/g, '_')}_Cover_Letter.pdf`;
        pdf.save(fileName);
        showToast("Downloaded Cover Letter PDF!", "success");
        return;
      }

      const element = resumePrintRef.current || document.getElementById('resume-to-print');
      if (!element) return;

      showToast("Generating multi-page PDF...", "info");

      // Temporarily reset zoom to 1:1 for pixel-perfect unscaled vector-sharp capture
      setZoom(1);
      await new Promise(r => setTimeout(r, 80));

      // Ensure element has auto-adjusted page breaks
      adjustPageBreaks(element, true);

      // Capture the unscaled element at full resolution
      const fullHeight = element.scrollHeight || element.offsetHeight;
      const fullWidth = 794; // Standard A4 width at 96 DPI

      const canvas = await html2canvas(element, {
        scale: 2, // 2x DPI for crisp high-resolution print quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: fullWidth,
        height: fullHeight,
        windowWidth: fullWidth,
        windowHeight: fullHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // In cloned DOM, ensure no transforms or constraints limit full height
          const clonedElement = clonedDoc.getElementById('resume-to-print');
          if (clonedElement) {
            adjustPageBreaks(clonedElement, true);
            clonedElement.style.transform = 'none';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.height = 'auto';
            clonedElement.style.maxHeight = 'none';

            // Remove scale wrapper constraints
            const parentScale = clonedElement.closest('.paper-scale-container');
            if (parentScale) {
              parentScale.style.transform = 'none';
              parentScale.style.position = 'static';
              parentScale.style.width = '794px';
              parentScale.style.height = 'auto';
            }

            const parentSizer = clonedElement.closest('.paper-scroll-sizer');
            if (parentSizer) {
              parentSizer.style.transform = 'none';
              parentSizer.style.width = '794px';
              parentSizer.style.height = 'auto';
            }

            // Remove visual page break dashed indicators and any studio controls from exported PDF
            clonedDoc.querySelectorAll('.page-break-indicator, .canvas-toolbar, .paper-format-badge, .zoom-controls, .app-navbar-container, .app-navbar, .studio-editor-panel').forEach(el => el.remove());
          }
        }
      });

      // Standard A4 aspect ratio: 297mm height / 210mm width = 1.4142857
      const pageCanvasHeight = Math.floor(canvas.width * (297 / 210));
      // Total pages needed to hold all resume content (avoid creating an empty trailing page for small padding)
      const totalPages = Math.max(1, Math.ceil((canvas.height - 40) / pageCanvasHeight));

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Create discrete slice canvas for this specific A4 page
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageCanvasHeight;
        const ctx = pageCanvas.getContext('2d');

        // Fill background with white
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Calculate source rectangle
        const srcY = page * pageCanvasHeight;
        const srcRemaining = canvas.height - srcY;
        const sliceHeight = Math.min(pageCanvasHeight, Math.max(0, srcRemaining));

        if (sliceHeight > 0) {
          ctx.drawImage(
            canvas,
            0, srcY, canvas.width, sliceHeight, // Source slice
            0, 0, canvas.width, sliceHeight     // Destination slice
          );
        }

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(pageImgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      const fileName = `${(resumeData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
      showToast(`Downloaded ${totalPages} page${totalPages > 1 ? 's' : ''} PDF!`, "success");
    } catch (error) {
      console.error("PDF generation failed:", error);
      showToast("PDF generation error. You can also click Print to Save as PDF.", "error");
    } finally {
      setZoom(prevZoom);
      setIsGeneratingPDF(false);
    }
  };

  // Live ATS Score & Optimizer analysis
  const atsAnalysis = calculateAtsScore(resumeData);

  return (
    <div className="resunova-app">
      {/* Top Navigation */}
      <Navbar 
        selectedTemplate={selectedTemplate}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        selectedTheme={selectedTheme}
        onSelectTheme={setSelectedTheme}
        selectedFont={selectedFont}
        onSelectFont={setSelectedFont}
        spacing={spacing}
        onSelectSpacing={setSpacing}
        selectedFontSize={fontSize}
        onSelectFontSize={setFontSize}
        selectedHeaderStyle={headerStyle}
        onSelectHeaderStyle={setHeaderStyle}
        onLoadSample={handleLoadSample}
        onResetData={handleResetData}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
        isGeneratingPDF={isGeneratingPDF}
        appTheme={appTheme}
        onToggleAppTheme={toggleAppTheme}
        atsAnalysis={atsAnalysis}
        onOpenOptimizer={() => setIsOptimizerOpen(true)}
        activeDoc={activeDoc}
        onSelectActiveDoc={setActiveDoc}
      />

      {/* Main Studio Body: Left Editor + Right Canvas */}
      <main className="studio-workspace">
        {/* Left Side: Form Editor or Cover Letter Editor */}
        <section className="studio-editor-panel">
          {activeDoc === 'coverLetter' ? (
            <CoverLetterEditor 
              coverLetterData={coverLetterData}
              setCoverLetterData={setCoverLetterData}
              resumePersonalInfo={resumeData.personalInfo}
            />
          ) : (
            <FormEditor 
              resumeData={resumeData} 
              setResumeData={setResumeData} 
              atsAnalysis={atsAnalysis}
              onOpenOptimizer={() => setIsOptimizerOpen(true)}
            />
          )}
        </section>

        {/* Right Side: Live Resume or Cover Letter Preview */}
        <section className="studio-preview-panel">
          {activeDoc === 'coverLetter' ? (
            <CoverLetterCanvas 
              ref={coverLetterPrintRef}
              resumeData={resumeData}
              coverLetterData={coverLetterData}
              templateId={selectedTemplate}
              theme={selectedTheme}
              font={selectedFont}
              spacing={spacing}
              fontSize={fontSize}
              headerStyle={headerStyle}
              zoom={zoom}
              setZoom={setZoom}
            />
          ) : (
            <ResumeCanvas 
              ref={resumePrintRef}
              data={resumeData}
              templateId={selectedTemplate}
              theme={selectedTheme}
              font={selectedFont}
              spacing={spacing}
              fontSize={fontSize}
              headerStyle={headerStyle}
              zoom={zoom}
              setZoom={setZoom}
            />
          )}
        </section>
      </main>

      {/* Template Selection Modal */}
      <TemplateModal 
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
      />

      {/* NovoResume-Style Live Resume Optimizer & ATS Modal */}
      <ResumeOptimizerModal 
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        resumeData={resumeData}
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
