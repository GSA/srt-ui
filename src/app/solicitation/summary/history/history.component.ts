import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: false
})
export class HistoryComponent implements OnInit {
  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: string;
  type: string = 'history';
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  history: any[] = [];
  predictionHistory: any[] = [];

  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.solicitationID = params['id'];
      this.solicitationService.getSolicitation(this.solicitationID).subscribe({
        next: data => {
          this.processParseStatus(data);
          this.processStepStatus(data);
          this.processHistory(data);
          this.processPredictionHistory(data);
          this.solicitation = data;
        },
        error: err => console.log(err)
      });
    });
  }

  private processParseStatus(data: any) {
    data.parseStatus.forEach(element => {
      element.status = element.status === 'successfully parsed' ? 'Yes' :
        element.status === 'processing error' ? 'No' :
          element.status;
    });
  }

  private processStepStatus(data: any) {
    this.step1 = data.history.some(e => e.action.includes('reviewed solicitation action requested summary'));
    this.step2 = data.history.some(e => e.action.includes('sent email to POC'));
    this.step3 = data.history.some(e => e.action.includes('provided feedback on the solicitation prediction result'));
  }

  private processHistory(data: any) {
    this.history = data.history.sort((a, b) => {
      const dateA = new Date(String(a.date));
      const dateB = new Date(String(b.date));
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    });
  }

  private processPredictionHistory(data: any) {
    this.predictionHistory = data.predictions.history
      .map(entry => ({
        ...entry,
        date: moment(entry.date).format('MM/DD/YYYY')
      }))
      .reverse();
  }
}