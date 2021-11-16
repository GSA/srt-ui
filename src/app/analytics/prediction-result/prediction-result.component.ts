import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType} from 'chart.js';
import {Globals} from 'globals';


@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['../analytics.component.css', './prediction-result.component.css']
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
  public pieChartLabels: Label[] = ['', ''];
  public pieChartData: any[] = [0, 0];

  public pieChartType: ChartType = 'pie';
  public barChartPlugins = [];
  public options: ChartOptions = {
    cutoutPercentage: 0,
    legend: {
        display: true,
        position: 'bottom',
        onClick: function() {
        },
        labels: {
          fontColor: this.globals.chart_legend_text_color,
          fontSize: 16
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

  public colorsOverride: Array<Color> = [{
      backgroundColor: [ this.globals.chart_color_1, this.globals.chart_color_2 ],
      hoverBackgroundColor: [ this.globals.chart_color_1, this.globals.chart_color_2 ],
  }];

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
        this.pieChartData = [this.numCompliant, this.numNonCompliant];
        this.displayCompliance = Math.round(this.numCompliant / total * 1000) / 10 + '%';
        this.displayUncompliance = Math.round(this.numNonCompliant / total * 1000) / 10 + '%';
        this.pieChartLabels = [ this.numCompliant + ' Compliant ' + this.displayCompliance,
                                this.numNonCompliant + ' Non-compliant ' + this.displayUncompliance];
        this.hasValue = true;
        this.forceChartRefresh();
    }
  }

  // refresh the charts
  forceChartRefresh() {
      setTimeout(() => {
          this.baseChart.refresh();
      }, 10);
  }

}
