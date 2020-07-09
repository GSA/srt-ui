import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

// Service
import { SolicitationService } from '../../solicitation.service';

// Class
import { Solicitation } from '../../../shared/solicitation';


@Component({
  selector: 'app-prediction-history',
  templateUrl: './prediction-history.component.html',
  styleUrls: ['./prediction-history.component.css']
})
export class PredictionHistoryComponent implements OnInit {

  @Input() predictionHistory;

  solicitation: Solicitation;
  solicitationID: String;
  type: String = 'prediction';
  public step1: Boolean = false;
  public step2: Boolean = false;
  public step3: Boolean = false;


  subscription: Subscription;


  /**
   * constructor
   * @param solicitationService
   * @param route
   */
  constructor(
    private solicitationService: SolicitationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
        this.solicitationID = params['id'];
        this.solicitationService.getSolicitation(this.solicitationID).subscribe(
          data => {
            this.predictionHistory = data.predictions.history;
            for (const entry of this.predictionHistory.reverse()) {
              entry.date = moment(entry.date).format('MM/DD/YYYY');
            }
          });
      });
  }

}
