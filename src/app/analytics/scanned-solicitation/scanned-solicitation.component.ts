import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Color } from 'ng2-charts';
import {saveAs} from 'file-saver';
import { AnalyticsService } from '../services/analytics.service';


import * as _ from 'underscore';

@Component({
    selector: 'app-scanned-solicitation',
    templateUrl: './scanned-solicitation.component.html',
    styleUrls: ['../analytics.component.css','./scanned-solicitation.component.css']
})

@Directive({selector: 'baseChart'})

export class ScannedSolicitationComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() ScannedSolicitationChart;
  @Input() solStats;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public toPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 ));
  public fromPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32 ));
  public hasValue = false;
  public newSolicitationData: Number[] = [];
  public updatedSolicitationData: Number[] = [];

  public barChartLabels: String[] = [];
  public barChartType: String = 'bar';
  public barChartData: any[] = [];
  public tabularData = '';


  public barChartOptions:any = {
      legend: {
        display: true,
        position: 'bottom'
      },
      scaleShowVerticalLines: false,
      maintainAspectRatio: false,
      responsive: true,
      barPercentage: 1.0,
      scales: {
          xAxes: [{
                  stacked: true,
                  gridLines: {
                      color: 'rgba(0, 0, 0, 0)',
                  },
                  barPercentage: 1.0,
                  categoryPercentage: 0.9,
              }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              min: 0,
            },
              gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
              }},
          ],
          labelString: 'probability'
      },
      tooltips: {
          enabled: true,
          callbacks: {
              label : function(tooltipItem, data) {
                  return '# scanned solicitations: ' + data.datasets[0].data[tooltipItem.index];
              }
          },
          opacity: 1,
      },
  };



  public colorsOverride: Array<Color> = [
      { backgroundColor: _.range(32).map(function () { return '#2C81C0' })}
  ];

  /* CONSTRUCTOR */

  /**
   * constructor
   */
  constructor(
    private AnalyticsService: AnalyticsService,
  ) {}

  /**
   * lifecycle
   */
  ngOnInit() {
  }


  formatDate(d: Date) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('');
  }

  filterRecentDates(fromDate: Date, inArray: Array<any>) {
    const fromDateYYYYMMDD = this.formatDate(this.fromPeriod);
    const result = {};
    for (const key of Object.keys(inArray) ){
      if (key > fromDateYYYYMMDD) {
        result[key] = inArray[key];
      }
    }
    return result;
  }

  // strips of the YYYY from an Object with keys of YYYYMMDD
  stripYears(inArray: Object) {
    const result = {};
    for (const key of Object.keys(inArray) ) {
      const newKey = key.substr(4);
      result[newKey] = inArray[key];
    }
    return result;
  }

  /**
   * lifecycle
   */
  ngOnChanges() {
    if (this.ScannedSolicitationChart && !this.hasValue) {
        this.barChartLabels = [];
        let i = 0;
        const recentNewSolicitationsByDate = this.stripYears(
          this.filterRecentDates(this.fromPeriod, this.solStats.newSolicitationsByDate)
        );
        const recentUpdatedSolicitationsByDate = this.stripYears(
          this.filterRecentDates(this.fromPeriod, this.solStats.updatedSolicitationsByDate)
        );
        for (const d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)){
            const formattedDay = ('0' + d.getDate()).slice(-2);
            const formattedMonth = ('0' + (d.getMonth() + 1)).slice(-2);
            const iDate = formattedMonth + formattedDay;
            this.newSolicitationData[i] = recentNewSolicitationsByDate[iDate] || 0;
            this.updatedSolicitationData[i] = recentUpdatedSolicitationsByDate[iDate] || 0;
            this.barChartLabels.push(d.getMonth() + 1 + '/' + d.getDate());
            i++;
        }
        for (let i = 0; i < this.newSolicitationData.length; i++) {
          this.newSolicitationData[i] = (this.newSolicitationData[i]) ? this.newSolicitationData[i] : 0;
        }
        this.tabularData = this.buildTable(this.newSolicitationData, this.barChartLabels);
      this.barChartData = [{
        data: this.newSolicitationData,
        label: 'New Solicitations'
      }, {
        data: this.updatedSolicitationData,
        label: 'Updated Solicitations'
      }];
        this.hasValue = true;
        this.forceChartRefresh();
    }
  }

  buildTable(data, labels) {
    let table = '' +
      '<table class="visually-hidden">' +
      ' <caption>Scanned Solicitations in the Last 30 Days</caption>' +
      ' <thead>' +
      '  <tr>' +
      '   <th scope="col">Date</th>' +
      '   <th scope="col">Number of Solicitations</th>' +
      '  </tr>' +
      ' </thead>' +
      ' <tbody>';

    // tslint:disable-next-line:max-line-length
    const month_list = ['zero index', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < data.length; i++) {
      let month_num, day;
      [month_num, day] = labels[i].split('/')
      const month_name = month_list[month_num]
      table += `<tr><td>${month_name} ${day}</td><td>${data[i]}</td></tr>`;
    }
    table += '</tbody></table>';

    return table;

  }

  /**
   * lifecycle
   */
  forceChartRefresh() {
      setTimeout(() => {
          this.baseChart.refresh();
      }, 10);
  }

  downloadCSV() {
    document.body.style.cursor = 'wait';
    this.AnalyticsService.GetDownloadedSolicitationsReport()
      .subscribe(
        data => {
          saveAs(data, 'downloaded_solicitations_report.csv');
          document.body.style.cursor = 'default';
        },
        err => {
        }
      );
  }
}
