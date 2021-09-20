import { Component, OnInit } from '@angular/core';
import {saveAs} from 'file-saver';



// import services
import {AnalyticsService} from '../../analytics/services/analytics.service';


@Component({
  selector: 'metric-downloads',
  templateUrl: './metric-downloads.component.html',
  styleUrls: ['./metric-downloads.component.css']
})
export class MetricDownloadsComponent implements OnInit {


  /* CONSTRUCTORS */
  /**
   * constructor
   */
  constructor(
    private AnalyticsService: AnalyticsService
  ) {
  }

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  downloadScannedSolicitationsCSV() {
    document.body.style.cursor = 'wait';
    const button_element = document.getElementById('downloadScannedSolicitationsCSV');
    button_element.style.cursor = 'wait';
    this.AnalyticsService.GetDownloadedSolicitationsReport()
      .subscribe(
        data => {
          saveAs(data, 'downloaded_solicitations_report.csv');
          document.body.style.cursor = 'default';
          button_element.style.cursor = 'pointer';
        },
        err => {
        }
      );
  }

  downloadPredictionMetricsCSV() {
    document.body.style.cursor = 'wait';
    const button_element = document.getElementById('downloadPredictionMetricsCSV');
    button_element.style.cursor = 'wait';
    this.AnalyticsService.GetPredictionMetricsReport()
      .subscribe(
        data => {
          saveAs(data, 'downloaded_solicitations_report.csv');
          document.body.style.cursor = 'default';
          button_element.style.cursor = 'pointer';
        },
        err => {
        }
      );
  }

  downloadNoticeTypeChangeMetricsCSV() {
    document.body.style.cursor = 'wait';
    const button_element = document.getElementById('downloadNoticeTypeChangeMetricsCSV');
    button_element.style.cursor = 'wait';
    this.AnalyticsService.GetNoticeTypeChangeReport()
      .subscribe(
        data => {
          saveAs(data, 'downloaded_notice_type_change_report.csv');
          document.body.style.cursor = 'default';
          button_element.style.cursor = 'pointer';
        },
        err => {
        }
      );
  }

  scroll(id) {
    const el = document.getElementById(id);
    window.scroll({top: el.offsetTop + 115, behavior: 'smooth'});
  }


}
