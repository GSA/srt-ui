import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AgentPrompt {
  role: string;
  name: string;
  model: string;
  systemPrompt: string;
}

@Component({
  selector: 'app-ai-pipeline',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-pipeline.component.html',
  styleUrls: ['./ai-pipeline.component.scss'],
})
export class AiPipelineComponent implements OnInit {

  public pipelineStages = [
    { name: 'Phase 1: NAICS Filtering', description: 'Queries SAM.gov every 24hrs for ICT-related NAICS codes. Ignores PSCs.', icon: 'filter', status: 'active' },
    { name: 'Stage 0: Text Extraction', description: 'Extracts raw text from PDF, DOCX, XLSX, TXT (No AI).', icon: 'file-text', status: 'active' },
    { name: 'Stage 1: Pre-Processing', description: 'Automated checks for COTS, website sources, and false positive keyword filtering.', icon: 'cogs', status: 'active' },
    { name: 'Stage 2: 508 Applicability', description: 'LLM assesses if Section 508 applies based on critical inclusion/exclusion rules.', icon: 'balance-scale', status: 'active' },
    { name: 'Stage 3: ICT Classification', description: 'LLM identifies the specific types of ICT being procured (Hardware, Software, Web, etc.).', icon: 'tags', status: 'active' },
    { name: 'Stage 4: Vector Matching', description: 'FAISS semantic search + LLM Match Validation for meaningful 508 references.', icon: 'search', status: 'active' },
    { name: 'Stage 5: Document Summary', description: 'LLM generates a factual summary of what ICT is being procured and notable regulations.', icon: 'file-alt', status: 'active' },
    { name: 'Stage 6: ML Prediction', description: 'Legacy Scikit-Learn binary model determines final compliance override.', icon: 'robot', status: 'active' }
  ];

  public prompts: AgentPrompt[] = [
    {
      role: 'Stage 2: Applicability',
      name: '508 Applicability Assessment',
      model: 'LLM',
      systemPrompt: `You are a Section 508 compliance expert. Analyze the document text and determine 
if Section 508 of the Rehabilitation Act applies to this federal solicitation.

CRITICAL EXCLUSION RULES — Section 508 does NOT apply to:
- Construction, demolition, dredging, excavation, or landscaping projects
- Passive mechanical components (bearings, seals, valves, gaskets, hose clamps)
- Analog instruments without digital displays (mechanical gauges, pointer meters)
- Bulk commodities: clothing, boots, food, medical supplies, chemicals
- Physical repair/maintenance of structures (roofing, plumbing, HVAC ducting)
- Ammunition, missiles, or munitions components without user interfaces

CRITICAL INCLUSION RULES — Section 508 DOES apply to:
- Any procurement involving software, web applications, or cloud services
- Hardware with user-facing digital displays or touchscreens
- IT services, help desk, managed services, system integration
- Telecommunications and network equipment
- Any product requiring a VPAT or Accessibility Conformance Report (ACR)

Return ONLY valid JSON with these fields:
{
  "is_508_applicable": true/false,
  "confidence_score": 1-10,
  "key_eit_indicators": ["specific technology keywords found"],
  "applicability_explanation": "2-3 sentences explaining decision",
  "accessibility_considerations": "specific accessibility features needed or None",
  "is_physical_only": true/false,
  "has_explicit_508_mention": true/false,
  "is_cots_product": true/false,
  "ict_complexity": "Simple/Medium/Complex"
}`
    },
    {
      role: 'Stage 3: ICT Classification',
      name: 'ICT Type Classification',
      model: 'LLM',
      systemPrompt: `You are an ICT classification expert for federal procurement. Analyze this solicitation document 
and identify what types of Information and Communication Technology are BEING PROCURED (bought/contracted for).

Only mark a type as true if the solicitation is actually acquiring that type of ICT. 
Do NOT mark true just because the document mentions a website URL, uses email, or references 
technology in passing. The question is: what ICT is the government buying?

For example:
- A solicitation to buy laptops → Hardware=true
- A solicitation for a web application → Web=true, Software=true  
- A solicitation that mentions "submit via email" → Telecommunications=false (email is just the submission method, not what's being procured)
- A solicitation for an MRI machine with software → Hardware=true, Software=true, Medical_Devices=true

Return ONLY valid JSON:
{
  "ict_types": {
    "Web": true/false,
    "Software": true/false,
    "Hardware": true/false,
    "Electronic_Content": true/false,
    "Telecommunications": true/false,
    "Multimedia": true/false,
    "Medical_Devices": true/false
  },
  "hardware_component": "Yes"/"No",
  "software_component": "Yes"/"No",
  "explanation": "brief explanation of what ICT is being procured"
}`
    },
    {
      role: 'Stage 4: Match Validation',
      name: 'Vector Similarity Match Analysis',
      model: 'LLM',
      systemPrompt: `You are a Section 508 expert. For each match between solicitation text and a 508 standard, 
determine if the solicitation text is a MEANINGFUL reference to Section 508 accessibility.

A match IS meaningful if the solicitation text:
- Explicitly mentions "Section 508", "Rehabilitation Act" in the context of ICT accessibility
- References VPAT, ACR, WCAG, or accessibility conformance requirements
- Contains FAR clauses specifically about ICT accessibility (e.g., 52.239-70, HHSAR 352.239-73/74)
- Requires the vendor to make products/services accessible to people with disabilities

A match is NOT meaningful if the solicitation text:
- References "Equal Opportunity for Workers with Disabilities" (FAR 52.222-36) — this is about hiring, not product accessibility
- Contains generic FAR boilerplate about telecommunications equipment prohibitions (Kaspersky, Huawei bans)
- Just happens to use similar regulatory language but has nothing to do with accessibility
- References the Rehabilitation Act only in the context of employment discrimination (Section 503), not ICT accessibility (Section 508)

Return ONLY valid JSON:
{
  "matches": [
    {"match_number": 1, "is_meaningful": true/false, "reason": "brief reason"},
    ...
  ],
  "overall_includes_508": true/false,
  "summary": "1-2 sentence factual summary"
}`
    },
    {
      role: 'Stage 5: Summary',
      name: 'Document Summary Generator',
      model: 'LLM',
      systemPrompt: `You are summarizing a single solicitation document.

Your job is to provide a factual summary of what this document is about and what ICT 
(Information and Communication Technology) is being procured.

Describe:
1. What the solicitation/document is for (the purpose, scope, what's being bought)
2. What types of ICT are involved (software, hardware, services, etc.)
3. Whether Section 508 accessibility standards are mentioned or referenced
4. Any notable regulatory references found in the document

Do NOT make compliance determinations. Do NOT recommend actions. 
Just describe what's in the document factually.

Return ONLY valid JSON:
{
  "document_summary": "2-3 sentence summary of what this document is about",
  "procurement_description": "what ICT is being procured",
  "section_508_references": ["list of specific 508/accessibility references found, if any"],
  "regulatory_references": ["other notable regulatory references"],
  "key_findings": ["factual finding 1", ...],
  "document_type": "RFQ/RFP/SOW/Amendment/Other"
}`
    }
  ];

  public selectedPrompt: AgentPrompt | null = null;
  public playgroundText: string = '';
  public playgroundRunning: boolean = false;
  public playgroundResults: any = null;
  public playgroundError: string = '';

  constructor() {}

  ngOnInit() {
    this.selectedPrompt = this.prompts[0];
  }

  selectPrompt(prompt: AgentPrompt) {
    this.selectedPrompt = prompt;
  }

  runPlayground() {
    if (!this.playgroundText || this.playgroundText.length < 10) {
      this.playgroundError = 'Please enter at least 10 characters.';
      return;
    }
    this.playgroundRunning = true;
    this.playgroundError = '';
    this.playgroundResults = null;

    fetch('/api/rag-analytics/playground/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.playgroundText })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw err; }).catch(err => {
          throw new Error(err.error || 'Failed to run analysis.');
        });
      }
      return response.json();
    })
    .then(data => {
      this.playgroundResults = data;
      this.playgroundRunning = false;
    })
    .catch(error => {
      this.playgroundError = error.message || 'Failed to run analysis.';
      this.playgroundRunning = false;
    });
  }
}
