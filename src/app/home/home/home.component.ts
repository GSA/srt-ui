import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { environment } from '../../../environments/environment';

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
  pipelineVersion: 'v1' | 'v2' | 'v3' = 'v1';
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
  pipelineResults: any = null;
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
  currentStageMessage = '';
  stageLog: string[] = [];
  showPipelineLog = false;
  reportReady = false;

  private adminCheckTimes = 0;
  private interval: any;

  @ViewChild('fileInputRef') fileInputRef: ElementRef<HTMLInputElement>;

  constructor(
    private auth: AuthGuard,
    private router: Router,
    private titleService: Title,
    private $gaService: GoogleAnalyticsService,
  ) {
    super(titleService);
  }

  ngOnInit() {
    console.log('UI: Initializing component.');
    this.setupInitialState();
    this.checkAdminStatus();
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
    this.stageLog = [];
    this.pipelineStageCount = 0;
    this.currentStageMessage = 'Connecting to pipeline...';
    this.reportReady = false;
    this.showPipelineLog = false;

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

    let completedResult: any = null;
    let progressiveResult: any = { success: true };
    const apiUrl = (this.pipelineVersion === 'v2' || this.pipelineVersion === 'v3')
      ? `${environment.SERVER_URL}/pipeline-v2/analyze`
      : `${environment.SERVER_URL}/rag-analytics/playground/analyze?stream=true`;
    console.log('UI: Calling RAG pipeline (SSE) at', apiUrl, file ? file.name : 'raw_text');

    // For v2/v3, append pipeline_version to formData so backend knows which prompts to use
    if (this.pipelineVersion === 'v2' || this.pipelineVersion === 'v3') {
      formData.append('pipeline_version', this.pipelineVersion);
    }

    fetch(apiUrl, {
      method: 'POST',
      body: formData
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
}
