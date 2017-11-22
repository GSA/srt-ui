import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.css']
})



export class ResultsDetailComponent implements OnInit {

  /* ATTRIBUTES */

  private emailType:string = '1';
  public lockDocs;

  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: String;
  type: String = 'report';
  public step1:Boolean = false;
  public step2:Boolean = false;
  public step3:Boolean = false;


  /* CONSTRUCTORS */

  /**
   * constructor
   * @param solicitationService
   * @param router
   * @param route
   */
  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        var now = new Date().toLocaleDateString();
        this.solicitationID = params['id'];
        console.log(this.solicitationID);
        this.solicitationService.getSolicitation(this.solicitationID).subscribe(
          data => {
            console.log(data)
            data.parseStatus.forEach(element => {
                if (element.status === 'successfully parsed') {
                  element.status = 'Yes';
                } else if (element.status === 'processing error') {
                  element.status = 'No';
                }
            });

            this.step1 = data.history.filter( function(e) {
              return e['action'].indexOf('reviewed solicitation action requested summary') > -1;
            }).length > 0;
            this.step2 = data.history.filter( function(e) {
              return e['action'].indexOf('sent email to POC') > -1;
            }).length > 0;
            this.step3 = data.history.filter( function(e) {
              return e['action'].indexOf('provided feedback on the solicitation prediction result') > -1;
            }).length > 0;

            this.solicitation = data;
            var totalDoc = Number(this.solicitation.numDocs);

            if (!isNaN(totalDoc)) {
              // doesn't have lock files
              if (totalDoc == this.solicitation.parseStatus.length) {
              } else {
                var lock = totalDoc - this.solicitation.parseStatus.length;
                this.lockDocs = [];
                for(var i = 1; i <= lock; i++){
                  this.lockDocs.push(i);
                }
              }
            }

          },
          err => console.log(err)
        )
      })
  }

}
