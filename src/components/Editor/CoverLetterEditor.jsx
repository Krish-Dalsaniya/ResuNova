import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  FileEdit, 
  Calendar, 
  Sparkles, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Send
} from 'lucide-react';
import { coverLetterPresets } from '../../data/sampleResume';
import { showConfirm, showSwalToast } from '../../utils/alert';

export default function CoverLetterEditor({ 
  coverLetterData, 
  setCoverLetterData,
  resumePersonalInfo
}) {
  const [openSections, setOpenSections] = useState({
    recipient: true,
    letter: true
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const recipient = coverLetterData.recipient || {};
  const letter = coverLetterData.letter || {};

  const handleRecipientChange = (field, value) => {
    setCoverLetterData({
      ...coverLetterData,
      recipient: {
        ...recipient,
        [field]: value
      }
    });
  };

  const handleLetterChange = (field, value) => {
    setCoverLetterData({
      ...coverLetterData,
      letter: {
        ...letter,
        [field]: value
      }
    });
  };

  const handleLoadPreset = async (preset) => {
    const confirmed = await showConfirm({
      title: `Load ${preset.name} Cover Letter?`,
      text: `This will replace current cover letter text with our curated ${preset.name} template.`,
      icon: "question",
      confirmButtonText: "Yes, Load Template"
    });

    if (confirmed) {
      setCoverLetterData({
        ...preset.data,
        letter: {
          ...preset.data.letter,
          signatureName: resumePersonalInfo?.fullName || preset.data.letter.signatureName
        }
      });
      showSwalToast(`Loaded ${preset.name} template!`, "success");
    }
  };

  return (
    <div className="form-editor-container">
      {/* Editor Header with Quick Preset Selectors */}
      <div className="form-editor-header flex-between">
        <div>
          <h2 className="editor-heading">Cover Letter Content</h2>
          <p className="editor-subtext">Matches your selected resume template, color theme, and typography.</p>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="cover-letter-presets-bar mb-3">
        <span className="preset-bar-label">
          <Sparkles size={13} className="text-amber" /> Pre-written Templates:
        </span>
        <div className="preset-pills-scroll">
          {coverLetterPresets.map(preset => (
            <button
              key={preset.id}
              type="button"
              className="preset-pill-btn"
              onClick={() => handleLoadPreset(preset)}
              title={preset.description}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="accordion-wrapper">
        {/* Recipient Information */}
        <div className={`accordion-item ${openSections.recipient ? 'is-open' : ''}`}>
          <div 
            className="accordion-header"
            onClick={() => toggleSection('recipient')}
          >
            <div className="accordion-header-left">
              <div className="section-icon-badge">
                <Building2 size={18} />
              </div>
              <div className="section-title-wrap">
                <span className="section-main-title">Recipient & Company Details</span>
                <span className="section-sub-title">Company name, hiring manager, date and address</span>
              </div>
            </div>

            <div className="accordion-header-right">
              <span className="section-status-pill">
                {recipient.company ? "Configured" : "Required"}
              </span>
              <span className="accordion-chevron">
                {openSections.recipient ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </div>
          </div>

          {openSections.recipient && (
            <div className="accordion-content">
              <div className="editor-subform">
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="input-label">Hiring Manager / Recruiter Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Sarah Jenkins or Hiring Team"
                      value={recipient.hiringManager || ""}
                      onChange={(e) => handleRecipientChange('hiringManager', e.target.value)}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="input-label">Hiring Manager Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Director of Engineering"
                      value={recipient.roleTitle || ""}
                      onChange={(e) => handleRecipientChange('roleTitle', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="input-label">Company Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. CloudScale Technologies Inc."
                      value={recipient.company || ""}
                      onChange={(e) => handleRecipientChange('company', e.target.value)}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="input-label">Date of Application</label>
                    <div className="input-with-icon">
                      <Calendar size={15} className="input-icon" />
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. October 19, 2026"
                        value={recipient.date || ""}
                        onChange={(e) => handleRecipientChange('date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="input-label">Street Address (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 100 Market Street, Suite 400"
                      value={recipient.address || ""}
                      onChange={(e) => handleRecipientChange('address', e.target.value)}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="input-label">City, State & Zip Code</label>
                    <div className="input-with-icon">
                      <MapPin size={15} className="input-icon" />
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. San Francisco, CA 94105"
                        value={recipient.cityStateZip || ""}
                        onChange={(e) => handleRecipientChange('cityStateZip', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Letter Content & Paragraphs */}
        <div className={`accordion-item ${openSections.letter ? 'is-open' : ''}`}>
          <div 
            className="accordion-header"
            onClick={() => toggleSection('letter')}
          >
            <div className="accordion-header-left">
              <div className="section-icon-badge">
                <FileEdit size={18} />
              </div>
              <div className="section-title-wrap">
                <span className="section-main-title">Cover Letter Body</span>
                <span className="section-sub-title">Opening, achievements, alignment & closing signature</span>
              </div>
            </div>

            <div className="accordion-header-right">
              <span className="section-status-pill">
                {letter.intro ? "Drafted" : "Empty"}
              </span>
              <span className="accordion-chevron">
                {openSections.letter ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </div>
          </div>

          {openSections.letter && (
            <div className="accordion-content">
              <div className="editor-subform">
                {/* Salutation & Subject */}
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="input-label">Salutation</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Dear Ms. Jenkins, or Dear Hiring Team,"
                      value={letter.salutation || ""}
                      onChange={(e) => handleLetterChange('salutation', e.target.value)}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="input-label">Subject Line (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Application for Senior Full-Stack Engineer"
                      value={letter.subject || ""}
                      onChange={(e) => handleLetterChange('subject', e.target.value)}
                    />
                  </div>
                </div>

                {/* Opening / Hook */}
                <div className="form-group">
                  <label className="input-label">Introduction & Position Hook</label>
                  <span className="input-hint">State the position you are applying for and your strong elevator pitch.</span>
                  <textarea 
                    className="form-textarea" 
                    rows={3}
                    placeholder="I am writing to express my enthusiastic interest in the..."
                    value={letter.intro || ""}
                    onChange={(e) => handleLetterChange('intro', e.target.value)}
                  />
                </div>

                {/* Body 1: Value & Impact */}
                <div className="form-group">
                  <label className="input-label">Body Paragraph 1: Key Impact & Achievements</label>
                  <span className="input-hint">Highlight measurable past accomplishments that prove you can solve their challenges.</span>
                  <textarea 
                    className="form-textarea" 
                    rows={4}
                    placeholder="Throughout my career, I have focused on delivering reliable..."
                    value={letter.body1 || ""}
                    onChange={(e) => handleLetterChange('body1', e.target.value)}
                  />
                </div>

                {/* Body 2: Alignment & Passion */}
                <div className="form-group">
                  <label className="input-label">Body Paragraph 2: Company Alignment & Fit</label>
                  <span className="input-hint">Explain why this specific company excites you and how your work ethic aligns.</span>
                  <textarea 
                    className="form-textarea" 
                    rows={4}
                    placeholder="What excites me most about your company is..."
                    value={letter.body2 || ""}
                    onChange={(e) => handleLetterChange('body2', e.target.value)}
                  />
                </div>

                {/* Conclusion & CTA */}
                <div className="form-group">
                  <label className="input-label">Conclusion & Call to Action</label>
                  <span className="input-hint">Reiterate enthusiasm and invite a conversation/interview.</span>
                  <textarea 
                    className="form-textarea" 
                    rows={2}
                    placeholder="Thank you for your time and consideration. I would welcome the opportunity..."
                    value={letter.conclusion || ""}
                    onChange={(e) => handleLetterChange('conclusion', e.target.value)}
                  />
                </div>

                {/* Sign-off & Name */}
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="input-label">Formal Sign-Off</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Sincerely, or Best regards,"
                      value={letter.signOff || ""}
                      onChange={(e) => handleLetterChange('signOff', e.target.value)}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="input-label">Signer Full Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Alex Morgan"
                      value={letter.signatureName || resumePersonalInfo?.fullName || ""}
                      onChange={(e) => handleLetterChange('signatureName', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
