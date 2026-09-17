/* eslint-disable */
/**
 * Automated accessibility scan using axe-core + Puppeteer.
 * Logs in via the dev login endpoint, injects the auth token into localStorage,
 * then runs axe-core (WCAG 2.0/2.1 A & AA rules) against each route.
 *
 * Usage: node a11y-scan.js [label]
 *   label = optional output suffix, e.g. "before" or "after"
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const UI = 'http://localhost:4200';
const API = 'http://localhost:3000/api';
const LABEL = process.argv[2] || 'scan';
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

// Routes to scan: [name, url]
const ROUTES = [
  ['login', `${UI}/auth`],
  ['home', `${UI}/home`],
  ['daily-report', `${UI}/solicitation/report`],
  ['admin', `${UI}/admin`],
  ['contact-us', `${UI}/help/contactus`],
  ['faq', `${UI}/help/faq`],
];

async function getDevAuth() {
  // Hit the dev login endpoint; it 302-redirects to /auth?info=<urlencoded JSON>
  const res = await fetch(`${API}/devLogin`, { redirect: 'manual' });
  const loc = res.headers.get('location') || '';
  const m = loc.match(/info=([^&]+)/);
  if (!m) throw new Error('devLogin did not return an info payload. Status ' + res.status);
  const json = decodeURIComponent(m[1]);
  return JSON.parse(json);
}

async function run() {
  const auth = await getDevAuth();
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const results = {};

  for (const [name, url] of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // Seed localStorage with the dev auth before the app boots
    await page.evaluateOnNewDocument((a) => {
      const set = (k, v) => { if (v !== undefined && v !== null) localStorage.setItem(k, v); };
      set('token', a.token);
      set('firstName', a.firstName);
      set('lastName', a.lastName);
      set('agency', a.agency);
      set('email', a.email);
      set('position', a.position);
      set('id', a.id);
      set('userRole', a.userRole);
      set('loginMethod', a.loginMethod || 'dev');
    }, auth);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      // give Angular time to render dynamic content
      await new Promise(r => setTimeout(r, 2500));
      await page.evaluate(AXE);
      const out = await page.evaluate(async () => {
        return await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        });
      });
      results[name] = {
        url,
        violations: out.violations,
        violationCount: out.violations.length,
        nodeCount: out.violations.reduce((s, v) => s + v.nodes.length, 0),
        passes: out.passes.length,
      };
      console.log(`[${name}] ${results[name].violationCount} violation rules, ${results[name].nodeCount} elements affected`);
    } catch (e) {
      results[name] = { url, error: String(e) };
      console.log(`[${name}] ERROR: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();

  // Write detailed JSON + a readable summary
  fs.writeFileSync(path.join(__dirname, `a11y-${LABEL}.json`), JSON.stringify(results, null, 2));

  let summary = `# Accessibility Scan (${LABEL}) — axe-core WCAG 2.1 A/AA\n\n`;
  let totalRules = 0, totalNodes = 0;
  summary += `| Page | Violation rules | Elements affected |\n|------|----------------|-------------------|\n`;
  for (const [name] of ROUTES) {
    const r = results[name];
    if (!r) continue;
    if (r.error) { summary += `| ${name} | ERROR | ${r.error} |\n`; continue; }
    totalRules += r.violationCount; totalNodes += r.nodeCount;
    summary += `| ${name} | ${r.violationCount} | ${r.nodeCount} |\n`;
  }
  summary += `| **TOTAL** | **${totalRules}** | **${totalNodes}** |\n\n`;

  // Per-page breakdown of which rules failed
  for (const [name] of ROUTES) {
    const r = results[name];
    if (!r || r.error || !r.violations.length) continue;
    summary += `\n## ${name}\n`;
    for (const v of r.violations) {
      summary += `- **${v.id}** (${v.impact}) — ${v.help} [${v.nodes.length} el]\n`;
    }
  }

  fs.writeFileSync(path.join(__dirname, `a11y-${LABEL}.md`), summary);
  console.log(`\nTOTAL: ${totalRules} violation rules, ${totalNodes} elements affected`);
  console.log(`Wrote a11y-${LABEL}.json and a11y-${LABEL}.md`);
}

run().catch(e => { console.error(e); process.exit(1); });
