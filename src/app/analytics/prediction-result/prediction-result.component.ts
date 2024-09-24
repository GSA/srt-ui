import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import {Globals} from 'globals';


@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['../analytics.component.scss', './prediction-result.component.scss']
})
export class PredictionResultComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() PredictResultChart;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;


  public displayCompliance = '';
  public displayUncompliance = '';
  public displayUndetermined = '';
  public numCompliant = 0;
  public numNonCompliant = 0;

  public hasValue = false;
  public pieChartLabels: BaseChartDirective["labels"] = ['', ''];
  public pieChartData: ChartData;

  public pieChartType: ChartType = 'pie';
  public barChartPlugins = [];
  public options: any = {
    plugins: {
      legend: {
          display: true,
          position: 'bottom',
          onClick: function() {
          },
          labels: {
            color: '#000000',
            font: {
              size: 16
            }
          }
      }
  },
    tooltips: {
        enabled: true,
        callbacks: {
            label : function(tooltipItem, data) {
              return  data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + ' solicitation(s)';
            }
        }
    },
    maintainAspectRatio: false,
    responsive: true,
  };


  /* CONSTRUCTOR */

  /**
   * constructor
   */
  constructor( public globals: Globals ) { 
  }

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * lifecycle
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {

    if (this.PredictResultChart && !this.hasValue) {
        this.numCompliant = this.PredictResultChart.compliance;
        this.numNonCompliant = this.PredictResultChart.uncompliance;
        const total = this.numCompliant + this.numNonCompliant ;
        
        this.displayCompliance = Math.round(this.numCompliant / total * 1000) / 10 + '%';
        this.displayUncompliance = Math.round(this.numNonCompliant / total * 1000) / 10 + '%';

        this.pieChartData = {
          labels: [this.numCompliant + ' Compliant ' + this.displayCompliance,
                   this.numNonCompliant + ' Non-compliant ' + this.displayUncompliance],
        
          datasets: [{
            data: [this.numCompliant, this.numNonCompliant], 
            backgroundColor: ['#2C81C0', '#ff0000'], 
            borderColor: ['#2C81C0', '#ff0000']}
          ]
        };

        this.hasValue = true;
        this.forceChartRefresh();
    }
  }

  // refresh the charts
  forceChartRefresh() {
      setTimeout(() => {
          this.baseChart.update();
      }, 10);
  }

}
