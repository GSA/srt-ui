import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import moment from 'moment';
import { environment } from 'environments/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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

        // If non-compliant, fetch ART requirements
        if (this.solicitation?.reviewRec !== 'Compliant') {
          this.loadArtRequirements();
        }
      },
      error: () => { /* RAG data not available for this solicitation — that's fine */ }
    });

    // Fetch RAG documents
    this.http.get<any>(`${baseUrl}/rag/solicitation/${solNum}/documents`).subscribe({
      next: (data) => { this.ragDocuments = data.documents || []; },
      error: () => {}
    });

    // Fetch RAG vector matches
    this.http.get<any>(`${baseUrl}/rag/solicitation/${solNum}/matches`).subscribe({
      next: (data) => { this.ragMatches = data.matches || []; },
      error: () => {}
    });
  }

  private loadArtRequirements(): void {
    const ictTypes = this.getActiveIctTypes();
    if (ictTypes.length === 0) return;

    this.artLoading = true;
    const baseUrl = environment.SERVER_URL;

    this.http.post<any>(`${baseUrl}/rag-analytics/art-lookup`, { ict_types: ictTypes }).subscribe({
      next: (data) => {
        this.artRequirements = data;
        this.artLoading = false;
      },
      error: (err) => {
        this.artError = 'Unable to load ART requirements.';
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

  onNotApplicableClick(event: any): void {
    this.solicitation.na_flag = event.target.checked;
    this.solicitationService.update(this.solicitation).subscribe({
      next: () => {},
      error: (err) => console.error('[onNotApplicableClick] Error:', err)
    });
    this.gaService.event('not_applicable', 'make_srt_better', 'Not Applicable');
  }

  onClickTabs(action: string, label: string): void {
    this.gaService.event(action, "solicitation_tab", label);
  }
}
