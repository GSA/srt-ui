import { Component, OnInit, Input, ViewChild} from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Color } from 'chart.js';
import { getChartLabelPlugin, PLUGIN_ID } from 'chart.js-plugin-labels-dv';


@Component({
  selector: 'app-undetermined-solicitations',
  templateUrl: './undetermined-solicitations.component.html',
  styleUrls: ['./undetermined-solicitations.component.scss']
})
export class UndeterminedSolicitationsComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() UndeterminedSolicitationChart;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public hasValue = false;
  public pieChartLabels: string[] = ['Presolicitation', 'Other Undetermined', '0 Documents', 'Non-Machine Readable'];
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

  public displayPresolicitation = '';
  public displayNonMachineReadable = '';
  public displayNoDocument = '';
  public displayOtherUndetermined= '';

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
  ngOnChanges() {
    if (this.UndeterminedSolicitationChart && !this.hasValue) {
      const presolicitation = this.UndeterminedSolicitationChart.presolicitation;
      const undetermined = this.UndeterminedSolicitationChart.latestOtherUndetermined;
      const NonMachineReadable = this.UndeterminedSolicitationChart.latestNonMachineReadable;
      const NoDocument = this.UndeterminedSolicitationChart.latestNoDocument;
      const total = presolicitation + undetermined + NonMachineReadable + NoDocument;
      this.pieChartData = {
        labels: this.pieChartLabels, 
        datasets:  [{
          data:[presolicitation, undetermined, NoDocument, NonMachineReadable],
          backgroundColor: ['#2C81C0', '#ff0000', '#e8e8e8', '#FFB300'],
          hoverBackgroundColor: ['#2C81C0', '#ff0000', '#e8e8e8', '#FFB300']
        }
      ]};

        this.displayPresolicitation = Math.round(presolicitation / total * 1000) / 10 + '%';
        this.displayNonMachineReadable = Math.round(NonMachineReadable / total * 1000) / 10 + '%';
        this.displayNoDocument = Math.round(NoDocument / total * 1000) / 10 + '%';
        this.displayOtherUndetermined = Math.round(undetermined / total * 1000) / 10 + '%';
        this.hasValue = true;
        this.forceChartRefresh();
    }
  }

  /**
   * refresh chart
   */
  forceChartRefresh() {
      setTimeout(() => {
          this.baseChart.update();
      }, 10);
  }

}
