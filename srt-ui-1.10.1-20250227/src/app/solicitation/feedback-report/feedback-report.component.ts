import { Component, OnInit } from '@angular/core';

import { SolicitationService } from '../solicitation.service';
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */

  params = {
    '$where' : 'this.feedback.length > 0'
  };

  feedback;

  /* CONSTRUCTORS */

  /**
   * constructor
   */
  constructor(
    private solicitationService: SolicitationService,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Feedback Report';
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    super.ngOnInit();
    this.getFeedback();
  }

  /**
   * get feedback
   */
  getFeedback() {
    this.solicitationService.getSolicitationFeedback(this.params).subscribe(
      {next: data => {
        this.feedback = data;
        this.feedback.forEach(element => {
          const history = element.history.filter(d => d.action === 'provided feedback on the solicitation prediction result')[0];
          element.submitter = history.user;
          element.date = history.date;
        });
        this.feedback.sort(function(a, b){
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          if (aDate > bDate) {
            return -1;
          } else {
            return 1;
          }
        });
      },
      error: e => console.log(e)}
    );
  }

}
