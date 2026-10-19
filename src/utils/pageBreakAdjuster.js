/**
 * ResuNova Intelligent Page-Break Adjustment Engine
 * 
 * Automatically detects sections, headings, and cards that intersect A4 page boundaries
 * (1123px, 2246px, etc.) and gracefully pushes them to the top of the next page,
 * preventing awkward cutoffs across both live preview and PDF exports.
 */

export const A4_PAGE_HEIGHT = 1123; // Standard A4 height in px at 96 DPI (794px width)
export const SAFE_BOTTOM_MARGIN = 28; // Min space before bottom of page (px)
export const PAGE_TOP_PADDING = 32;   // Top margin on the new page (px)
export const ORPHAN_HEADER_THRESHOLD = 75; // Min space required for a section header

// Candidate element selectors that should never be sliced across page breaks
export const PAGE_BREAK_SELECTORS = [
  // Full Sections
  'section',
  '.main-section',
  '.timeline-section',
  '.minimal-section',
  '.creative-section',
  '.classic-section',
  '.graduate-sec',
  '.sidebar-section',
  '.elegant-section',
  '.tech-left-col > section',
  '.tech-right-col > section',

  // Individual Entries & Cards
  '.timeline-entry',
  '.timeline-side-card',
  '.exp-item',
  '.classic-exp-item',
  '.tech-exp-card',
  '.creative-entry',
  '.graduate-entry',
  '.elegant-entry',
  '.project-card',
  '.edu-item',
  '.sidebar-edu-item',
  '.tech-edu-card',
  '.tech-proj-item',
  '.creative-proj-card',
  '.elegant-edu-item',
  '.graduate-edu-card',
  '.skill-category-block',
  '.tech-skill-card',
  '.sidebar-section'
];

/**
 * Resets all previously applied auto page-break margins
 */
export function resetPageBreaks(container) {
  if (!container) return;
  const adjusted = container.querySelectorAll('[data-page-break-adjusted="true"]');
  adjusted.forEach((el) => {
    el.style.marginTop = el.dataset.originalMarginTop || '';
    delete el.dataset.pageBreakAdjusted;
    delete el.dataset.originalMarginTop;
  });
}

/**
 * Calculates and applies margin offsets to prevent elements from crossing page breaks
 * Returns the total number of pages after adjustment
 */
export function adjustPageBreaks(container, enabled = true) {
  if (!container) return 1;

  // Always reset first to measure natural layout
  resetPageBreaks(container);
  if (!enabled) {
    const rawHeight = container.scrollHeight || container.offsetHeight || A4_PAGE_HEIGHT;
    return Math.max(1, Math.ceil(rawHeight / A4_PAGE_HEIGHT));
  }

  // Force reflow for accurate measurements
  void container.offsetHeight;

  const containerRect = container.getBoundingClientRect();
  if (containerRect.height <= 0) return 1;

  // Query all potential boundary-straddling candidates
  const candidates = Array.from(container.querySelectorAll(PAGE_BREAK_SELECTORS.join(', ')));

  // Filter out nested duplicates where parent is already being shifted
  const elements = candidates.filter((el) => {
    // Skip if parent is already a candidate in the list (unless parent is a container like div)
    const isSection = el.tagName === 'SECTION' || el.classList.contains('main-section') || el.classList.contains('sidebar-section');
    return true;
  });

  // Sort elements by their vertical position in document
  elements.sort((a, b) => {
    const rA = a.getBoundingClientRect();
    const rB = b.getBoundingClientRect();
    return rA.top - rB.top;
  });

  let adjustmentsCount = 0;

  for (const el of elements) {
    // If element is hidden, skip
    if (el.offsetParent === null) continue;

    const cRect = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const relTop = r.top - cRect.top;
    const relBottom = r.bottom - cRect.top;
    const height = r.height;

    if (height <= 0) continue;

    // Determine current page index (0 for Page 1, 1 for Page 2, etc.)
    const pageIndex = Math.floor(relTop / A4_PAGE_HEIGHT);
    const pageEnd = (pageIndex + 1) * A4_PAGE_HEIGHT;
    const cutLimit = pageEnd - SAFE_BOTTOM_MARGIN;

    // Check if this is a header or starts with a heading
    const isHeader = (
      el.tagName === 'SECTION' || 
      el.classList.contains('section-title') || 
      el.classList.contains('timeline-sec-header') ||
      el.querySelector('h2, h3, .section-title, .sidebar-title, .timeline-sec-title') !== null
    );

    const minSpaceNeeded = isHeader ? ORPHAN_HEADER_THRESHOLD : SAFE_BOTTOM_MARGIN;
    const remainingOnPage = pageEnd - relTop;

    // Does this element intersect the page cutoff or leave an orphan header?
    const straddlesBoundary = (relTop < cutLimit && relBottom > (pageEnd - 14));
    const isOrphanHeader = (isHeader && remainingOnPage < minSpaceNeeded && remainingOnPage > 0);

    if (straddlesBoundary || isOrphanHeader) {
      // Calculate how much space is needed to push it to the next page
      const targetTop = pageEnd + PAGE_TOP_PADDING;
      const shift = targetTop - relTop;

      if (shift > 0 && shift < A4_PAGE_HEIGHT) {
        // Save original margin if not already saved
        if (el.dataset.originalMarginTop === undefined) {
          el.dataset.originalMarginTop = el.style.marginTop || '';
        }

        const currentMargin = parseFloat(window.getComputedStyle(el).marginTop) || 0;
        el.style.marginTop = `${currentMargin + shift}px`;
        el.dataset.pageBreakAdjusted = "true";
        adjustmentsCount++;
      }
    }
  }

  // Return computed final total pages
  const finalHeight = container.scrollHeight || container.offsetHeight || A4_PAGE_HEIGHT;
  return Math.max(1, Math.ceil((finalHeight - 20) / A4_PAGE_HEIGHT));
}
