import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

//Service
import { SolicitationService } from '../../solicitation.service';

//Class
import { Solicitation } from '../../../shared/solicitation';


@Component({
  selector: 'app-prediction-history',
  templateUrl: './prediction-history.component.html',
  styleUrls: ['./prediction-history.component.css']
})
export class PredictionHistoryComponent implements OnInit {
  
  solicitation: Solicitation;
  solicitationID: String;
  type: String = 'prediction';
  public step1:Boolean = false;
  public step2:Boolean = false;
  public step3:Boolean = false;


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
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.solicitationID = params['id'];
      });

  }

}
