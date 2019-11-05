import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Color } from 'ng2-charts';


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
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public toPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 ));
  public fromPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32 ));
  public hasValue = false;
  public outputData: Number[] = [];

  public barChartLabels: String[] = [];
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = false;
  public barChartData: any[] = [];
  public tabularData = '';


  public barChartOptions:any = {
      scaleShowVerticalLines: false,
      maintainAspectRatio: false,
      responsive: true,
      barPercentage: 1.0,
      scales: {
          xAxes: [{
                  gridLines: {
                      color: 'rgba(0, 0, 0, 0)',
                  },
                  barPercentage: 1.0,
                  categoryPercentage: 0.9,
              }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
            },
              gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
              },
          }],
          labelString: 'probability'
      },
      tooltips: {
          enabled: true,
          callbacks: {
              label :function(tooltipItem, data) {
                  return "# scanned solicitations: " + data.datasets[0].data[tooltipItem.index];
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
  ) {}

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * lifecycle
   */
  ngOnChanges() {
    if (this.ScannedSolicitationChart && !this.hasValue) {
        this.barChartLabels = [];
        let i = 0;
        for(let d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)){
            const formattedNumber = ('0' + d.getDate()).slice(-2);
            this.outputData[i] = this.ScannedSolicitationChart.scannedData[+((d.getMonth()+1).toString() + formattedNumber)];
            this.barChartLabels.push(d.getMonth() + 1 + '/' + d.getDate());
            i++;
        }
        for (let i = 0; i < this.outputData.length; i++) {
          this.outputData[i] = (this.outputData[i]) ? this.outputData[i] : 0;
        }
        console.log(this.outputData)
        this.tabularData = this.buildTable(this.outputData, this.barChartLabels);
        this.barChartData = [{data: this.outputData, label: 'The Nuber of solicitations'}];
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
}
