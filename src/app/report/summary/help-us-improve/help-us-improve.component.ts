import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';

@Component({
  selector: 'app-help-us-improve',
  templateUrl: './help-us-improve.component.html',
  styleUrls: ['./help-us-improve.component.css']
})
export class HelpUsImproveComponent implements OnInit {

  constructor(private solicitationService: SolicitationService,
              private route: ActivatedRoute) { }

  private solicitationIndex: String;
  private subscription: Subscription;
  solicitation: Solicitation;
  
  public ICT:boolean;
  public Prediction:boolean;

  public q1:boolean;
  public q2:boolean;
  public q3:boolean;
  public q4:boolean;
  public q5:boolean;
  public q6:boolean;
  public q7:boolean;
  public q8:number;

  ngOnInit() {
    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.solicitationIndex = params['id'];        
        // pull chosen solicitation from mongo
        this.solicitationService.getSolicitation(this.solicitationIndex)
          .subscribe(
            solicitation => {   
              debugger           
              this.solicitation = solicitation;   
            },
            err => {
              console.log(err);
            });
        });
  }

  RadioICT (selected) { this.ICT = selected;}
  RadioPrediction (selected) { this.Prediction = selected;}

  Radioq1 (selected) { this.q1 = selected;}
  Radioq2 (selected) { this.q2 = selected;}
  Radioq3 (selected) { this.q3 = selected;}
  Radioq4 (selected) { this.q4 = selected;}
  Radioq5 (selected) { this.q5 = selected;}
  Radioq6 (selected) { this.q6 = selected;}
  Radioq7 (selected) { this.q7 = selected;}
  Radioq8 (selected) { this.q8 = selected;}

  feedback(){
    
      var now = new Date().toLocaleDateString();
      var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
      var r = this.solicitation.history.push({'date': now, 'action': "provided feedback on the solicitation prediction result", 'user': user , 'status' : ''});

      this.solicitationService.updateHistory(this.solicitation)
      .subscribe(
        msg => {
          console.log(msg);
        },
        err => {
          console.log(err);
        });
  }

}
