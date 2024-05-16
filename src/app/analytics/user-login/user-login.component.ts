import { Component, OnInit, ViewChild } from '@angular/core';

import { Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  /* ATTRIBUTES */

  public toPeriod: Date = new Date();
  public fromPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31 ));
  public currentLoginUsers: Number = 24;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;


  public lineChartData: Array<any> = [
    {
      data: [0, 2, 2, 4, 8, 12, 12, 16, 16, 18, 20, 24, 28, 32, 34, 32, 30, 30, 36, 40, 43, 45, 45, 46, 47, 48, 49, 50, 51, 51, 53, 55],
      label: ''
    },
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartType = 'line';

  public options: any = {
    cutout: 85,
    datasets: {
      line: {
        backgroundColor: 'rgba(255,255,255,0)',
        borderColor: 'rgba(44,129,192,1)',
        pointBackgroundColor: 'rgba(44,129,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(44,129,192,1)',
      }
    },
    legend: {
        display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [{
                gridLines: {
                    color: 'rgba(0, 0, 0, 0)',
                },
            }],
        yAxes: [{
                gridLines: {
                    color: 'rgba(0, 0, 0, 0)',
                },
            }],
    }
  };


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
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck() {
    let labels = [];
    let i = 0;
    const toPeriod = new Date(this.toPeriod);
    for (let d = new Date(this.fromPeriod); d <= toPeriod && i < 32; d.setDate(d.getDate() + 1)) {
      labels.push(d.getMonth() + 1 + '/' + d.getDate());
      i++;
    }
    this.lineChartLabels = labels;
  }

}
