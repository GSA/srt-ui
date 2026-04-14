import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { SolicitationService } from '../solicitation.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() solicitationID: string;
  @Input() step1: boolean;
  @Input() step2: boolean;
  @Input() step3: boolean;
  @Input() type: 'report' | 'email' | 'feedback' | 'prediction' | 'history';

  predictionHistory: { date: string; value: string }[] = [];
  history: { date: string; user: string; action: string }[] = [];

  constructor(
    private solicitationService: SolicitationService,
    private route: ActivatedRoute,
    private router: Router,
    private $gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    // Initialize any necessary data
    if (this.solicitationID) {
      this.loadHistoryData();
    }
  }

  ngOnChanges() {
    if (this.solicitationID) {
      this.loadHistoryData();
    }
  }

  private loadHistoryData() {
    // Here you would typically load the history data from your service
    // This is just a placeholder - implement actual service calls as needed
    /*
    this.solicitationService.getPredictionHistory(this.solicitationID).subscribe(
      data => this.predictionHistory = data
    );

    this.solicitationService.getActionHistory(this.solicitationID).subscribe(
      data => this.history = data
    );
    */
  }

  showActivitySelection(): boolean {
    return !!this.solicitationID;
  }

  onClickTabs(action: string, label: string): void {
    this.$gaService.event(action, "solicitation_tab", label);
  }
}