import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import * as moment from 'moment';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.css']
})



export class ResultsDetailComponent implements OnInit {

  /* ATTRIBUTES */

  public lockDocs;

  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: String;
  type: String = 'report';
  public step1: Boolean = false;
  public step2: Boolean = false;
  public step3: Boolean = false;
  feature_flags = environment.feature_flags;


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
  ) {
    this.solicitation = new Solicitation(null, null, null, null, null, null,
      {value: ''}, null, null, null, null, null, null,
      [{ name: '', status: '', attachment_url: '', formattedDate: '', postedDate: new Date() }],
      [''], null, null, {psc: '', naics: '', naics_match: false, epa_psc_match: false},
      null, null, null, null, true);
    this.solicitation.na_flag = false;
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.solicitationID = params['id'];
        // console.log(this.solicitationID);
        this.solicitationService.getSolicitation(this.solicitationID).subscribe(
          data => {
            if (data.parseStatus && Array.isArray(data.parseStatus)) {
              data.parseStatus.forEach(element => {
                if (element.status === 'successfully parsed') {
                  element.status = 'Yes';
                } else if (element.status === 'processing error') {
                  element.status = 'No';
                }
                element.formattedDate = moment(element.postedDate).format('L');
              });
            } else {
              console.log ('Error processing parse status for solicitaiton ' + data.solNum);
              data.parseStatus = [{formattedDate: '', postedDate: null, name: '', status: '', attachment_url: ''}];
            }

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

            const totalDoc = Number(this.solicitation.numDocs);

            if (!isNaN(totalDoc)) {
              // doesn't have lock files
              if (totalDoc === this.solicitation.parseStatus.length) {
              } else {
                const lock = totalDoc - this.solicitation.parseStatus.length;
                this.lockDocs = [];
                for (let i = 1; i <= lock; i++) {
                  this.lockDocs.push(i);
                }
              }
            }

          },
          err => console.log(err)
        );
      });
  }

  onNotApplicableClick(event) {
    this.solicitation.na_flag = event.target.checked;
    this.solicitationService.update(this.solicitation)
      .subscribe( (data) => {});

  }
}
