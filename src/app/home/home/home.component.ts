import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { environment } from '../../../environments/environment';
import { Section508Clause, resolveClause, clauseToPlainText } from '../../shared/section508-clause';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent
  extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  currentID: string;
  isGSAAdmin = false;
  Object = Object;

  // — Pipeline state —
  pipelineVersion: 'v1' | 'v2' | 'v3' | 'v4' = 'v4';
  showVectorMatches = false;
  showStageDebug = false;
  showOverrideResults = false;
  pipelineStageCount = 0;
  pipelineTotalStages = 7;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  rawText = '';
  isRunning = false;
  isDragging = false;
  errorMessage = '';

  // Screen-reader status announcer. Bound to a visually-hidden aria-live region
  // in the template so assistive tech is told when analysis starts and finishes
  // (instead of trying to announce the entire results region at once).
  srStatus = '';

  // Backed by _pipelineResults so setting a truthy result (from any of the
  // several success paths) automatically announces "analysis complete".
  private _pipelineResults: any = null;
  get pipelineResults(): any { return this._pipelineResults; }
  set pipelineResults(value: any) {
    this._pipelineResults = value;
    if (value) {
      this.srStatus = 'Analysis complete. Your Section 508 results are shown below.';
      // A fresh run just auto-saved a new draft version — refresh My Drafts.
      if (!value.from_saved_draft) {
        this.loadDrafts();
      }
    }
  }
  allResults: any[] = [];
  currentFileIndex = 0;
  totalFiles = 0;
  selectedTab = 0;

  // Stage progress
  stages = [
    'Initializing AI Agents...',
    'Parsing Document Content...',
    'Extracting AI Embeddings...',
    'Running Context Validations...',
    'Generating Final Synthesis...'
  ];
  // Backed by a setter so every stage change is announced to screen readers
  // (state changes must re-read — GSA 508 team feedback).
  private _currentStageMessage = '';
  get currentStageMessage(): string { return this._currentStageMessage; }
  set currentStageMessage(v: string) {
    this._currentStageMessage = v;
    if (v && this.isRunning) { this.srStatus = v; }
  }
  stageLog: string[] = [];
  showPipelineLog = false;
  reportReady = false;

  // Snapple-cap Section 508 fun facts. One is chosen at random per run and held
  // for the whole analysis (rotating them tested as distracting).
  readonly funFacts: string[] = [
    'Section 508 is part of the Rehabilitation Act of 1973 — amended in 1998 to require federal agencies to make their electronic and information technology accessible.',
    'The Revised 508 Standards (the 2017 "508 Refresh") use WCAG 2.0 Level AA as the benchmark for federal technology.',
    'Section 508 applies whenever federal agencies develop, procure, maintain, or use information and communication technology.',
    'About 1 in 4 U.S. adults lives with a disability, according to the CDC.',
    'Captions aren\'t just for people who are deaf or hard of hearing — most viewers turn them on in noisy places or with the sound off.',
    'The U.S. Access Board writes the technical standards behind Section 508.',
    'WCAG is built on four principles: Perceivable, Operable, Understandable, and Robust — "POUR."',
    'Curb cuts were designed for wheelchair users but help everyone — strollers, luggage, delivery carts. Digital accessibility works the same way.',
    'Clear headings, alt text, and strong color contrast don\'t just aid assistive technology — they make documents easier for everyone to use.',
    'Section 504 covers access to federally funded programs and services; Section 508 specifically covers technology.',
  ];
  factIndex = 0;

  // A11y: move focus into the progress popup when analysis starts — the Run
  // button disables at that moment, which would otherwise silently drop
  // keyboard/screen-reader focus to the page body.
  @ViewChild('progressModal') set progressModal(el: ElementRef | undefined) {
    if (el) {
      setTimeout(() => { try { el.nativeElement.focus(); } catch (e) { /* no-op */ } }, 0);
    }
  }

  /** Pick ONE fact and keep it for the whole analysis. Reviewers found the
      rotating version distracting; a single stable fact still engages. */
  private startFunFacts(): void {
    this.factIndex = Math.floor(Math.random() * this.funFacts.length);
  }

  // A11y: when the result overlay renders, move focus + scroll to the top of
  // the result (the verdict) instead of leaving it partway down the page.
  private reportScrolled = false;
  @ViewChild('reportTop') set reportTop(el: ElementRef | undefined) {
    // Only scroll/focus to the top once, when the report first appears — not on
    // every change-detection cycle (e.g. loading ART requirements), which would
    // yank the reviewer back to the top of the report mid-task.
    if (el && !this.reportScrolled) {
      this.reportScrolled = true;
      setTimeout(() => {
        try {
          el.nativeElement.scrollIntoView({ block: 'start' });
          el.nativeElement.focus();
        } catch (e) { /* no-op */ }
      }, 0);
    }
  }

  private adminCheckTimes = 0;
  private interval: any;

  @ViewChild('fileInputRef') fileInputRef: ElementRef<HTMLInputElement>;

  constructor(
    private auth: AuthGuard,
    private router: Router,
    private titleService: Title,
    private $gaService: GoogleAnalyticsService,
    private http: HttpClient,
  ) {
    super(titleService);
  }

  ngOnInit() {
    console.log('UI: Initializing component.');
    this.setupInitialState();
    this.checkAdminStatus();
    this.loadDrafts();
  }

  ngAfterViewInit() {
    console.log('UI: View initialized.');
  }

  ngOnDestroy() {
    console.log('UI: Component destroyed.');
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onClickTiles(action: string, label: string) {
    console.log(`UI: Tile clicked - Action: ${action}, Label: ${label}`);
    this.$gaService.event(action, 'home_tiles', label);
  }

  private setupInitialState() {
    console.log('UI: Setting up initial state.');
    this.loadAdminComponents();
    this.currentID = localStorage.getItem('id');
    this.pageName = 'SRT Home Page';
    super.ngOnInit();
  }

  private loadAdminComponents() {
    this.isGSAAdmin = this.auth.checkAdmin();
    console.log('UI: GSA Admin status:', this.isGSAAdmin);
  }

  private checkAdminStatus() {
    this.interval = setInterval(() => {
      this.loadAdminComponents();
      console.log('UI: Checking admin status. Attempt:', this.adminCheckTimes);
      if (this.adminCheckTimes > 1) {
        clearInterval(this.interval);
      }
      this.adminCheckTimes++;
    }, 2000);
  }

  // ─── File handling ───

  onFileSelect(event: any): void {
    const files: File[] = Array.from(event.target.files || []);
    if (!files.length) return;

    const maxSize = 50 * 1024 * 1024; // 50MB per file
    const validFiles = files.filter(f => {
      if (f.size > maxSize) {
        alert(`File "${f.name}" exceeds maximum allowed size of 50MB and was skipped.`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    this.selectedFiles = validFiles;
    this.selectedFile = validFiles[0]; // Keep for backward compat
    this.forceRerun = false;
    this.rawText = '';
    this.pipelineResults = null;
    this.allResults = [];
    this.errorMessage = '';

    console.log('UI: Files selected:', validFiles.map(f => f.name));
    this.$gaService.event('file_select', 'adhoc_prediction', `Files: ${validFiles.length}`);
  }

  removeFile(): void {
    this.selectedFile = null;
    this.selectedFiles = [];
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  handleDrag(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = event.type === 'dragenter' || event.type === 'dragover';
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      const files: File[] = Array.from(event.dataTransfer.files);
      const validFiles = files.filter(f => allowedTypes.includes(f.type));

      if (validFiles.length === 0) {
        this.errorMessage = 'Unsupported file type. Please use PDF, DOCX, or TXT.';
        return;
      }

      this.selectedFiles = validFiles;
      this.selectedFile = validFiles[0];
      this.forceRerun = false;
      this.rawText = '';
      this.pipelineResults = null;
      this.allResults = [];
      this.errorMessage = '';
      console.log('UI: Files dropped:', validFiles.map(f => f.name));
    }
  }

  // ─── Pipeline execution ───

  runPipeline(): void {
    this.errorMessage = '';
    this.pipelineResults = null;
    this.allResults = [];
    this.isRunning = true;
    this.reportScrolled = false;
    this.actionChecked = {};
    this.openSections = { actions: true, findings: true };
    this.srStatus = 'Analyzing your solicitation for Section 508 language. This may take a moment.';
    this.stageLog = [];
    this.pipelineStageCount = 0;
    this.currentStageMessage = 'Connecting to pipeline...';
    this.reportReady = false;
    this.showPipelineLog = false;
    this.startFunFacts();

    // Determine files to process
    const filesToProcess = this.selectedFiles.length > 0 ? this.selectedFiles : [];
    const hasText = this.rawText && this.rawText.length >= 10;

    if (filesToProcess.length === 0 && !hasText) {
      this.errorMessage = 'Please provide a file or at least 10 characters of text.';
      this.isRunning = false;
      return;
    }

    if (hasText && filesToProcess.length === 0) {
      // Single text analysis
      this.totalFiles = 1;
      this.currentFileIndex = 1;
      this.runSingleAnalysis(null, this.rawText);
    } else {
      // Multi-file analysis
      this.totalFiles = filesToProcess.length;
      this.currentFileIndex = 0;
      this.processNextFile(filesToProcess, 0);
    }

    this.$gaService.event('run_pipeline', 'adhoc_prediction', filesToProcess.length > 0 ? `${filesToProcess.length} files` : 'raw_text');
  }

  private processNextFile(files: File[], index: number): void {
    if (index >= files.length) {
      // All files processed — determine package-level compliance
      // If ANY file is compliant, the whole package is compliant
      const anyCompliant = this.allResults.some(r => r.ml_prediction?.prediction === 'compliant');
      const allFileNames = files.map(f => f.name);

      if (this.allResults.length === 1) {
        // Single file — use as-is
        this.pipelineResults = this.allResults[0];
        this.isRunning = false;
        this.reportReady = true;
      } else {
        // Multi-file — generate package synthesis
        this.currentStageMessage = 'Generating package synthesis...';
        this.generatePackageSynthesis(anyCompliant, allFileNames).then(packageSynthesis => {
          console.log('UI: Building package result. allResults:', this.allResults.length, 'Files:', this.allResults.map(r => r.file_name), 'ML:', this.allResults.map(r => r.ml_prediction?.prediction), 'anyCompliant:', anyCompliant);
          const reportsCopy = [...this.allResults]; // Snapshot to avoid mutation
          this.pipelineResults = {
            success: true,
            status: 'Complete',
            multi_file: true,
            file_count: reportsCopy.length,
            reports: reportsCopy,
            package_determination: anyCompliant ? 'compliant' : 'non_compliant',
            package_synthesis: packageSynthesis,
            // Aggregate fields
            ml_prediction: { prediction: anyCompliant ? 'compliant' : 'non_compliant', source: 'srt-ml (package-level)' },
            applicability: this.allResults.find(r => r.applicability?.is_508_applicable)?.applicability || this.allResults[0]?.applicability,
            ict_classification: this.mergeIctClassifications(),
            art_clauses: this.allResults.find(r => r.art_clauses?.language)?.art_clauses || this.allResults[0]?.art_clauses,
            synthesis: packageSynthesis,
            generated_at: new Date().toISOString(),
            pipeline_version: this.allResults[0]?.pipeline_version || '2.0',
            file_name: allFileNames.join(', '),
            pipeline_note: `Full analysis completed for ${this.allResults.length} file(s). Package is ${anyCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'} — if any file includes 508 language, the package is considered compliant.`
          };
          this.isRunning = false;
          this.reportReady = true;
          this.selectedTab = 0;
        });
      }
      return;
    }

    this.currentFileIndex = index + 1;
    this.currentStageMessage = `Analyzing file ${index + 1}/${files.length}: ${files[index].name}`;
    this.runSingleAnalysis(files[index], null, () => {
      this.processNextFile(files, index + 1);
    });
  }

  private async generatePackageSynthesis(anyCompliant: boolean, fileNames: string[]): Promise<any> {
    const summaries = this.allResults.map((r, i) => {
      return `File ${i + 1} (${fileNames[i]}): ${r.synthesis?.executive_summary || 'No summary available'}. ML Prediction: ${r.ml_prediction?.prediction || 'unknown'}. ICT: ${r.ict_classification?.primary_ict_category || 'unknown'}. Applicability: ${r.applicability?.is_508_applicable ? 'Yes' : 'No'}.`;
    });

    try {
      const response = await fetch(`${environment.SERVER_URL}/rag-analytics/playground/package-synthesis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summaries,
          file_count: fileNames.length,
          any_compliant: anyCompliant
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.synthesis || this.fallbackSynthesis(anyCompliant, fileNames);
      }
    } catch (e) {
      console.warn('Package synthesis failed:', e);
    }

    return this.fallbackSynthesis(anyCompliant, fileNames);
  }

  private fallbackSynthesis(anyCompliant: boolean, fileNames: string[]): any {
    return {
      executive_summary: `This solicitation package contains ${fileNames.length} documents. ${anyCompliant ? 'The package is COMPLIANT — at least one document includes Section 508 accessibility requirements.' : 'The package is NON-COMPLIANT — no documents include adequate Section 508 language.'}`,
      key_findings: this.allResults.flatMap(r => (r.synthesis?.key_findings || []).slice(0, 2)),
      procurement_description: this.allResults.map(r => r.synthesis?.procurement_description).filter(Boolean).join(' ')
    };
  }

  private mergeIctClassifications(): any {
    const merged: any = { ict_types: {}, primary_ict_category: '', explanation: '' };
    for (const r of this.allResults) {
      if (r.ict_classification?.ict_types) {
        for (const [k, v] of Object.entries(r.ict_classification.ict_types)) {
          if (v) merged.ict_types[k] = true;
        }
      }
      if (r.ict_classification?.primary_ict_category && !merged.primary_ict_category) {
        merged.primary_ict_category = r.ict_classification.primary_ict_category;
      }
    }
    merged.explanation = `Merged ICT classification across ${this.allResults.length} files.`;
    return merged;
  }

  private runSingleAnalysis(file: File | null, text: string | null, onComplete?: () => void): void {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (text) {
      formData.append('text', text);
    }
    // Bypass the per-user result cache when the reviewer asks to re-run.
    if (this.forceRerun) {
      formData.append('force', 'true');
    }

    let completedResult: any = null;
    let progressiveResult: any = { success: true };
    const apiUrl = (this.pipelineVersion === 'v2' || this.pipelineVersion === 'v3')
      ? `${environment.SERVER_URL}/pipeline-v2/analyze`
      : this.pipelineVersion === 'v4'
      ? `${environment.SERVER_URL}/pipeline-v4/analyze`
      : `${environment.SERVER_URL}/rag-analytics/playground/analyze?stream=true`;
    console.log('UI: Calling RAG pipeline (SSE) at', apiUrl, file ? file.name : 'raw_text');

    // For v2/v3, append pipeline_version to formData so backend knows which prompts to use
    if (this.pipelineVersion === 'v2' || this.pipelineVersion === 'v3') {
      formData.append('pipeline_version', this.pipelineVersion);
    }

    fetch(apiUrl, {
      method: 'POST',
      body: formData,
      // The JWT identifies the user so the run auto-saves to My Drafts and the
      // per-user result cache can match identical re-uploads.
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errText => {
          let errMsg = `Pipeline failed with status ${response.status}`;
          try { errMsg = JSON.parse(errText).error || errMsg; } catch(e) {}
          throw new Error(errMsg);
        });
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const processStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              const result = completedResult || progressiveResult;
              if (result && (result.file_name || result.ml_prediction)) {
                // Deep copy to prevent mutation by subsequent file processing
                this.allResults.push(JSON.parse(JSON.stringify(result)));
                console.log('UI: File result pushed:', result.file_name, 'ML:', result.ml_prediction?.prediction, 'Total results:', this.allResults.length);
              }
              if (onComplete) onComplete();
              else {
                this.pipelineResults = result;
                this.isRunning = false;
                this.reportReady = true;
              }
              return;
            }

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split('\n\n');
            buffer = events.pop() || '';

            for (const eventBlock of events) {
              if (!eventBlock.trim()) continue;
              const lines = eventBlock.split('\n');
              let currentEvent = 'message';
              let dataStr = '';

              for (const line of lines) {
                if (line.startsWith('event: ')) {
                  currentEvent = line.substring(7).trim();
                } else if (line.startsWith('data: ')) {
                  dataStr += line.substring(6);
                }
              }

              if (dataStr) {
                try {
                  const data = JSON.parse(dataStr);
                  // Detect complete event
                  if (currentEvent === 'complete' || (data.success !== undefined && data.status === 'Complete')) {
                    completedResult = data;
                    console.log('UI: Captured complete result for file:', data.file_name);
                  }
                  // Also build progressive result locally per-file
                  if (currentEvent === 'stage_result' || (data.stage && data.data && currentEvent !== 'complete')) {
                    if (data.stage === 'parsing') { progressiveResult.file_name = data.data?.fileName; progressiveResult.document_length = data.data?.charCount; }
                    else if (data.stage === 'ml_prediction') { progressiveResult.ml_prediction = data.data; }
                    else if (data.stage === 'ict_classification') { progressiveResult.ict_classification = data.data; }
                    else if (data.stage === 'applicability') { progressiveResult.applicability = data.data; }
                    else if (data.stage === 'vector_matching') { progressiveResult.vector_matching = data.data; }
                    else if (data.stage === 'art_clauses') { progressiveResult.art_clauses = data.data; }
                    else if (data.stage === 'synthesis') { progressiveResult.synthesis = data.data; }
                  }
                  this.handleSSEEvent(currentEvent, data);
                } catch (e) {
                  console.warn('UI: Failed to parse SSE data:', dataStr.substring(0, 200), e);
                }
              }
            }

            processStream();
          }).catch(err => {
            console.error('UI: Stream read error:', err);
            this.errorMessage = err.message || 'Stream connection lost';
            this.srStatus = 'Analysis failed. ' + this.errorMessage;
            if (onComplete) onComplete();
            else this.isRunning = false;
          });
        };

        processStream();
      } else {
        response.json().then(data => {
          this.allResults.push(data);
          this.pipelineResults = data;
          if (onComplete) onComplete();
          else {
            this.isRunning = false;
            this.reportReady = true;
          }
        });
      }
    })
    .catch(error => {
      console.error('UI: Pipeline error:', error);
      this.errorMessage = error.message || 'An unexpected error occurred during analysis.';
      this.srStatus = 'Analysis failed. ' + this.errorMessage;
      if (onComplete) onComplete(); // Continue to next file even on error
      else this.isRunning = false;
    });
  }

  private handleSSEEvent(eventName: string, data: any): void {
    console.log(`UI: SSE [${eventName}]`, data);

    // If this looks like a complete result (has 'success' field), treat as complete
    if (data.success !== undefined && data.status === 'Complete') {
      eventName = 'complete';
    }
    // If this looks like a stage_result (has 'stage' and 'data' fields but no 'success')
    if (!eventName || eventName === 'message') {
      if (data.stage && data.data) {
        eventName = 'stage_result';
      } else if (data.stage && data.message && !data.data) {
        eventName = 'stage';
      }
    }

    switch (eventName) {
      case 'stage':
        this.currentStageMessage = data.message || data.stage;
        this.stageLog.push(`⏳ ${data.message}`);
        // Count major pipeline stages for progress bar
        const majorStages = ['extract', 'machine_readable', 'is_solicitation', 'applicability', 'ict', 'vector', 'summary', 'ml_done', 'gate_stop'];
        if (majorStages.includes(data.stage)) {
          this.pipelineStageCount = Math.min(this.pipelineStageCount + 1, this.pipelineTotalStages);
        }
        break;

      case 'stage_result':
        this.stageLog.push(`✅ ${data.message}`);
        // Progressively build results
        if (!this.pipelineResults) {
          this.pipelineResults = { success: true };
        }
        if (data.stage === 'parsing') {
          this.pipelineResults.file_name = data.data?.fileName;
          this.pipelineResults.document_length = data.data?.charCount;
        } else if (data.stage === 'ml_prediction') {
          this.pipelineResults.ml_prediction = data.data;
        } else if (data.stage === 'ict_classification') {
          this.pipelineResults.ict_classification = data.data;
        } else if (data.stage === 'applicability') {
          this.pipelineResults.applicability = data.data;
        } else if (data.stage === 'vector_matching') {
          this.pipelineResults.vector_matching = data.data;
        } else if (data.stage === 'art_clauses') {
          this.pipelineResults.art_clauses = data.data;
        } else if (data.stage === 'synthesis') {
          this.pipelineResults.synthesis = data.data;
        }
        break;

      case 'complete':
        this.pipelineResults = data;
        // Don't push here — runSingleAnalysis handles it via the stream done callback
        this.currentStageMessage = 'Report generated';
        this.stageLog.push(`🎉 Report complete for file ${this.currentFileIndex}/${this.totalFiles}`);
        break;

      case 'error':
        this.errorMessage = data.error || 'Pipeline error';
        this.stageLog.push(`❌ Error: ${data.error}`);
        this.isRunning = false;
        break;
    }
  }

  // ─── Reset ───

  resetAnalysis(): void {
    console.log('UI: Resetting analysis state');
    // Bottom "Check another solicitation" CTA sits at the end of a long report —
    // bring the reviewer back to the upload card.
    window.scrollTo({ top: 0 });
    this.forceRerun = false;
    this.selectedFile = null;
    this.selectedFiles = [];
    this.rawText = '';
    this.pipelineResults = null;
    this.allResults = [];
    this.isRunning = false;
    this.errorMessage = '';
    this.isDragging = false;
    this.currentStageMessage = '';
    this.stageLog = [];
    this.showPipelineLog = false;
    this.reportReady = false;
    this.currentFileIndex = 0;
    this.totalFiles = 0;

    // Clear native file input
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }

    this.$gaService.event('reset_analysis', 'adhoc_prediction', 'Analysis Reset');
  }

  getActiveIctTypes(): string[] {
    const source = this.getActiveReport();
    const types = source?.ict_classification?.ict_types;
    if (!types) return [];
    return Object.entries(types)
      .filter(([_, v]) => v)
      .map(([k]) => k.replace(/_/g, ' '));
  }

  getActiveReport(): any {
    if (this.pipelineResults?.multi_file && this.pipelineResults?.reports?.length > 1) {
      return this.pipelineResults.reports[this.selectedTab] || this.pipelineResults;
    }
    return this.pipelineResults;
  }

  getIctIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'software': 'code',
      'hardware': 'monitor',
      'cloud services': 'cloud_done',
      'web applications': 'language',
      'mobile applications': 'smartphone',
      'electronic documents': 'description',
      'multimedia': 'play_circle',
      'telecommunications': 'call',
      'kiosks self service': 'point_of_sale',
      'it services': 'support_agent'
    };
    return icons[type] || 'devices';
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // ── ART (Section 508 Requirements) — on-demand fetch (v4) ──────────
  // Mirrors the dashboard detail page: when ICT types are detected, the
  // reviewer can click "Get Requirements" to call the ART API for the
  // applicable Section 508 requirement clauses.
  artRequirements: any = null;
  artLoading = false;
  artError = '';
  showArt = false;

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
        setTimeout(() => this.scrollToRequirements(), 50);
      },
      error: (err) => {
        this.artError = 'Unable to load ART requirements. Please try again.';
        this.artLoading = false;
      }
    });
  }

  // Jump to the Section 508 requirements section from the next-step banner.
  // If requirements were already fetched but hidden, reveal them too.
  scrollToRequirements(): void {
    if (this.artRequirements) { this.showArt = true; }
    setTimeout(() => document.getElementById('srt-req-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  /** Checklist CTA: generate + reveal the requirements inline, right here. */
  getRequirements(): void {
    this.openSections['actions'] = true;
    if (!this.artRequirements && !this.artLoading) {
      this.fetchArtRequirements();
    }
    this.showArt = true;
  }

  /** Jump to a report section from the table-of-contents rail. */
  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── My Drafts: per-user auto-saved runs with version history ──
  drafts: any[] = [];
  expandedDraftId: number | null = null;
  draftDetail: any = null;
  // One-shot cache bypass; cleared whenever new content is selected.
  forceRerun = false;

  loadDrafts(): void {
    this.http.get<any[]>(`${environment.SERVER_URL}/drafts`).subscribe({
      next: (d) => { this.drafts = d || []; },
      error: () => { /* drafts are a convenience — never block the page */ }
    });
  }

  toggleDraft(d: any): void {
    if (this.expandedDraftId === d.id) {
      this.expandedDraftId = null;
      this.draftDetail = null;
      return;
    }
    this.expandedDraftId = d.id;
    this.draftDetail = null;
    this.http.get<any>(`${environment.SERVER_URL}/drafts/${d.id}`).subscribe({
      next: (detail) => { this.draftDetail = detail; },
      error: () => { this.expandedDraftId = null; }
    });
  }

  /** Reopen a saved version's report exactly as it was generated. */
  openDraftVersion(v: any): void {
    this.reportScrolled = false;
    this.actionChecked = {};
    this.openSections = { actions: true, findings: true };
    this.summaryExpanded = false;
    this.pipelineResults = { ...v.result, from_saved_draft: true, saved_at: v.created_at, saved_version: v.version_number };
    this.reportReady = true;
  }

  deleteDraft(d: any, event: Event): void {
    event.stopPropagation();
    if (!confirm(`Delete "${d.title}" and all ${d.version_count} saved version${d.version_count === 1 ? '' : 's'}? This cannot be undone.`)) { return; }
    this.http.delete(`${environment.SERVER_URL}/drafts/${d.id}`).subscribe({
      next: () => {
        this.drafts = this.drafts.filter(x => x.id !== d.id);
        if (this.expandedDraftId === d.id) { this.expandedDraftId = null; this.draftDetail = null; }
      },
      error: () => { alert('Unable to delete draft. Please try again.'); }
    });
  }

  /** "Re-run anyway" from a cached result — bypasses the result cache once. */
  rerunFresh(): void {
    this.forceRerun = true;
    this.runPipeline();
  }

  draftVerdictLabel(verdict: string): string {
    switch (verdict) {
      case 'compliant': return 'Language Found';
      case 'non_compliant': return 'Language Not Found';
      case 'not_applicable': return 'Not Applicable';
      case 'not_machine_readable': return 'Not Readable';
      default: return verdict || '—';
    }
  }

  draftVerdictClass(verdict: string): string {
    switch (verdict) {
      case 'compliant': return 'draft-badge--found';
      case 'non_compliant': return 'draft-badge--notfound';
      case 'not_applicable': return 'draft-badge--na';
      default: return 'draft-badge--other';
    }
  }

  // ── TOC scrollspy: highlight the section currently in view ──
  activeTocId = '';
  private readonly tocAnchorIds = [
    'srt-overview-anchor',
    'srt-summary-anchor',
    'srt-actions-anchor',
  ];

  @HostListener('document:keydown', ['$event'])
  onShortcut(event: KeyboardEvent): void {
    if (!event.altKey || event.ctrlKey || event.metaKey || this.isRunning) { return; }
    if (event.code === 'KeyU') {
      event.preventDefault();
      this.fileInputRef?.nativeElement?.click();
    } else if (event.code === 'KeyP') {
      event.preventDefault();
      (document.getElementById('raw-text-input') as HTMLTextAreaElement)?.focus();
    } else if (event.code === 'KeyS') {
      event.preventDefault();
      if (this.selectedFiles.length > 0 || (this.rawText && this.rawText.length >= 10)) {
        this.runPipeline();
      } else {
        this.srStatus = 'Nothing to review yet. Upload a file with Alt plus U, or paste text with Alt plus P.';
      }
    }
  }

  @HostListener('window:scroll')
  updateActiveToc(): void {
    if (!this.pipelineResults) { return; }
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

  // Action-items checklist state (client-side; reset on each new run).
  actionChecked: { [i: number]: boolean } = {};

  // "Less is more": every report section except the verdict and action items
  // is collapsible and starts collapsed. Data is all still there — just shown
  // on demand to limit scrolling.
  openSections: { [k: string]: boolean } = { actions: true, findings: true };

  toggleSection(k: string): void {
    this.openSections[k] = !this.openSections[k];
  }

  /** TOC click: expand the target section (if collapsible) and jump to it. */
  openAndScroll(k: string, id: string): void {
    if (k) { this.openSections[k] = true; }
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  toggleAction(i: number): void {
    this.actionChecked[i] = !this.actionChecked[i];
  }

  get actionSteps(): { label: string; detail?: string }[] {
    // No 508 language at all → two distinct actions, because the clause and the
    // requirements go in DIFFERENT parts of the solicitation (the clause sits in
    // the body/terms; the requirements go in the SOW/PWS/SOO or an attachment).
    // Already handled (508/VPAT doc or ART content) or exempt → nothing to add.
    if (this.alreadyAddressed || this.hasExemption) { return []; }
    if (this.showRecommendedClause) {
      return [
        { label: 'Add the recommended Section 508 clause', detail: 'Copy it into the body of your solicitation.' },
        { label: 'Add the relevant Section 508 requirements', detail: 'These go in the SOW, PWS, SOO, requirements document, or an attachment.' },
        { label: 'Re-check the updated solicitation' },
      ];
    }
    const v = this.pipelineResults?.ml_prediction?.prediction;
    if (v === 'compliant') {
      return [
        { label: 'Generate Section 508 requirements', detail: 'SRT only confirms 508 is mentioned — confirm every applicable requirement is actually present.' },
        { label: 'Copy any missing requirements and paste them into the Terms & Conditions or Requirements section' },
        { label: 'Re-check the updated solicitation' },
      ];
    }
    return [
      { label: 'Generate Section 508 requirements', detail: 'Generated from the ICT types identified for this procurement.' },
      { label: 'Copy them and paste them into the Terms & Conditions or Requirements section of your solicitation' },
      { label: 'Re-check the updated solicitation' },
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

  requirementsCopied = false;

  // ── Recommended clause (only when 508 applies but nothing was found) ──
  recommendedClause: Section508Clause = resolveClause();
  clauseCopied = false;
  clauseOpen = false;
  clauseExpanded = false;
  clauseInstructionsOpen = false;

  /** 508 applies but nothing found — and they haven't already handled it. */
  get showRecommendedClause(): boolean {
    return this.pipelineResults?.applicability?.is_508_applicable === true
        && this.pipelineResults?.ml_prediction?.prediction === 'non_compliant'
        && !this.alreadyAddressed
        && !this.hasExemption;
  }

  /** Package already ships 508/VPAT documentation, or content pulled from ART. */
  get alreadyAddressed(): boolean {
    return this.pipelineResults?.already_addressed === true;
  }

  get alreadyAddressedReason(): string {
    const doc = this.pipelineResults?.section508_document;
    if (doc?.found) {
      return `This package includes a document named for ${doc.matched} (${doc.file_name}), so the Section 508 documentation appears to already be in place.`;
    }
    const art = this.pipelineResults?.art_derived;
    if (art?.found) {
      return `The requirement language in this solicitation appears to come from the Accessibility Requirements Tool (${art.signals.join('; ')}), so no additional requirements are recommended.`;
    }
    return '';
  }

  /** A documented Section 508 exemption was found. */
  get hasExemption(): boolean {
    return this.pipelineResults?.exemption?.has_exemption === true;
  }

  // ── Verdict card matrix ──
  // ONE card: not machine readable, not a solicitation, 508 not applicable.
  // TWO cards: 508 applies (verdict + applicability), including the exemption case.
  get showApplicabilityCard(): boolean {
    if (this.pipelineResults?.stopped_at_gate) { return false; }
    return this.pipelineResults?.applicability?.is_508_applicable === true;
  }

  get verdictHeading(): string {
    if (this.hasExemption) { return 'Section 508 Exemption'; }
    if (this.alreadyAddressed) { return 'Section 508 Language Found'; }
    const v = this.pipelineResults?.ml_prediction?.prediction;
    return v === 'compliant' ? 'Section 508 Language Found'
         : v === 'non_compliant' ? 'Section 508 Language Not Found'
         : 'Cannot Determine';
  }

  get verdictDescription(): string {
    if (this.hasExemption) {
      const ex = this.pipelineResults.exemption;
      return `This solicitation documents a Section 508 exemption (${ex.exemption_type}). ${ex.explanation || ''}`.trim();
    }
    if (this.alreadyAddressed) { return this.alreadyAddressedReason; }
    const v = this.pipelineResults?.ml_prediction?.prediction;
    if (v === 'compliant') {
      return 'Section 508 applies, and some required language was found in this solicitation — but you\'re not done. SRT only confirms 508 is mentioned, not that the requirements are complete. Confirm the requirements are sufficient before proceeding.';
    }
    if (v === 'non_compliant') {
      return 'Section 508 applies to this solicitation, but the required language was not found — you\'ll need to add it. (This is different from "not applicable" — 508 does apply here.)';
    }
    return 'This solicitation could not be evaluated automatically.';
  }

  get verdictCardClass(): string {
    if (this.hasExemption) { return 'determination-card--review'; }
    if (this.alreadyAddressed) { return 'determination-card--compliant'; }
    const v = this.pipelineResults?.ml_prediction?.prediction;
    return v === 'compliant' ? 'determination-card--compliant'
         : v === 'non_compliant' ? 'determination-card--noncompliant'
         : 'determination-card--review';
  }

  get verdictIcon(): string {
    if (this.hasExemption) { return 'gpp_maybe'; }
    if (this.alreadyAddressed) { return 'verified'; }
    const v = this.pipelineResults?.ml_prediction?.prediction;
    return v === 'compliant' ? 'verified' : v === 'non_compliant' ? 'warning' : 'help';
  }

  copyClause(): void {
    navigator.clipboard?.writeText(clauseToPlainText(this.recommendedClause)).then(() => {
      this.clauseCopied = true;
      setTimeout(() => { this.clauseCopied = false; }, 2000);
    }).catch(() => {});
  }
  summaryExpanded = false;

  // Copy the generated Section 508 requirements to the clipboard so reviewers
  // can paste the language straight into their solicitation.
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
}
