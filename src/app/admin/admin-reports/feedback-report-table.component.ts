import {Component, OnInit} from '@angular/core';
import {FeedbackReportService} from './feedback-report.service';


@Component({
  selector: 'app-admin-feedback',
  templateUrl: './feedback-report-table.component.html',
  styleUrls: ['./feedback-report-table.component.scss']
})
export class FeedbackReportTableComponent implements OnInit {

  data: any;
  cols: any;
  exportColumns: any;

  constructor(private feedbackReportService: FeedbackReportService) {
    this.cols = [
      { field: 'solicitation_number', header: 'Solicitation Number' },
      { field: 'title', header: 'Title' },
      { field: 'questionID', header: 'Question ID' },
      { field: 'question', header: 'Question' },
      { field: 'answer', header: 'Answer' },
      { field: 'email', header: 'User' },
      { field: 'agency', header: 'Agency' },
      { field: 'date', header: 'Date' },
      { field: 'note', header: 'Note' }
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    feedbackReportService.getFeedbackReport()
      .subscribe( {
        next: data => {
          console.log('Feedback Data', data);
          this.data = data;
        },
        error: error => {
          console.log(error);
        }
  });
  }

  ngOnInit() {
  }

}
