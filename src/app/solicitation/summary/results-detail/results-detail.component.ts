import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import moment from 'moment';
import { environment } from 'environments/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Section508Clause, resolveClause, clauseToPlainText } from '../../../shared/section508-clause';

interface ParseStatus {
  formattedDate: string;
  postedDate: Date | null;
  name: string;
  status: string;
  attachment_url: string;
}

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.scss'],
  standalone: false
})
export class ResultsDetailComponent implements OnInit {
  public lockDocs: number[];
  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: string;
  type: string = 'report';
  loading = true;
  feature_flags = environment.feature_flags;

  // RAG data
  ragData: any = null;
  ragDocuments: any[] = [];
  ragMatches: any[] = [];
  selectedDocTab = 0;

  // ART requirements
  artRequirements: any = null;
  artLoading = false;
  artError = '';
  showArt = false;
  requirementsCopied = false;

  // ── Recommended clause (only when 508 applies but nothing was found) ──
  recommendedClause: Section508Clause = resolveClause();
  clauseCopied = false;
  clauseOpen = false;
  clauseExpanded = false;
  clauseInstructionsOpen = false;

  get showRecommendedClause(): boolean {
    return this.solicitation?.reviewRec === 'Non-compliant (Action Required)'
        && !this.alreadyAddressed
        && !this.hasExemption;
  }

  // ── Verdict card matrix ──
  // TWO cards only when 508 applies (verdict + applicability). Not Applicable
  // and Cannot Evaluate render a SINGLE card — otherwise the two cards repeat
  // each other ("Not Applicable" beside "Does Not Apply").
  get showApplicabilityCard(): boolean {
    const r = this.solicitation?.reviewRec;
    const twoCard = r === 'Compliant' || r === 'Non-compliant (Action Required)';
    return twoCard && this.ragData?.ai_applicable === true;
  }

  /** A package shipping a 508/VPAT/ACR document is already handled. */
  get section508DocumentFile(): string | null {
    const ps: any[] = this.solicitation?.parseStatus || [];
    const re = /508|\bvpat\b|accessibility[ _-]*conformance[ _-]*report|\bacr\b/i;
    for (const f of ps) {
      if (f && f.name && re.test(f.name)) { return f.name; }
    }
    return null;
  }

  get alreadyAddressed(): boolean {
    return !!this.section508DocumentFile || this.ragData?.already_addressed === true;
  }

  get alreadyAddressedReason(): string {
    const f = this.section508DocumentFile;
    if (f) {
      return `This solicitation package includes a document named "${f}", so the Section 508 documentation appears to already be in place.`;
    }
    return 'The requirement language in this solicitation appears to come from the Accessibility Requirements Tool, so no additional requirements are recommended.';
  }

  get hasExemption(): boolean {
    return this.ragData?.exemption?.has_exemption === true;
  }

  get exemptionExplanation(): string {
    return this.ragData?.exemption?.explanation || '';
  }

  /**
   * Key findings for a scraped solicitation.
   *
   * The scraper pipeline stores these as `ai_key_findings` on rag-solicitations
   * (populated for ~99% of rows), while the manual-upload pipeline emits
   * `key_findings`. The template previously read only the latter, so this
   * section never rendered on the detail page even though the data was there.
   * Accept either shape.
   */
  get keyFindings(): string[] {
    const raw = this.ragData?.ai_key_findings || this.ragData?.key_findings || [];
    return (Array.isArray(raw) ? raw : [])
      .map((f: any) => (typeof f === 'string' ? f : String(f ?? '')).trim())
      .filter((f: string) => f.length > 0);
  }

  get verdictDescription(): string {
    if (this.hasExemption) {
      const ex = this.ragData.exemption;
      return `This solicitation documents a Section 508 exemption (${ex.exemption_type}). ${ex.explanation || ''}`.trim();
    }
    if (this.alreadyAddressed) { return this.alreadyAddressedReason; }
    switch (this.solicitation?.reviewRec) {
      case 'Compliant': return 'Section 508 language was found — confirm the requirements below are sufficient.';
      case 'Non-compliant (Action Required)': return 'Section 508 applies, but the required language was not found in this solicitation.';
      case 'Not Applicable': return 'Section 508 does not apply to this solicitation (not an ICT procurement).';
      default: return 'This solicitation could not be evaluated automatically.';
    }
  }

  copyClause(): void {
    navigator.clipboard?.writeText(clauseToPlainText(this.recommendedClause)).then(() => {
      this.clauseCopied = true;
      setTimeout(() => { this.clauseCopied = false; }, 2000);
    }).catch(() => {});
  }

  // "Less is more": every report section except the verdict and action items
  // is collapsible and starts collapsed. Data is all still there — just shown
  // on demand to limit scrolling.
  // findings starts CLOSED: it moved to the bottom of the report as supporting
  // detail rather than a headline, so it should not expand on load.
  openSections: { [k: string]: boolean } = { actions: true, summary: true, findings: false };

  toggleSection(k: string): void {
    this.openSections[k] = !this.openSections[k];
  }

  /** TOC click: expand the target section (if collapsible) and jump to it. */
  openAndScroll(k: string, id: string): void {
    if (k) { this.openSections[k] = true; }
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  // Action-items checklist state (client-side).
  actionChecked: { [i: number]: boolean } = {};

  toggleAction(i: number): void {
    this.actionChecked[i] = !this.actionChecked[i];
  }

  get actionSteps(): { label: string; detail?: string }[] {
    if (this.alreadyAddressed || this.hasExemption) { return []; }
    // No 508 language at all → two distinct actions, because the clause and the
    // requirements go in DIFFERENT parts of the solicitation (the clause sits in
    // the body/terms; the requirements go in the SOW/PWS/SOO or an attachment).
    if (this.showRecommendedClause) {
      return [
        { label: 'Add the recommended Section 508 clause', detail: 'Copy it into the body of your solicitation.' },
        { label: 'Add the relevant Section 508 requirements', detail: 'These go in the SOW, PWS, SOO, requirements document, or an attachment.' },
        { label: 'Re-check the updated solicitation' },
      ];
    }
    if (this.solicitation?.reviewRec === 'Compliant') {
      return [
        { label: 'Generate Section 508 requirements', detail: 'Confirm every applicable requirement is present — SRT only confirms 508 is mentioned.' },
        { label: 'Compare them against the language in this solicitation' },
        { label: 'Follow up with the solicitation owner if anything is missing' },
      ];
    }
    return [
      { label: 'Generate Section 508 requirements', detail: 'Generated from the ICT types identified for this procurement.' },
      { label: 'Note which requirements are missing from this solicitation' },
      { label: 'Follow up with the solicitation owner to add the missing language' },
    ];
  }

  get allActionsDone(): boolean {
    const n = this.actionSteps.length;
    if (n === 0) return false;
    for (let i = 0; i < n; i++) {
      if (!this.actionChecked[i]) return false;
    }
    return true;
  }

  /** Checklist CTA: generate + reveal the requirements inline, right here. */
  getRequirements(): void {
    this.openSections['actions'] = true;
    if (!this.artRequirements && !this.artLoading) {
      this.fetchArtRequirements();
    }
    this.showArt = true;
  }

  scrollToRequirements(): void {
    if (this.artRequirements) { this.showArt = true; }
    setTimeout(() => document.getElementById('srt-req-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  /** Jump to a report section from the table-of-contents rail. */
  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── TOC scrollspy: highlight the section currently in view ──
  activeTocId = '';
  // Must stay in DOM order — updateActiveToc() walks this top-to-bottom and
  // keeps the last anchor above the fold, so a misordered entry breaks
  // highlighting. Any new TOC anchor has to be registered here too.
  private readonly tocAnchorIds = [
    'srt-overview-anchor',
    'srt-summary-anchor',
    'srt-actions-anchor',
    'srt-applicability-anchor',
    'srt-docs-anchor',
    'srt-findings-anchor', // last — Key Findings now renders at the bottom
  ];

  @HostListener('window:scroll')
  updateActiveToc(): void {
    let current = '';
    for (const id of this.tocAnchorIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 130) {
        current = id;
      }
    }
    if (!current) {
      current = this.tocAnchorIds.find(id => !!document.getElementById(id)) || '';
    }
    this.activeTocId = current;
  }

  // Copy the generated Section 508 requirements to the clipboard.
  copyRequirements(): void {
    const lang = this.artRequirements?.language;
    if (!lang) { return; }
    const lines: string[] = ['Section 508 Requirements'];
    for (const section of lang) {
      lines.push('');
      lines.push(`${section.code || ''} ${section.title || ''}`.trim());
      for (const sub of (section.sections || [])) {
        const parts = [sub.code, sub.title, sub.text].filter(Boolean);
        lines.push('  ' + parts.join(' — '));
      }
    }
    navigator.clipboard?.writeText(lines.join('\n')).then(() => {
      this.requirementsCopied = true;
      setTimeout(() => { this.requirementsCopied = false; }, 2000);
    }).catch(() => {});
  }

  private readonly STEP_ACTIONS = {
    REVIEW: 'reviewed solicitation action requested summary',
    EMAIL: 'sent email to POC',
    FEEDBACK: 'provided feedback on the solicitation prediction result'
  };

  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private gaService: GoogleAnalyticsService
  ) {
    this.solicitation = new Solicitation(null, null, null, null, null, null,
      { value: '' }, null, null, null, null, null, null,
      [{ name: '', status: '', attachment_url: '', formattedDate: '', postedDate: new Date() }],
      [''], null, null, { psc: '', naics: '', naics_match: false, epa_psc_match: false },
      null, null, null, null, true);
    this.solicitation.na_flag = false;
  }

  ngOnInit() {
    try {
      const navigation = this.router.currentNavigation();

      if (navigation?.extras?.state?.['solicitation']) {
        const data = navigation.extras.state['solicitation'];
        this.processSolicitationData(data);
      } else {
        this.loadSolicitationData();
      }
    } catch (error) {
      console.error('[ngOnInit] Error initializing component:', error);
      this.loading = false;
    }
  }

  private loadSolicitationData(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.solicitationID = params['id'];

      this.solicitationService.getSolicitation(this.solicitationID).subscribe({
        next: data => {
          this.processSolicitationData(data);
        },
        error: err => {
          console.error('[loadSolicitationData] Error:', err);
          this.loading = false;
        }
      });
    });
  }

  private processSolicitationData(data: any): void {
    try {
      this.processParseStatus(data);
      this.setSolicitationData(data);
      this.processDocuments();
      this.loading = false;

      // Load RAG data if solicitation number is available
      if (data.solNum) {
        this.loadRagData(data.solNum);
      }
    } catch (error) {
      console.error('[processSolicitationData] Error:', error);
      this.loading = false;
    }
  }

  private loadRagData(solNum: string): void {
    const baseUrl = environment.SERVER_URL;

    // Fetch RAG solicitation summary
    this.http.get<any>(`${baseUrl}/rag/solicitation/${solNum}`).subscribe({
      next: (data) => {
        this.ragData = data;
      },
      error: () => { /* RAG data not available for this solicitation — that's fine */ }
    });

    // Fetch RAG documents
    this.http.get<any>(`${baseUrl}/rag/solicitation/${solNum}/documents`).subscribe({
      next: (data) => {
        this.ragDocuments = data.documents || [];
        this.reconcileScanResultsWithV4();
      },
      error: () => {}
    });

    // Fetch RAG vector matches
    this.http.get<any>(`${baseUrl}/rag/solicitation/${solNum}/matches`).subscribe({
      next: (data) => { this.ragMatches = data.matches || []; },
      error: () => {}
    });
  }

  fetchArtRequirements(): void {
    const ictTypes = this.getActiveIctTypes();
    if (ictTypes.length === 0) return;

    this.artLoading = true;
    this.artError = '';
    const baseUrl = environment.SERVER_URL;

    this.http.post<any>(`${baseUrl}/rag-analytics/art-lookup`, { ict_types: ictTypes }).subscribe({
      next: (data) => {
        this.artRequirements = data;
        this.artLoading = false;
        this.showArt = true;
        // Keep the reviewer in context: scroll to the generated requirements
        // (once the DOM has rendered) instead of letting the view jump around.
        setTimeout(() => {
          document.getElementById('srt-req-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      },
      error: (err) => {
        this.artError = 'Unable to load ART requirements. Please try again.';
        this.artLoading = false;
      }
    });
  }

  getActiveIctTypes(): string[] {
    if (!this.ragDocuments || this.ragDocuments.length === 0) return [];
    const allTypes = new Set<string>();
    for (const doc of this.ragDocuments) {
      if (doc.ict_types) {
        for (const ict of doc.ict_types) {
          if (ict.is_applicable) {
            allTypes.add(ict.ict_type);
          }
        }
      }
    }
    return Array.from(allTypes);
  }

  getIctIcon(ictType: string): string {
    const icons: { [key: string]: string } = {
      'Web': 'language',
      'Software': 'code',
      'Hardware': 'devices',
      'Electronic_Content': 'description',
      'Telecommunications': 'cell_tower',
      'Multimedia': 'play_circle',
      'Medical_Devices': 'medical_services'
    };
    return icons[ictType] || 'category';
  }

  getIctExplanation(): string {
    if (!this.ragDocuments || this.ragDocuments.length === 0) return '';
    // Prefer the ICT explanation from a file whose applicability matches the
    // solicitation-level verdict, so the displayed reasoning never contradicts
    // the headline (any-applicable-file-wins rule).
    const wantApplicable = !!this.ragData?.ai_applicable;
    const aligned = this.ragDocuments.find(
      d => d.ict_explanation && this.docIsApplicable(d) === wantApplicable
    );
    if (aligned) return aligned.ict_explanation;
    // Fallback: any file with an ICT explanation.
    for (const doc of this.ragDocuments) {
      if (doc.ict_explanation) return doc.ict_explanation;
    }
    return '';
  }

  /** Normalize a document's applicability flag (the API serializes it as a string). */
  private docIsApplicable(doc: any): boolean {
    return String(doc?.is_508_applicable).toLowerCase() === 'true';
  }

  getApplicabilityExplanation(): string {
    if (!this.ragDocuments || this.ragDocuments.length === 0) return '';
    // The solicitation-level verdict uses the "any applicable file wins" rule.
    // The explanation we surface MUST come from a file that agrees with that
    // verdict — otherwise we show an inventory/back-office file's "not
    // applicable" reasoning under a "Section 508 Applies" headline (the bug
    // Laura reported on N0018926QL158).
    const wantApplicable = !!this.ragData?.ai_applicable;
    const aligned = this.ragDocuments.find(
      d => d.applicability_explanation && this.docIsApplicable(d) === wantApplicable
    );
    if (aligned) return aligned.applicability_explanation;
    // Fallback: any file with an explanation.
    for (const doc of this.ragDocuments) {
      if (doc.applicability_explanation) return doc.applicability_explanation;
    }
    return '';
  }

  /**
   * A plain description of WHAT the solicitation is procuring.
   * Prefers the clean procurement summaries; falls back to the AI explanation.
   */
  getSolicitationDescription(): string {
    return this.ragData?.solicitation_summary
      || this.ragData?.procurement_description
      || this.ragData?.ai_solicitation_explanation
      || '';
  }

  /**
   * The reasoning behind the determination — WHY this solicitation was
   * judged applicable/compliant (or not), at the overall solicitation level.
   * This is the data the reviewer needs to understand the verdict.
   */
  getDeterminationRationale(): string {
    const rationale = this.ragData?.determination_summary
      || this.ragData?.ai_solicitation_explanation
      || this.getApplicabilityExplanation()
      || '';
    // Avoid duplicating the same text in both the description and the rationale.
    if (rationale && rationale === this.getSolicitationDescription()) {
      return this.getApplicabilityExplanation() && this.getApplicabilityExplanation() !== rationale
        ? this.getApplicabilityExplanation()
        : '';
    }
    return rationale;
  }

  hasExecSummaryContent(): boolean {
    return !!(this.getSolicitationDescription() || this.getDeterminationRationale());
  }

  /**
   * Returns the BM25 keyword hits for a document as a sorted list of
   * { term, count } — the evidence of 508 language inclusion. Mirrors the
   * "Keywords Detected" chips shown in the manual-upload pipeline view.
   * Highest-frequency (strongest) terms first.
   */
  getKeywordHits(doc: any): { term: string; count: number }[] {
    if (!doc) return [];
    let hits = doc.bm25_keyword_hits;
    if (!hits) return [];
    if (typeof hits === 'string') {
      try { hits = JSON.parse(hits); } catch { return []; }
    }
    if (typeof hits !== 'object') return [];
    return Object.keys(hits)
      .map(term => ({ term, count: Number(hits[term]) || 0 }))
      .filter(h => h.count > 0)
      .sort((a, b) => b.count - a.count);
  }

  hasKeywordHits(doc: any): boolean {
    return this.getKeywordHits(doc).length > 0;
  }

  /** Total number of 508 keyword occurrences found in a document. */
  getKeywordHitTotal(doc: any): number {
    return this.getKeywordHits(doc).reduce((sum, h) => sum + h.count, 0);
  }

  /**
   * Maps the four canonical reviewRec values to determination-card display state.
   * Mirrors the daily-report dashboard so the detail page stays consistent.
   *   Compliant                          -> Section 508 Language Found      (blue)
   *   Non-compliant (Action Required)    -> Section 508 Language Not Found  (red)
   *   Cannot Evaluate (Review Required)  -> Cannot Determine                (amber)
   *   Not Applicable                     -> Section 508 Not Applicable      (grey)
   */
  getVerdictText(): string {
    if (this.hasExemption) { return 'Section 508 Exemption'; }
    if (this.alreadyAddressed) { return 'Section 508 Language Found'; }
    switch (this.solicitation?.reviewRec) {
      case 'Compliant': return 'Section 508 Language Found';
      case 'Cannot Evaluate (Review Required)': return 'Cannot Determine';
      case 'Not Applicable': return 'Section 508 Not Applicable';
      case 'Non-compliant (Action Required)': return 'Section 508 Language Not Found';
      default: return 'Cannot Determine';
    }
  }

  getVerdictClass(): string {
    if (this.hasExemption) { return 'determination-card--review'; }
    if (this.alreadyAddressed) { return 'determination-card--compliant'; }
    switch (this.solicitation?.reviewRec) {
      case 'Compliant': return 'determination-card--compliant';
      case 'Cannot Evaluate (Review Required)': return 'determination-card--review';
      case 'Not Applicable': return 'determination-card--na';
      case 'Non-compliant (Action Required)': return 'determination-card--noncompliant';
      default: return 'determination-card--review';
    }
  }

  getVerdictIcon(): string {
    if (this.hasExemption) { return 'gpp_maybe'; }
    if (this.alreadyAddressed) { return 'verified'; }
    switch (this.solicitation?.reviewRec) {
      case 'Compliant': return 'verified';
      case 'Cannot Evaluate (Review Required)': return 'help';
      case 'Not Applicable': return 'remove_circle';
      case 'Non-compliant (Action Required)': return 'warning';
      default: return 'help';
    }
  }

  /** Title-case label for the compact Integration Assessment card. */
  getVerdictLabel(): string {
    switch (this.solicitation?.reviewRec) {
      case 'Compliant': return 'Included';
      case 'Cannot Evaluate (Review Required)': return 'Cannot Evaluate';
      case 'Not Applicable': return 'Not Applicable';
      case 'Non-compliant (Action Required)': return 'Not Included';
      default: return 'Cannot Determine';
    }
  }

  /** Color-coded badge class for the Integration Assessment card. */
  getAssessmentBadgeClass(): string {
    switch (this.solicitation?.reviewRec) {
      case 'Compliant': return 'assessment-badge--included';
      case 'Cannot Evaluate (Review Required)': return 'assessment-badge--review';
      case 'Not Applicable': return 'assessment-badge--na';
      case 'Non-compliant (Action Required)': return 'assessment-badge--notincluded';
      default: return 'assessment-badge--review';
    }
  }

  /**
   * For Cannot Evaluate solicitations, return a concrete reason rather than
   * the generic "manual review required" message. Order of precedence: no
   * documents → no machine-readable documents → no extractable text →
   * generic fallback.
   */
  getCannotEvaluateReason(): string {
    const ps: any[] = this.solicitation?.parseStatus || [];
    const fileCount = ps.filter(f => f && f.name).length;
    if (fileCount === 0) {
      return 'No documents were attached to this solicitation, so there was nothing to analyze.';
    }
    const readable = ps.filter(f => f && (f.status === 'Yes' || f.status === 'successfully parsed')).length;
    if (readable === 0) {
      return `None of the ${fileCount} attached document${fileCount === 1 ? '' : 's'} were machine readable, so the pipeline could not extract their contents for analysis.`;
    }
    if (this.ragDocuments && this.ragDocuments.length === 0) {
      return 'The attached documents could not be analyzed by the pipeline. A manual review is required.';
    }
    return 'This solicitation could not be automatically evaluated for Section 508 accessibility requirements. A manual review is required.';
  }

  /** A short, single-clause version of the Cannot Evaluate reason for badges. */
  getCannotEvaluateReasonShort(): string {
    const ps: any[] = this.solicitation?.parseStatus || [];
    const fileCount = ps.filter(f => f && f.name).length;
    if (fileCount === 0) return 'No documents attached';
    const readable = ps.filter(f => f && (f.status === 'Yes' || f.status === 'successfully parsed')).length;
    if (readable === 0) return 'No machine-readable documents';
    return 'Manual review required';
  }

  private processParseStatus(data: any): void {
    if (data.parseStatus && Array.isArray(data.parseStatus)) {
      data.parseStatus.forEach((element) => {
        element.status = this.mapStatus(element.status);
        element.formattedDate = moment(element.postedDate).format('L');
      });
    } else {
      data.parseStatus = [this.getDefaultParseStatus()];
    }
  }

  private mapStatus(status: string): string {
    return status === 'successfully parsed' ? 'Yes' :
      status === 'processing error' ? 'No' : status;
  }

  /**
   * Reconcile the legacy Scan Results "Machine readable" status with what the
   * V4.1 pipeline actually did. The legacy textract-based scraper sometimes
   * marks a file "processing error" even when the V4.1 pipeline (pymupdf →
   * pdfplumber → OCR fallback) successfully read it and produced a per-file
   * BM25 verdict. In that case the file IS machine readable for our purposes,
   * and showing "No" alongside an Included verdict is contradictory.
   *
   * Rule: if a rag-documents row exists for this filename with a non-empty
   * bm25_prediction, the V4.1 pipeline read the file — show "Yes". Otherwise
   * leave the legacy mapping in place.
   */
  private reconcileScanResultsWithV4(): void {
    if (!this.solicitation?.parseStatus || !Array.isArray(this.solicitation.parseStatus)) return;
    if (!this.ragDocuments || this.ragDocuments.length === 0) return;

    const v4ReadByName = new Set<string>();
    for (const d of this.ragDocuments) {
      const name = (d?.file_name || '').toString().trim();
      const bm25 = (d?.bm25_prediction || '').toString().trim();
      if (name && bm25) v4ReadByName.add(name);
    }
    if (v4ReadByName.size === 0) return;

    for (const ps of this.solicitation.parseStatus) {
      const name = (ps?.name || '').toString().trim();
      if (name && v4ReadByName.has(name) && ps.status !== 'Yes') {
        ps.status = 'Yes';
      }
    }
  }

  private getDefaultParseStatus(): ParseStatus {
    return { formattedDate: '', postedDate: null, name: '', status: '', attachment_url: '' };
  }

  private setSolicitationData(data: any): void {
    this.solicitation = data;
    this.solicitationID = data.id;
  }

  private processDocuments(): void {
    const totalDoc = Number(this.solicitation.numDocs);
    if (!isNaN(totalDoc) && totalDoc !== this.solicitation.parseStatus.length) {
      const lock = totalDoc - this.solicitation.parseStatus.length;
      this.lockDocs = Array(lock).fill(0).map((_, i) => i + 1);
    }
  }

  // ── Mark as Not Applicable with reason capture (#18) ──────────────
  // The previous behavior was a silent toggle on `na_flag`, which gave us no
  // audit trail of why a reviewer overrode the system verdict. Now: when the
  // reviewer checks the box, we surface a small reason form, persist the
  // na_flag once a reason is provided, and also write the reason as a piece
  // of feedback so it shows up in the admin feedback view alongside the QA
  // disagreements.
  showNaReasonForm = false;
  naReasonChoice = '';
  naReasonComment = '';
  naSavingError = '';

  onNotApplicableClick(event: any): void {
    const checked = !!event.target.checked;
    if (checked) {
      // Don't persist the flag yet — wait for a reason.
      this.showNaReasonForm = true;
      this.naReasonChoice = '';
      this.naReasonComment = '';
      this.naSavingError = '';
      // Re-bind the checkbox to the (still false) flag until the reason is saved.
      event.target.checked = !!this.solicitation.na_flag;
      return;
    }
    // Unchecking — clear the flag immediately, no reason required to undo.
    this.persistNaFlag(false, '', '');
  }

  saveNotApplicableReason(): void {
    if (!this.naReasonChoice) {
      this.naSavingError = 'Please pick a reason.';
      return;
    }
    if (this.naReasonChoice === 'other' && this.naReasonComment.trim().length < 5) {
      this.naSavingError = 'Add a short note for "Other".';
      return;
    }
    this.persistNaFlag(true, this.naReasonChoice, this.naReasonComment.trim());
  }

  cancelNotApplicableReason(): void {
    this.showNaReasonForm = false;
    this.naReasonChoice = '';
    this.naReasonComment = '';
    this.naSavingError = '';
  }

  private persistNaFlag(flag: boolean, reasonChoice: string, comment: string): void {
    this.solicitation.na_flag = flag;
    this.solicitationService.update(this.solicitation).subscribe({
      next: () => {
        // On flag-set, also drop a feedback row so the override leaves a paper
        // trail with the chosen reason. Failures here are non-fatal — the flag
        // is the source of truth; feedback is supplementary.
        if (flag) {
          const lines = [
            `Solicitation marked Not Applicable by reviewer.`,
            `Reason: ${this.formatNaReason(reasonChoice)}`,
          ];
          if (comment) {
            lines.push('');
            lines.push('Reviewer notes:');
            lines.push(comment);
          }
          this.http.post(`${environment.SERVER_URL}/feedback`, {
            source: 'solicitation_detail',
            feedback_text: lines.join('\n'),
            solicitation_number: this.solicitation.solNum,
          }).subscribe({ next: () => {}, error: () => {} });
        }
        this.showNaReasonForm = false;
      },
      error: (err) => {
        console.error('[onNotApplicableClick] Error:', err);
        this.naSavingError = 'Could not save. Please try again.';
        // Roll back the in-memory flag so the UI stays truthful.
        this.solicitation.na_flag = !flag;
      }
    });
    this.gaService.event('not_applicable', 'make_srt_better',
      flag ? `Not Applicable: ${reasonChoice}` : 'Cleared Not Applicable');
  }

  private formatNaReason(choice: string): string {
    switch (choice) {
      case 'back_office': return 'Back-office / National Security Systems exception';
      case 'no_ict': return 'No ICT being procured';
      case 'classified': return 'Classified or restricted procurement';
      case 'maintenance_only': return 'Maintenance / services only — no covered ICT delivered';
      case 'other': return 'Other';
      default: return choice;
    }
  }

  onClickTabs(action: string, label: string): void {
    this.gaService.event(action, "solicitation_tab", label);
  }

  /**
   * Handle clicks on a solicitation file in the Scan Results table.
   * Logs an analytics event and lets the browser handle the download
   * via the anchor's download/href attributes. If the URL is missing
   * or invalid, prevent navigation so the SPA doesn't bounce home.
   */
  onFileClick(event: MouseEvent, doc: ParseStatus): void {
    if (!doc?.attachment_url) {
      event.preventDefault();
      event.stopPropagation();
      console.warn('[results-detail] File click suppressed: missing attachment_url for', doc?.name);
      return;
    }
    this.gaService.event('download', 'solicitation_file', doc.name || 'unknown');
  }
}
