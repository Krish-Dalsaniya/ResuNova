import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  TrendingUp, 
  Copy, 
  Check, 
  Search, 
  BookOpen, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { calculateAtsScore, POWER_VERBS } from '../utils/atsScorer';
import { showSwalToast } from '../utils/alert';

export default function ResumeOptimizerModal({ isOpen, onClose, resumeData }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'verbs' | 'phrasing' | 'breakdown'
  const [filterCheck, setFilterCheck] = useState('all'); // 'all' | 'pending' | 'passed'
  const [verbCategory, setVerbCategory] = useState('all');
  const [verbSearch, setVerbSearch] = useState('');
  const [copiedVerb, setCopiedVerb] = useState(null);

  const analysis = calculateAtsScore(resumeData);
  const { score, statusTier, statusColor, checks, metricsCount, actionVerbCount, detectedWeakPhrases, categoryBreakdown } = analysis;

  const passedChecks = checks.filter(c => c.passed);
  const pendingChecks = checks.filter(c => !c.passed);

  const displayedChecks = checks.filter(c => {
    if (filterCheck === 'pending') return !c.passed;
    if (filterCheck === 'passed') return c.passed;
    return true;
  });

  const handleCopyVerb = (verb) => {
    navigator.clipboard?.writeText(verb);
    setCopiedVerb(verb);
    showSwalToast(`Copied "${verb}" to clipboard!`, "success");
    setTimeout(() => {
      setCopiedVerb(null);
    }, 2000);
  };

  // Filter verbs
  const filteredVerbs = Object.entries(POWER_VERBS).flatMap(([cat, list]) => {
    if (verbCategory !== 'all' && verbCategory !== cat) return [];
    return list
      .filter(v => v.toLowerCase().includes(verbSearch.toLowerCase()))
      .map(v => ({ verb: v, category: cat }));
  });

  // SVG Gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-lg optimizer-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header optimizer-header">
          <div className="optimizer-header-title-wrap">
            <div className="optimizer-badge-icon" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="modal-title">Live Resume Optimizer & ATS Meter</h2>
              <p className="modal-subtitle">Real-time evaluation based on Fortune 500 ATS parser benchmarks.</p>
            </div>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Score Hero Banner */}
        <div className="optimizer-hero-banner">
          {/* Radial Gauge */}
          <div className="gauge-container">
            <svg className="gauge-svg" width="105" height="105" viewBox="0 0 100 100">
              <circle
                className="gauge-bg"
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="8"
              />
              <circle
                className="gauge-fill"
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="8"
                stroke={statusColor}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="gauge-center-text">
              <span className="gauge-number" style={{ color: statusColor }}>{score}</span>
              <span className="gauge-unit">/100</span>
            </div>
          </div>

          {/* Score Info & Tier */}
          <div className="optimizer-hero-info">
            <div className="optimizer-tier-badge" style={{ backgroundColor: `${statusColor}22`, color: statusColor, borderColor: `${statusColor}44` }}>
              <span>{statusTier}</span>
            </div>
            <p className="optimizer-hero-desc">
              {score >= 85 
                ? "Your resume meets standard industry keywords, measurable metrics, and clean readability benchmarks."
                : score >= 65
                ? "Good baseline! A few targeted improvements in metrics or power verbs will significantly raise recruiter responses."
                : "Several core ATS requirements are missing. Follow the checklist below to optimize your score."
              }
            </p>

            {/* Quick Metrics Bar */}
            <div className="optimizer-stats-strip">
              <div className="stat-pill">
                <span className="stat-pill-label">Passed Checks</span>
                <strong className="stat-pill-value text-success">{passedChecks.length} / {checks.length}</strong>
              </div>
              <div className="stat-pill">
                <span className="stat-pill-label">Measurable Metrics</span>
                <strong className="stat-pill-value text-primary">{metricsCount} detected</strong>
              </div>
              <div className="stat-pill">
                <span className="stat-pill-label">Action Verbs</span>
                <strong className="stat-pill-value text-amber">{actionVerbCount} detected</strong>
              </div>
              <div className="stat-pill">
                <span className="stat-pill-label">Weak Phrases</span>
                <strong className={`stat-pill-value ${detectedWeakPhrases.length > 0 ? 'text-danger' : 'text-success'}`}>
                  {detectedWeakPhrases.length} found
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="optimizer-tabs-bar">
          <button 
            type="button" 
            className={`optimizer-tab-btn ${activeTab === 'checklist' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <CheckCircle2 size={16} />
            <span>ATS Checklist ({pendingChecks.length} fixes)</span>
          </button>

          <button 
            type="button" 
            className={`optimizer-tab-btn ${activeTab === 'verbs' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('verbs')}
          >
            <BookOpen size={16} />
            <span>Action Verbs Bank</span>
          </button>

          <button 
            type="button" 
            className={`optimizer-tab-btn ${activeTab === 'phrasing' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('phrasing')}
          >
            <TrendingUp size={16} />
            <span>Weak Words Fixer ({detectedWeakPhrases.length})</span>
          </button>

          <button 
            type="button" 
            className={`optimizer-tab-btn ${activeTab === 'breakdown' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('breakdown')}
          >
            <Layers size={16} />
            <span>Category Breakdown</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="modal-body optimizer-body">
          {/* TAB 1: ATS Checklist */}
          {activeTab === 'checklist' && (
            <div className="checklist-tab-content">
              {/* Filter pills */}
              <div className="flex-between mb-3">
                <div className="btn-group">
                  <button 
                    type="button" 
                    className={`btn btn-xs ${filterCheck === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFilterCheck('all')}
                  >
                    All ({checks.length})
                  </button>
                  <button 
                    type="button" 
                    className={`btn btn-xs ${filterCheck === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFilterCheck('pending')}
                  >
                    Action Needed ({pendingChecks.length})
                  </button>
                  <button 
                    type="button" 
                    className={`btn btn-xs ${filterCheck === 'passed' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFilterCheck('passed')}
                  >
                    Passed ({passedChecks.length})
                  </button>
                </div>

                <span className="text-muted-xs">
                  {score >= 85 ? "ATS Optimization: Excellent" : "Click any tip to inspect"}
                </span>
              </div>

              {/* Checklist items */}
              <div className="checks-list">
                {displayedChecks.map((item) => (
                  <div key={item.id} className={`check-card ${item.passed ? 'is-passed' : 'is-pending'}`}>
                    <div className="check-card-left">
                      <div className="check-status-icon">
                        {item.passed ? (
                          <CheckCircle2 size={18} className="text-success" />
                        ) : item.impact === 'high' ? (
                          <AlertCircle size={18} className="text-danger" />
                        ) : (
                          <AlertTriangle size={18} className="text-amber" />
                        )}
                      </div>
                      <div className="check-details">
                        <div className="check-title-row">
                          <span className="check-title">{item.title}</span>
                          <span className="check-cat-tag">{item.category}</span>
                        </div>
                        <p className="check-desc">{item.description}</p>
                      </div>
                    </div>

                    <div className="check-points-badge">
                      <span className={item.passed ? "text-success" : "text-muted"}>
                        {item.points} / {item.maxPoints} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Action Verbs Bank */}
          {activeTab === 'verbs' && (
            <div className="verbs-tab-content">
              {/* Search & Category Filter */}
              <div className="verbs-search-row mb-3">
                <div className="input-with-icon flex-1">
                  <Search size={15} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Search powerful action verbs (e.g. Spearheaded, Automated)..."
                    value={verbSearch}
                    onChange={(e) => setVerbSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="verb-categories-row mb-3">
                {[
                  { id: 'all', label: 'All Verbs' },
                  { id: 'leadership', label: 'Leadership & Mgmt' },
                  { id: 'engineering', label: 'Tech & Engineering' },
                  { id: 'growth', label: 'Impact & Growth' },
                  { id: 'innovation', label: 'Innovation & Creative' },
                  { id: 'collaboration', label: 'Collaboration & Team' }
                ].map(cat => (
                  <button 
                    key={cat.id}
                    type="button" 
                    className={`verb-cat-btn ${verbCategory === cat.id ? 'is-active' : ''}`}
                    onClick={() => setVerbCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <p className="text-muted-xs mb-3">
                Click any action verb to instantly copy it to your clipboard for your resume bullet points:
              </p>

              {/* Grid of Verbs */}
              <div className="verbs-pills-grid">
                {filteredVerbs.map(({ verb, category }) => (
                  <button 
                    key={verb}
                    type="button" 
                    className={`verb-pill-btn ${copiedVerb === verb ? 'is-copied' : ''}`}
                    onClick={() => handleCopyVerb(verb)}
                    title={`Click to copy "${verb}"`}
                  >
                    <span>{verb}</span>
                    {copiedVerb === verb ? <Check size={13} className="text-success" /> : <Copy size={13} className="verb-copy-icon" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Weak Words Fixer */}
          {activeTab === 'phrasing' && (
            <div className="phrasing-tab-content">
              {detectedWeakPhrases.length > 0 ? (
                <div className="weak-phrases-container">
                  <div className="weak-phrases-notice mb-3">
                    <AlertTriangle size={16} className="text-amber" />
                    <span>
                      Found <strong>{detectedWeakPhrases.length} passive phrase{detectedWeakPhrases.length > 1 ? 's' : ''}</strong>. Replacing passive verbs with decisive power verbs increases recruiter interest by 40%.
                    </span>
                  </div>

                  <div className="weak-cards-list">
                    {detectedWeakPhrases.map((wp, idx) => (
                      <div key={idx} className="weak-phrase-card">
                        <div className="weak-phrase-left">
                          <span className="weak-label">Found Weak Phrase:</span>
                          <strong className="weak-term">"{wp.weak}"</strong>
                        </div>
                        <ArrowRight size={16} className="text-muted" />
                        <div className="weak-phrase-right">
                          <span className="strong-label">Recommended Replacements:</span>
                          <div className="strong-pills-wrap">
                            {wp.suggestion.split(',').map((sug, sIdx) => {
                              const cleanSug = sug.trim();
                              return (
                                <button 
                                  key={sIdx} 
                                  type="button" 
                                  className="sug-pill-btn"
                                  onClick={() => handleCopyVerb(cleanSug)}
                                  title="Click to copy"
                                >
                                  <span>{cleanSug}</span>
                                  <Copy size={11} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-weak-phrases-card">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={32} className="text-success" />
                  </div>
                  <h3>No Passive Phrasing Detected!</h3>
                  <p>
                    Your work descriptions do not contain generic phrases like "responsible for" or "worked on". 
                    All active phrasing is clear and recruiter-friendly.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Category Breakdown */}
          {activeTab === 'breakdown' && (
            <div className="breakdown-tab-content">
              <p className="text-muted-xs mb-3">
                Score contribution by section according to modern ATS weighting algorithms:
              </p>

              <div className="breakdown-bars-list">
                {[
                  { name: "Personal & Contact Info", cat: categoryBreakdown.contact, max: 20 },
                  { name: "Executive Summary", cat: categoryBreakdown.summary, max: 15 },
                  { name: "Work Experience & Metrics", cat: categoryBreakdown.experience, max: 35 },
                  { name: "Skills & Keywords", cat: categoryBreakdown.skills, max: 15 },
                  { name: "Education & Credentials", cat: categoryBreakdown.education, max: 15 }
                ].map((item, i) => {
                  const pct = Math.round((item.cat.score / item.max) * 100);
                  return (
                    <div key={i} className="breakdown-row">
                      <div className="breakdown-row-header">
                        <span className="breakdown-name">{item.name}</span>
                        <span className="breakdown-score">
                          <strong>{item.cat.score}</strong> / {item.max} pts ({pct}%)
                        </span>
                      </div>
                      <div className="breakdown-track">
                        <div 
                          className="breakdown-fill" 
                          style={{ 
                            width: `${pct}%`,
                            backgroundColor: pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--primary)' : 'var(--amber)' 
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
