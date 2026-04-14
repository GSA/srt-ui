import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitationService } from '../../solicitation.service';

@Component({
    selector: 'app-rag-analysis',
    templateUrl: './rag-analysis.component.html',
    styleUrls: ['./rag-analysis.component.scss'],
    standalone: false
})
export class RagAnalysisComponent implements OnInit {

    solNum: string = '';
    activeTab: string = 'overview';
    loading: boolean = true;
    error: string = '';

    // Data from API
    solicitation: any = null;
    documents: any[] = [];
    matches: any[] = [];
    bestDocument: any = null;

    // Computed values
    confidenceScore: number = 0;
    confidenceLevel: string = 'low';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private solicitationService: SolicitationService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.solNum = params.get('solNum') || '';
            if (this.solNum) {
                this.loadData();
            }
        });
    }

    loadData(): void {
        this.loading = true;
        this.error = '';

        // Load solicitation detail
        this.solicitationService.getRagAnalysis(this.solNum).subscribe({
            next: (data: any) => {
                this.solicitation = data;
                this.confidenceScore = data.average_quality_score
                    ? Math.round(parseFloat(data.average_quality_score) * 10)
                    : 0;
                if (this.confidenceScore >= 7) this.confidenceLevel = 'high';
                else if (this.confidenceScore >= 4) this.confidenceLevel = 'medium';
                else this.confidenceLevel = 'low';
                this.loading = false;
            },
            error: (err: any) => {
                this.error = 'Failed to load solicitation analysis.';
                this.loading = false;
                console.error(err);
            }
        });

        // Load documents
        this.solicitationService.getRagDocuments(this.solNum).subscribe({
            next: (data: any) => {
                this.documents = data.documents || [];
                // Pick the first compliant document, or fall back to first doc
                this.bestDocument = this.documents.find((d: any) => d.is_compliant) || this.documents[0] || null;
            },
            error: (err: any) => console.error('Failed to load documents:', err)
        });

        // Load matches
        this.solicitationService.getRagMatches(this.solNum).subscribe({
            next: (data: any) => {
                this.matches = data.matches || [];
            },
            error: (err: any) => console.error('Failed to load matches:', err)
        });
    }

    setTab(tab: string): void {
        this.activeTab = tab;
    }

    getFileExtension(filename: string): string {
        if (!filename) return 'FILE';
        const ext = filename.split('.').pop()?.toUpperCase() || 'FILE';
        if (ext === 'DOCX') return 'DOC';
        if (ext === 'XLSX') return 'XLS';
        return ext;
    }

    getFileIconColor(filename: string): string {
        const ext = this.getFileExtension(filename);
        switch (ext) {
            case 'PDF': return '#005ea2';
            case 'DOC': return '#b52d2d';
            case 'XLS': return '#00a91c';
            case 'TXT': return '#71767a';
            default: return '#005ea2';
        }
    }

    formatDate(dateStr: string): string {
        if (!dateStr) return 'N/A';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }

    formatDateLong(dateStr: string): string {
        if (!dateStr) return 'N/A';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    /**
     * Convert markdown text to HTML for rich display
     */
    renderMarkdown(text: string): string {
        if (!text) return '';
        let html = text
            // Escape HTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Headers
            .replace(/^### (.+)$/gm, '<h4 class="md-h4">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 class="md-h3">$1</h3>')
            .replace(/^# (.+)$/gm, '<h2 class="md-h2">$1</h2>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Bullet lists: - item
            .replace(/^- (.+)$/gm, '<li class="md-li">$1</li>')
            // Numbered lists: 1. item
            .replace(/^\d+\.\s+(.+)$/gm, '<li class="md-li-num">$1</li>')
            // Wrap consecutive <li> in <ul>
            .replace(/((?:<li class="md-li">.+<\/li>\n?)+)/g, '<ul class="md-ul">$1</ul>')
            .replace(/((?:<li class="md-li-num">.+<\/li>\n?)+)/g, '<ol class="md-ol">$1</ol>')
            // Paragraphs (double newline)
            .replace(/\n\n/g, '</p><p class="md-p">')
            // Single newlines to <br>
            .replace(/\n/g, '<br>');

        return '<p class="md-p">' + html + '</p>';
    }

    getSimilarityPercent(score: string | number): string {
        const n = typeof score === 'string' ? parseFloat(score) : score;
        return (n * 100).toFixed(1) + '%';
    }

    copyClause(): void {
        const clause = `SECTION 508 ACCESSIBILITY COMPLIANCE REQUIREMENTS 52.239-40 ACCESSIBILITY OF ELECTRONIC AND INFORMATION TECHNOLOGY (JUN 2001) (a) The contractor shall ensure that all Electronic and Information Technology (EIT) supplies and services provided under this contract comply with the accessibility standards set forth in 36 CFR Part 1194, Section 508 of the Rehabilitation Act of 1973 (29 U.S.C. 794d), as amended. (b) ICT Products and Services: All Information and Communication Technology (ICT) products, including but not limited to medical imaging equipment, software interfaces, digital displays, control systems, and associated hardware, must conform to the Revised Section 508 Standards (36 CFR Part 1194) and Web Content Accessibility Guidelines (WCAG) 2.0 Level AA success criteria. (c) Voluntary Product Accessibility Template (VPAT): The contractor shall provide a completed VPAT 2.4 (or most current version) for each ICT product or service delivered under this contract. The VPAT must detail conformance to applicable Section 508 standards and identify any non-conformant features with planned remediation timelines. (d) Accessibility Testing: All ICT deliverables must undergo accessibility testing using both automated tools and manual evaluation methods. Testing results and remediation plans for any identified issues must be provided prior to final acceptance. (e) Support Documentation and Services: All user manuals, training materials, help documentation, and customer support services must be provided in accessible formats. (f) Interface Accessibility: Digital interfaces, control panels, and software applications must provide: Keyboard navigation alternatives to mouse-only functions, Sufficient color contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text), Compatibility with assistive technologies including screen readers, Adjustable font sizes and display options where technically feasible. (g) Remediation Requirements: The contractor must remediate any accessibility issues identified during testing or use at no additional cost to the Government within 30 days of notification. (h) Compliance Verification: The Government reserves the right to conduct independent accessibility testing and evaluation of all ICT deliverables to verify Section 508 compliance.`;
        navigator.clipboard.writeText(clause).then(() => {
            alert('Compliance clause copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = clause;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Compliance clause copied to clipboard!');
        });
    }

    goBack(): void {
        this.router.navigate(['/solicitation/report']);
    }
}

