# SRT UI — Section 508 / WCAG 2.1 AA Accessibility Pass

Tracking file for the accessibility remediation effort across the SRT Angular UI.

## Goals
- Full keyboard navigability for users with disabilities
- WCAG 2.1 AA color contrast (4.5:1 text, 3:1 large text / UI components)
- Proper semantic HTML, ARIA, focus management, skip links, headings
- Fix broken ART tool link → must point to `https://www.section508.gov/art/#/`  ✅ DONE (header + contact-us)

## Page / area checklist
- [x] Global app shell (skip link, landmarks, lang, focus styles, "here's how you know" button, stray <body>)
- [x] Header / nav (keyboard analytics dropdown, ARIA, ART tool link fix, logout button)
- [x] Login page (auth + userlogin): h1, icon aria-hidden, real links, muted contrast
- [x] Home page: upload-zone button + keyboard, file input/textarea labels, pipeline toggle aria-pressed, progress aria-live/progressbar, ART table th scope+caption, icon aria-hidden, contrast greys, info tooltips role=img. FIXED click/scroll regression (input overlay).
- [x] Daily report (solicitation-report): loading aria-live, search/dropdown labels, table caption, View Details labels, new-tab hint, icons hidden, SCSS contrast (muted/danger/success tokens)
- [x] Individual solicitation detail (results-detail): icons hidden, inline grey contrast, ART table scope+caption, show/hide aria-expanded, file tabs aria-pressed + sr-only status, loading aria-live, new-tab hint, determination aria-labelledby
- [x] Summary step tabs: aria-current="page" on active step
- [x] feedback-report + form pages: main landmark, h1, thead, caption, dl semantics, #899197 -> #565C65 contrast
- [x] Admin pages: admin-header tablist (role=tab/tablist, aria-selected, real buttons), Reports sidenav javascript:void -> buttons
- [x] Contact us page: link contrast fixed, aria-required, success aria-live, icon aria-hidden
- [x] FAQ page: search button is a real button, sidenav buttons, accordion panel kept in DOM for aria-controls, expand icon aria-hidden, search input labeled
- [x] Detail page: single "Send Feedback" button (removed duplicate Provide Feedback link)
- [x] Automated before/after scan via axe-core: 4 violation rules / 8 elements -> 0 / 0
- [~] Analytics pages: SKIPPED per user request
- [x] API: development predictionCutoffDays set to 365 (was common:60) so daily report shows a year of data

## Cross-cutting themes
1. Charts without text alternatives (1.1.1) — biggest gap
2. div/span/li as interactive controls without role+tabindex+keyboard (2.1.1, 4.1.2)
3. Icon-only / material-symbols ligature spans need aria-hidden + accessible names (1.1.1, 4.1.2)
4. Orphan <label>s with no for/wrapping (1.3.1, 3.3.2)
5. Dynamic content without aria-live (4.1.3)
6. State by color/icon only — add aria-pressed/aria-current (1.4.1)
7. Heading structure (multiple h1, jumps) (1.3.1, 2.4.6)
8. Broken aria-labelledby/aria-controls references (4.1.2)
9. <th> missing scope (1.3.1)
10. Color contrast (1.4.3): contact link, ai-pipeline code header #888 on #111, feedback note #899197
11. Modal focus management (2.4.3, 2.1.2)
12. Duplicate <main id="content"> landmarks — only one renders at a time per route, low risk; keep id unique per route

## Build/verify
- `npm run build-local` to verify compilation. UI on :4200, API on :3000.
