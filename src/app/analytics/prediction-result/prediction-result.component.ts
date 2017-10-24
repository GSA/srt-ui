import { Component, OnInit, Input, ViewChild, Directive  } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';


@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['../analytics.component.css','./prediction-result.component.css']
})
export class PredictionResultComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() PredictResultChart;
  @ViewChild(BaseChartDirective) private baseChart;


  public displayCompliance = '';
  public displayUncompliance = '';
  public displayUndetermined = '';

  public hasValue = false;
  public pieChartLabels:string[] = ['Compliant', 'Non-compliant'];
  public pieChartData:any[] = [0, 0];

  public pieChartType:string = 'pie';
  public options:any = {
    cutoutPercentage: 0,
    legend: {
        display: true,
        position: 'bottom',
        onClick: function() {
        }
    },
    tooltips: {
        enabled: true,
        callbacks: {
            label :function(tooltipItem, data) {
              return  data.labels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index] + " solicitation(s)"
            }
        }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  public colorsOverride: Array<Color> = [{
      backgroundColor: ['#2C81C0', '#f38084'],
      hoverBackgroundColor: ['#2C81C0', '#f38084'],
  }];

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

    if (this.PredictResultChart && !this.hasValue) {
        var compliance = this.PredictResultChart.compliance;
        var uncompliance = this.PredictResultChart.uncompliance;
        var total = compliance + uncompliance ;
        this.pieChartData = [compliance, uncompliance];
        this.displayCompliance = Math.round(compliance / total * 1000) / 10 + "%";
        this.displayUncompliance = Math.round(uncompliance / total * 1000) / 10 + "%";
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
