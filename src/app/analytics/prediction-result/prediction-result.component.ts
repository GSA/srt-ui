import { Component, OnInit, Input, ViewChild, Directive  } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';


@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['./prediction-result.component.css']
})
export class PredictionResultComponent implements OnInit {

  @Input() PredictResultChart;
  @ViewChild(BaseChartDirective) private baseChart;  

  public hasValue = false;
  public pieChartLabels:string[] = ['Compliant', 'Non-compliant', 'Undetermined'];
  public pieChartData:any[] = [0, 0, 0];

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
            // title:function(tooltipItem, data) {                 
            //   var label = tooltipItem[0].index == 0 ? "Non-compliant: " : "Compliant: "              
            //   return  label;
            // },
            // label :function(tooltipItem, data) {                           
            //   return  data.datasets[0].data[tooltipItem.index] + " documents"
            // }
        }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  colorsOverride: Array<Color> = [{
      backgroundColor: [
          "#2C81C0",
          "#ff0000",
          "#696969"
      ],
      hoverBackgroundColor: [
          "#2C81C0",
          "#ff0000",
          "#696969"
      ],
  }];

  public displayCompliance = "";
  public displayUncompliance = "";
  public displayUndetermined = "";
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

    if (this.PredictResultChart && !this.hasValue)
    {
       var compliance = this.PredictResultChart.compliance;
       var uncompliance = this.PredictResultChart.uncompliance;
       var undetermined = this.PredictResultChart.undetermined;
       var total = compliance + uncompliance + undetermined;
       this.pieChartData = [compliance, uncompliance, undetermined];
       this.displayCompliance = Math.round(compliance / total * 1000) / 10 + "%";
       this.displayUncompliance = Math.round(uncompliance / total * 1000) / 10 + "%";
       this.displayUndetermined = Math.round(undetermined / total * 1000) / 10 + "%";
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
