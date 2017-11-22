import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import {TooltipModule} from "ng2-tooltip";

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
  @ViewChild(BaseChartDirective) private baseChart;

  public toPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 ));
  public fromPeriod: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32 ));
  public hasValue = false;
  public outputData: Number[] = [];

  public barChartLabels: String[] = [];
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = false;
  public barChartData:any[] = [];
    

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
      console.log(this.fromPeriod);
      console.log(this.toPeriod)
  }

  /**
   * lifecycle
   */
  ngOnChanges() {
    if (this.ScannedSolicitationChart && !this.hasValue) {
        this.barChartLabels = [];
        var i = 0;
        for(var d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)){
            var formattedNumber = ("0" + d.getDate()).slice(-2);
            this.outputData[i] = this.ScannedSolicitationChart.scannedData[+((d.getMonth()+1).toString() + formattedNumber)];
            this.barChartLabels.push(d.getMonth()+1 + "/" + d.getDate());
            i++;
        }
        this.outputData.forEach(element => {
          if (!element) {
            element = 0;
          }
        });
        console.log(this.outputData);
        this.barChartData = [{data: this.outputData, label:'The Nuber of solicitations'}];
        this.hasValue = true;
        this.forceChartRefresh();
    }
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
