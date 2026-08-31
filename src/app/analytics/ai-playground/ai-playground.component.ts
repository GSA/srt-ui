import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../environments/environment';
import { authHeaders } from '../../shared/services/auth-fetch';

interface PipelineStage {
  id: string;
  name: string;
  type: 'llm' | 'ml_prediction' | 'art_api';
  systemPrompt: string;
  userDescription: string;
  generatingPrompt: boolean;
  model: string;
  output: any;
  input: any;
  metrics: any;
  error: boolean;
  running: boolean;
  expanded: boolean;
  rawResponse: string;
}

@Component({
  selector: 'app-ai-playground',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './ai-playground.component.html',
  styleUrls: ['./ai-playground.component.scss'],
})
export class AiPlaygroundComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  rawText = '';
  isRunning = false;
  errorMessage = '';
  parseResult: any = null;
  pipelineComplete = false;
  allOutputs: any = null;

  stages: PipelineStage[] = [];
  editingStage: PipelineStage | null = null;
  savedStages: any[] = [];
  showStageLibrary = false;
  showCreateStage = false;
  newStageDescription = '';
  newStageName = '';
  creatingStage = false;
  savedPipelines: any[] = [];
  showPipelineMenu = false;
  savePipelineName = '';
  savePipelineDesc = '';
  showSavePipeline = false;

  // Prompt templates
  promptTemplates = [
    { label: 'JSON Output Format', snippet: '\n\nReturn ONLY valid JSON:\n{\n  "field_name": "description"\n}' },
    { label: '508 Compliance Context', snippet: '\n\nYou are a Section 508 compliance expert analyzing federal solicitations for accessibility requirements under the Rehabilitation Act.' },
    { label: 'FAR Clause Detection', snippet: '\n\nIdentify all Federal Acquisition Regulation (FAR) clauses referenced in the document, particularly those related to Section 508, accessibility, and ICT procurement.' },
    { label: 'ICT Categories', snippet: '\n\nClassify into these ICT categories: software, hardware, cloud_services, web_applications, mobile_applications, electronic_documents, multimedia, telecommunications, kiosks_self_service, it_services.' },
    { label: 'Confidence Scoring', snippet: '\n\nInclude a confidence_score field (1-10) indicating how confident you are in your analysis, and an explanation field describing your reasoning.' },
    { label: 'Risk Assessment', snippet: '\n\nAssess the risk level (High/Medium/Low) based on the presence or absence of required accessibility language and the type of ICT being procured.' },
  ];

  ngOnInit() {
    this.loadDefaultPipeline();
    this.fetchSavedStages();
    this.fetchSavedPipelines();
  }

  loadDefaultPipeline() {
    this.stages = [
      {
        id: 'ml_prediction',
        name: 'ML Compliance Determination',
        type: 'ml_prediction',
        systemPrompt: '',
        userDescription: '', generatingPrompt: false,
        model: '',
        output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
      },
      {
        id: 'ict_classification',
        name: 'ICT Classification',
        type: 'llm',
        systemPrompt: `You are an ICT classification expert for federal procurement.\n\nRead the solicitation text and identify ALL types of ICT being procured.\n\nReturn ONLY valid JSON:\n{\n  "ict_types": {\n    "software": true/false,\n    "hardware": true/false,\n    "cloud_services": true/false,\n    "web_applications": true/false,\n    "mobile_applications": true/false,\n    "electronic_documents": true/false,\n    "multimedia": true/false,\n    "telecommunications": true/false,\n    "kiosks_self_service": true/false,\n    "it_services": true/false\n  },\n  "primary_ict_category": "the main ICT type",\n  "explanation": "2-3 sentences"\n}`,
        userDescription: 'Classify what types of ICT are being procured in this solicitation', generatingPrompt: false,
        model: 'claude_4_5_sonnet',
        output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
      },
      {
        id: 'applicability',
        name: '508 Applicability Assessment',
        type: 'llm',
        systemPrompt: `You are a Section 508 compliance expert.\n\nDetermine if Section 508 applies to this federal solicitation.\n\nReturn ONLY valid JSON:\n{\n  "is_508_applicable": true/false,\n  "confidence_score": 1-10,\n  "applicability_explanation": "2-3 sentences",\n  "has_explicit_508_mention": true/false\n}`,
        userDescription: 'Determine if Section 508 accessibility requirements apply to this solicitation', generatingPrompt: false,
        model: 'claude_4_5_sonnet',
        output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
      },
      {
        id: 'art_mapping',
        name: 'ART API Mapping',
        type: 'llm',
        systemPrompt: `Map the ICT classification into the ART API request format.\n\nThe ART API accepts:\n- "ict_type": ["it-prod", "it-serv"]\n- "hardware_group": { "hardware_items": ["computer", "tablet", "other"] }\n- "software_group": { "software_web": true, "cloud_services": ["saas"] }\n- "support": ["technical", "doc", "training"]\n- "solicitation_phase": "solicitation-development"\n\nReturn ONLY valid JSON matching the ART API format.`,
        userDescription: 'Map the ICT types to the ART API format for generating 508 requirement language', generatingPrompt: false,
        model: 'claude_3_5_haiku',
        output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
      },
      {
        id: 'synthesis',
        name: 'Report Synthesis',
        type: 'llm',
        systemPrompt: `Generate a comprehensive executive summary of this solicitation.\n\nReturn ONLY valid JSON:\n{\n  "executive_summary": "3-4 sentences",\n  "document_purpose": "what this is for",\n  "procurement_description": "what ICT is being procured",\n  "key_findings": ["finding 1", "finding 2"]\n}`,
        userDescription: 'Generate an executive summary with key findings about this solicitation', generatingPrompt: false,
        model: 'claude_4_5_sonnet',
        output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
      }
    ];
  }

  // Drag and drop
  drop(event: CdkDragDrop<PipelineStage[]>) {
    moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
  }

  // Stage management
  addStage() {
    const newStage: PipelineStage = {
      id: 'custom_' + Date.now(),
      name: 'New Stage',
      type: 'llm',
      systemPrompt: '',
      userDescription: '',
      generatingPrompt: false,
      model: 'claude_4_5_sonnet',
      output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
    };
    this.stages.push(newStage);
    this.editingStage = newStage;
  }

  generatePrompt(stage: PipelineStage) {
    if (!stage.userDescription?.trim()) return;
    stage.generatingPrompt = true;

    fetch(`${environment.SERVER_URL}/rag-analytics/playground/generate-prompt`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ description: stage.userDescription })
    })
    .then(res => res.json())
    .then(data => {
      stage.generatingPrompt = false;
      if (data.success && data.prompt) {
        stage.systemPrompt = data.prompt;
        if (stage.name === 'New Stage' || !stage.name) {
          stage.name = stage.userDescription.substring(0, 40) + (stage.userDescription.length > 40 ? '...' : '');
        }
      }
    })
    .catch(() => {
      stage.generatingPrompt = false;
    });
  }

  // Stage Library
  fetchSavedStages() {
    fetch(`${environment.SERVER_URL}/rag-analytics/stages`, { headers: authHeaders() })
      .then(res => res.json())
      .then(data => { this.savedStages = Array.isArray(data) ? data : []; })
      .catch(() => { this.savedStages = []; });
  }

  saveStageToLibrary(stage: PipelineStage) {
    fetch(`${environment.SERVER_URL}/rag-analytics/stages`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        stage_id: stage.id,
        name: stage.name,
        type: stage.type,
        system_prompt: stage.systemPrompt,
        user_description: stage.userDescription,
        model: stage.model,
        example_input: stage.input,
        example_output: stage.output
      })
    })
    .then(res => res.json())
    .then(() => this.fetchSavedStages())
    .catch(err => console.error('Failed to save stage:', err));
  }

  addSavedStage(saved: any) {
    const stage: PipelineStage = {
      id: saved.stage_id + '_' + Date.now(),
      name: saved.name,
      type: saved.type || 'llm',
      systemPrompt: saved.system_prompt || '',
      userDescription: saved.user_description || '',
      generatingPrompt: false,
      model: saved.model || 'claude_4_5_sonnet',
      output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
    };
    this.stages.push(stage);
    this.showStageLibrary = false;
  }

  deleteSavedStage(stageId: string) {
    fetch(`${environment.SERVER_URL}/rag-analytics/stages/${stageId}`, { method: 'DELETE', headers: authHeaders() })
      .then(() => this.fetchSavedStages())
      .catch(err => console.error('Failed to delete stage:', err));
  }

  createNewStage() {
    if (!this.newStageDescription?.trim()) return;
    this.creatingStage = true;

    // Generate prompt from description
    fetch(`${environment.SERVER_URL}/rag-analytics/playground/generate-prompt`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ description: this.newStageDescription })
    })
    .then(res => res.json())
    .then(promptData => {
      const systemPrompt = promptData.prompt || '';
      // Generate examples
      return fetch(`${environment.SERVER_URL}/rag-analytics/stages/generate-examples`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ system_prompt: systemPrompt, user_description: this.newStageDescription })
      })
      .then(res => res.json())
      .then(exampleData => {
        const stageId = 'custom_' + Date.now();
        const name = this.newStageName || this.newStageDescription.substring(0, 40);
        // Save to DB
        return fetch(`${environment.SERVER_URL}/rag-analytics/stages`, {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            stage_id: stageId,
            name,
            type: 'llm',
            system_prompt: systemPrompt,
            user_description: this.newStageDescription,
            model: 'claude_4_5_sonnet',
            example_input: exampleData.example_input || {},
            example_output: exampleData.example_output || {}
          })
        }).then(() => {
          this.fetchSavedStages();
          this.creatingStage = false;
          this.showCreateStage = false;
          this.newStageDescription = '';
          this.newStageName = '';
        });
      });
    })
    .catch(err => {
      console.error('Failed to create stage:', err);
      this.creatingStage = false;
    });
  }

  generateExamples(stage: PipelineStage) {
    fetch(`${environment.SERVER_URL}/rag-analytics/stages/generate-examples`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ system_prompt: stage.systemPrompt, user_description: stage.userDescription })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        stage.input = data.example_input;
        stage.output = data.example_output;
        stage.expanded = true;
      }
    })
    .catch(err => console.error('Failed to generate examples:', err));
  }

  // Pipeline Templates
  fetchSavedPipelines() {
    fetch(`${environment.SERVER_URL}/rag-analytics/pipelines`, { headers: authHeaders() })
      .then(res => res.json())
      .then(data => { this.savedPipelines = Array.isArray(data) ? data : []; })
      .catch(() => { this.savedPipelines = []; });
  }

  saveCurrentPipeline() {
    if (!this.savePipelineName?.trim()) return;
    const templateId = 'pipeline_' + Date.now();
    const stageDefs = this.stages.map(s => ({
      id: s.id, name: s.name, type: s.type, systemPrompt: s.systemPrompt,
      userDescription: s.userDescription, model: s.model
    }));

    fetch(`${environment.SERVER_URL}/rag-analytics/pipelines`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        template_id: templateId,
        name: this.savePipelineName,
        description: this.savePipelineDesc,
        stages: stageDefs
      })
    })
    .then(() => {
      this.fetchSavedPipelines();
      this.showSavePipeline = false;
      this.savePipelineName = '';
      this.savePipelineDesc = '';
    })
    .catch(err => console.error('Failed to save pipeline:', err));
  }

  loadPipeline(pipeline: any) {
    const stages = typeof pipeline.stages === 'string' ? JSON.parse(pipeline.stages) : pipeline.stages;
    this.stages = stages.map((s: any) => ({
      ...s,
      userDescription: s.userDescription || '',
      generatingPrompt: false,
      output: null, input: null, metrics: null, error: false, running: false, expanded: false, rawResponse: ''
    }));
    this.showPipelineMenu = false;
    this.resetPipeline();
  }

  deleteSavedPipeline(templateId: string) {
    fetch(`${environment.SERVER_URL}/rag-analytics/pipelines/${templateId}`, { method: 'DELETE', headers: authHeaders() })
      .then(() => this.fetchSavedPipelines())
      .catch(err => console.error('Failed to delete pipeline:', err));
  }

  // Prompt Templates
  insertTemplate(stage: PipelineStage, snippet: string) {
    stage.systemPrompt = (stage.systemPrompt || '') + snippet;
  }

  runSingleStage(stage: PipelineStage) {
    stage.running = true;
    stage.output = null;
    stage.input = null;
    stage.error = false;
    stage.rawResponse = '';

    // Build context from previous stages that have output
    const context: any = {};
    for (const s of this.stages) {
      if (s.id === stage.id) break;
      if (s.output && !s.error) context[s.id] = s.output;
    }

    const documentText = this.rawText || this.parseResult?.preview || '';

    fetch(`${environment.SERVER_URL}/rag-analytics/playground/execute-stage`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        type: stage.type,
        systemPrompt: stage.systemPrompt,
        model: stage.model,
        context,
        documentText
      })
    })
    .then(res => res.json())
    .then(data => {
      stage.running = false;
      stage.expanded = true;
      if (data.success) {
        stage.input = data.input;
        stage.output = data.output;
        stage.rawResponse = data.rawResponse || '';
        stage.metrics = data.metrics || null;
      } else {
        stage.error = true;
        stage.output = { error: data.error };
      }
    })
    .catch(err => {
      stage.running = false;
      stage.error = true;
      stage.output = { error: err.message };
    });
  }

  removeStage(index: number) {
    this.stages.splice(index, 1);
    if (this.editingStage && !this.stages.includes(this.editingStage)) {
      this.editingStage = null;
    }
  }

  editStage(stage: PipelineStage) {
    this.editingStage = this.editingStage === stage ? null : stage;
  }

  toggleExpand(stage: PipelineStage) {
    stage.expanded = !stage.expanded;
  }

  // File handling
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.rawText = '';
    }
  }

  removeFile() {
    this.selectedFile = null;
    if (this.fileInput?.nativeElement) this.fileInput.nativeElement.value = '';
  }

  // Pipeline execution
  runPipeline() {
    this.errorMessage = '';
    this.isRunning = true;
    this.pipelineComplete = false;
    this.parseResult = null;
    this.allOutputs = null;
    this.stages.forEach(s => { s.output = null; s.error = false; s.running = false; s.rawResponse = ''; });

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else if (this.rawText?.length >= 10) {
      formData.append('text', this.rawText);
    } else {
      this.errorMessage = 'Provide a file or at least 10 characters of text.';
      this.isRunning = false;
      return;
    }

    // Send stage definitions
    const stageDefs = this.stages.map(s => ({
      id: s.id, name: s.name, type: s.type, systemPrompt: s.systemPrompt, model: s.model
    }));
    formData.append('stages', JSON.stringify(stageDefs));

    const apiUrl = `${environment.SERVER_URL}/rag-analytics/playground/execute-pipeline`;

    fetch(apiUrl, { method: 'POST', headers: authHeaders(), body: formData })
      .then(response => {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const processStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              this.isRunning = false;
              this.pipelineComplete = true;
              return;
            }

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split('\n\n');
            buffer = events.pop() || '';

            for (const block of events) {
              if (!block.trim()) continue;
              let eventName = 'message';
              let dataStr = '';
              for (const line of block.split('\n')) {
                if (line.startsWith('event: ')) eventName = line.substring(7).trim();
                else if (line.startsWith('data: ')) dataStr += line.substring(6);
              }
              if (!dataStr) continue;
              try {
                const data = JSON.parse(dataStr);
                this.handleEvent(eventName, data);
              } catch (e) {}
            }

            processStream();
          }).catch(err => {
            this.errorMessage = err.message;
            this.isRunning = false;
          });
        };
        processStream();
      })
      .catch(err => {
        this.errorMessage = err.message;
        this.isRunning = false;
      });
  }

  private handleEvent(eventName: string, data: any) {
    if (eventName === 'stage_start') {
      const stage = this.stages.find(s => s.id === data.stageId);
      if (stage) stage.running = true;
    } else if (eventName === 'stage_result') {
      if (data.stageId === '_parse') {
        this.parseResult = data.output;
        return;
      }
      const stage = this.stages.find(s => s.id === data.stageId);
      if (stage) {
        stage.running = false;
        stage.output = data.output;
        stage.error = !!data.error;
        stage.rawResponse = data.output?._raw || '';
        stage.expanded = true;
      }
    } else if (eventName === 'complete') {
      this.allOutputs = data.outputs;
      this.pipelineComplete = true;
      this.isRunning = false;
    } else if (eventName === 'error') {
      this.errorMessage = data.error;
      this.isRunning = false;
    }
  }

  getOutputKeys(output: any): string[] {
    if (!output) return [];
    return Object.keys(output).filter(k => k !== '_raw' && k !== '_raw_response');
  }

  formatValue(val: any): string {
    if (val === null || val === undefined) return '—';
    if (typeof val === 'object') return JSON.stringify(val, null, 2);
    return String(val);
  }

  resetPipeline() {
    this.stages.forEach(s => { s.output = null; s.input = null; s.metrics = null; s.error = false; s.running = false; s.rawResponse = ''; s.expanded = false; });
    this.parseResult = null;
    this.pipelineComplete = false;
    this.allOutputs = null;
    this.errorMessage = '';
  }
}
