import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import * as moment from 'moment';
import {environment} from 'environments/environment';

import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.scss']
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
    private route: ActivatedRoute,
    private $gaService: GoogleAnalyticsService
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
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['solicitation']) {
      const data = navigation.extras.state['solicitation'];
      
      if (data.parseStatus && Array.isArray(data.parseStatus)) {
        data.parseStatus.forEach(element => {
          element.status = element.status === 'successfully parsed' ? 'Yes' : 
                          element.status === 'processing error' ? 'No' : 
                          element.status;
          element.formattedDate = moment(element.postedDate).format('L');
        });
      } else {
        console.log('Error processing parse status for solicitation ' + data.solNum);
        data.parseStatus = [{
          formattedDate: '', 
          postedDate: null, 
          name: '', 
          status: '', 
          attachment_url: ''
        }];
      }
   
      this.step1 = data.history?.filter(e => 
        e['action'].indexOf('reviewed solicitation action requested summary') > -1
      ).length > 0;
   
      this.step2 = data.history?.filter(e =>
        e['action'].indexOf('sent email to POC') > -1
      ).length > 0;
   
      this.step3 = data.history?.filter(e =>
        e['action'].indexOf('provided feedback on the solicitation prediction result') > -1
      ).length > 0;
   
      this.solicitation = data;
      this.solicitationID = data.id;
   
      const totalDoc = Number(this.solicitation.numDocs);
      if (!isNaN(totalDoc)) {
        if (totalDoc !== this.solicitation.parseStatus.length) {
          const lock = totalDoc - this.solicitation.parseStatus.length;
          this.lockDocs = Array(lock).fill(0).map((_, i) => i + 1);
        }
      }
   
    } else {
      this.subscription = this.route.params.subscribe(params => {
        this.solicitationID = params['id'];
        this.solicitationService.getSolicitation(this.solicitationID).subscribe({
          next: data => {
            if (data.parseStatus && Array.isArray(data.parseStatus)) {
              data.parseStatus.forEach(element => {
                element.status = element.status === 'successfully parsed' ? 'Yes' : 
                                element.status === 'processing error' ? 'No' : 
                                element.status;
                element.formattedDate = moment(element.postedDate).format('L');
              });
            } else {
              console.log('Error processing parse status for solicitation ' + data.solNum);
              data.parseStatus = [{
                formattedDate: '', 
                postedDate: null,
                name: '',
                status: '',
                attachment_url: ''
              }];
            }
   
            this.step1 = data.history?.filter(e =>
              e['action'].indexOf('reviewed solicitation action requested summary') > -1
            ).length > 0;
   
            this.step2 = data.history?.filter(e =>
              e['action'].indexOf('sent email to POC') > -1
            ).length > 0;
   
            this.step3 = data.history?.filter(e =>
              e['action'].indexOf('provided feedback on the solicitation prediction result') > -1
            ).length > 0;
   
            this.solicitation = data;
   
            const totalDoc = Number(this.solicitation.numDocs);
            if (!isNaN(totalDoc)) {
              if (totalDoc !== this.solicitation.parseStatus.length) {
                const lock = totalDoc - this.solicitation.parseStatus.length;
                this.lockDocs = Array(lock).fill(0).map((_, i) => i + 1);
              }
            }
          },
          error: err => console.log(err)
        });
      });
    }
   }
   
  onNotApplicableClick(event) {
    this.solicitation.na_flag = event.target.checked;
    this.solicitationService.update(this.solicitation)
      .subscribe( (data) => {});

      this.$gaService.event('not_applicable', 'make_srt_better', 'Not Applicable');

  }

  onClickTabs(action: string, label: string): void {
    this.$gaService.event(action, "solicitation_tab", label);
  }
}
