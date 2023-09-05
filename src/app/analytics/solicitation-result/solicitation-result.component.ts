import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { getChartLabelPlugin, PLUGIN_ID } from 'chart.js-plugin-labels-dv';

@Component({
  selector: 'app-solicitation-result',
  templateUrl: './solicitation-result.component.html',
  styleUrls: ['./solicitation-result.component.css']
})
export class SolicitationResultComponent {

  @Input() SolicitationResultChart;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public displayCompliance = '';
  public displayUncompliance = '';
  public displayNotApplicable = '';

  public numCompliant = 0;
  public numNonCompliant = 0;
  public numNotApplicable = 0;

  public hasValue = false;
  public pieChartLabels: string[] = ['Compliant', 'Not Compliant', 'Not Applicable'];
  public pieChartData: any;

  public pieChartType = 'pie';
  public pieChartPlugins = [getChartLabelPlugin()];

  public options: any = {
    cutout: 0,
    layout: {
      padding: {
        top: 20,
      }
    },
    plugins: {
      labels: {
        render: 'percentage',
        precision: 1,
        fontSize: 16,
        fontColor: '#fffff',
        position: 'outside',
        outsidePadding: 4,
        textMargin: 6,
      },
      legend: {
          display: true,
          position: 'bottom',
          onClick: function() {
          }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  /**
   * constructor
   */
  constructor( ) { }

  /**
   * lifecycle
   */
  ngOnInit() {}

  /**
   * lifecycle
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    if (this.SolicitationResultChart && !this.hasValue) {
      this.numCompliant = this.SolicitationResultChart.compliance;
      this.numNonCompliant = this.SolicitationResultChart.uncompliance;
      this.numNotApplicable = this.SolicitationResultChart.notApplicable;
      
      this.pieChartData = {
        labels: this.pieChartLabels,

        datasets: [{
          data: [this.numCompliant, this.numNonCompliant, this.numNotApplicable], 
          backgroundColor: ['#2C81C0', '#ff0000', '#e8e8e8',], 
          borderColor: ['#2C81C0', '#ff0000', '#e8e8e8',]
        }]
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
