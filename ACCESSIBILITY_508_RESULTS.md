# SRT UI — Accessibility Remediation Results

## Automated scan: before vs after
Tool: **axe-core 4.10** (WCAG 2.0/2.1 Level A + AA rulesets) driven by Puppeteer,
authenticated as a dev admin, run against the live dev server (`node a11y-scan.js`).

| Page | Before (violation rules / elements) | After |
|------|-------------------------------------|-------|
| Login (`/auth`) | 0 / 0 | **0 / 0** |
| Home (`/home`) | 1 / 1 | **0 / 0** |
| Daily Report (`/solicitation/report`) | 3 / 7 | **0 / 0** |
| Admin (`/admin`) | 0 / 0 | **0 / 0** |
| Contact Us (`/help/contactus`) | 0 / 0 | **0 / 0** |
| FAQ (`/help/faq`) | 0 / 0 | **0 / 0** |
| **TOTAL** | **4 rules / 8 elements** | **0 / 0** |

Raw output: `a11y-before.json/.md`, `a11y-after.json/.md`.

### Specific automated violations fixed
- **home — color-contrast (serious):** hero "Explore Daily Dashboard" button text `#1183d4` on white was 4.02:1 → changed to `#1A4480` (~8.5:1).
- **daily-report — button-name (critical):** PrimeNG paginator first/prev/next/last buttons had no accessible name → added `aria-label`s via `fixPaginatorAccessibility()`.
- **daily-report — label (critical):** rows-per-page combobox had no label → added `aria-label="Rows per page"`.
- **daily-report — color-contrast (serious):** "Cannot Evaluate" review badge `#946500` on `#FEF0C8` (4.3:1) → `#6b4a00` (~5.4:1).

## IMPORTANT: what "0 violations" does and does not mean
Automated tools only detect ~30–50% of WCAG issues. A score of 0 means no
**machine-detectable** failures remain. It is **not** a certification of 508 conformance.

Admin / Contact / FAQ reported 0 automated violations even *before* changes, yet they
had real barriers that axe cannot detect — these were fixed manually:
- **FAQ:** search trigger was a `<div>` (not keyboard operable) → real `<button>`;
  sidenav `javascript:void(0)` anchors → `<button>`; accordion panels now stay in the
  DOM so `aria-controls` resolves; expand +/- icon hidden from AT; search input labeled.
- **Admin:** tab bar was `<li>`+`<a>` with no roles → real `role="tab"` buttons with
  `aria-selected`, wrapped in a labeled `role="tablist"`; Reports sidenav `javascript:void(0)`
  anchors → `<button>`.
- **Contact Us:** link contrast on navy (`#73b3e7` ~3.6:1 → `#a6d2ff`); `aria-required`
  on fields; success message announced via `role="status"`; decorative icon hidden.
- **Detail page:** removed duplicate feedback control — now a single "Send Feedback" button.

## Still required for true 508 sign-off (cannot be automated)
- Manual keyboard-only pass on every page (tab order, focus visibility, no traps).
- Screen-reader testing (VoiceOver/NVDA/JAWS): reading order, announcements, dynamic updates.
- 200% zoom / reflow and Windows High Contrast checks.
- Analytics pages were **skipped per request** and still have inaccessible charts
  (no text alternative) — these would fail a manual audit.
