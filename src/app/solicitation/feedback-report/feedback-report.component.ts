import { Component, OnInit } from '@angular/core';

import { SolicitationService } from '../solicitation.service';
@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.css']
})
export class FeedbackReportComponent implements OnInit {

  params = {
    "$where" : "this.feedback.length > 0"
  };

  feedback;
  constructor(
    private solicitationService: SolicitationService
  ) {}

  ngOnInit() {
    this.getFeedback();
  }

  getFeedback() {
    this.solicitationService.getSolicitationFeedback(this.params).subscribe(
      data => {
        this.feedback = data;
        this.feedback.forEach(element => {
          var history = element.history.filter(d => d.action == "provided feedback on the solicitation prediction result")[0];
          element.submitter = history.user;
          element.date = history.date;
        });
        this.feedback.sort(function(a,b){
          var aDate = new Date(a.date);
          var bDate = new Date(b.date);
          if (aDate > bDate) return -1;
          else return 1;
        })
      },
      error => console.log(error)
    )
  }

}
