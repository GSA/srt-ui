import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import * as moment from 'moment';
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
  styleUrls: ['./results-detail.component.scss']
})
export class ResultsDetailComponent implements OnInit {
  public lockDocs: number[];
  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: string;
  type: string = 'report';
  public step1: boolean = false;
  public step2: boolean = false;
  public step3: boolean = false;
  feature_flags = environment.feature_flags;

  private readonly STEP_ACTIONS = {
    REVIEW: 'reviewed solicitation action requested summary',
    EMAIL: 'sent email to POC',
    FEEDBACK: 'provided feedback on the solicitation prediction result'
  };

  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private route: ActivatedRoute,
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
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state?.['solicitation']) {
        const data = navigation.extras.state['solicitation'];
        this.processSolicitationData(data);
      } else {
        this.loadSolicitationData();
      }
    } catch (error) {
      console.error('Error initializing component:', error);
      // Handle error appropriately - could add error state to component
    }
  }

  private loadSolicitationData(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.solicitationID = params['id'];
      this.solicitationService.getSolicitation(this.solicitationID).subscribe({
        next: data => this.processSolicitationData(data),
        error: err => console.error('Error fetching solicitation:', err)
      });
    });
  }

  private processSolicitationData(data: any): void {
    try {
      this.processParseStatus(data);
      this.processSteps(data);
      this.setSolicitationData(data);
      this.processDocuments();
    } catch (error) {
      console.error('Error processing solicitation data:', error);
      // Handle error appropriately
    }
  }

  private processParseStatus(data: any): void {
    if (data.parseStatus && Array.isArray(data.parseStatus)) {
      data.parseStatus.forEach(element => {
        element.status = this.mapStatus(element.status);
        element.formattedDate = moment(element.postedDate).format('L');
      });
    } else {
      console.error('Error processing parse status for solicitation ' + data.solNum);
      data.parseStatus = this.getDefaultParseStatus();
    }
  }

  private mapStatus(status: string): string {
    return status === 'successfully parsed' ? 'Yes' :
           status === 'processing error' ? 'No' :
           status;
  }

  private getDefaultParseStatus(): ParseStatus {
    return {
      formattedDate: '',
      postedDate: null,
      name: '',
      status: '',
      attachment_url: ''
    };
  }

  private processSteps(data: any): void {
    this.step1 = this.checkStepCompletion(data.history, this.STEP_ACTIONS.REVIEW);
    this.step2 = this.checkStepCompletion(data.history, this.STEP_ACTIONS.EMAIL);
    this.step3 = this.checkStepCompletion(data.history, this.STEP_ACTIONS.FEEDBACK);
  }

  private checkStepCompletion(history: any[], actionText: string): boolean {
    return history?.filter(e => e['action'].indexOf(actionText) > -1).length > 0;
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
    this.solicitationService.update(this.solicitation)
      .subscribe({
        next: () => {},
        error: (err) => console.error('Error updating solicitation:', err)
      });

    this.gaService.event('not_applicable', 'make_srt_better', 'Not Applicable');
  }

  onClickTabs(action: string, label: string): void {
    this.gaService.event(action, "solicitation_tab", label);
  }
}