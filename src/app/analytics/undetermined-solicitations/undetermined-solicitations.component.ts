import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Color } from 'chart.js';
import { getChartLabelPlugin, PLUGIN_ID } from 'chart.js-plugin-labels-dv';


@Component({
    selector: 'app-undetermined-solicitations',
    templateUrl: './undetermined-solicitations.component.html',
    styleUrls: ['./undetermined-solicitations.component.scss'],
    standalone: false
})
export class UndeterminedSolicitationsComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() UndeterminedSolicitationChart;
  @ViewChild(BaseChartDirective, { static: false }) private baseChart;

  public hasValue = false;
  public pieChartLabels: string[] = ['Presolicitation', 'Other Undetermined', 'No Documents', 'Non-Machine Readable'];
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
        onClick: function () {
        }
      }
    },
    tooltips: {
      enabled: false, // Disable default chart.js tooltips if they interfere
    }
  };

  // Add this property to control tooltip visibility
  public showUnevaluatedTooltip = false; // Add this line

  // Add this property for tooltip content
  public unevaluatedTooltipText = 'Other Undetermined solicitations are solicitations with attachments that cannot be accessed by SRT for various reasons (e.g., security redirect).'; // Add this line


  public displayPresolicitation = '0%';
  public displayOtherUndetermined = '0%';
  public displayNoDocument = '0%';
  public displayNonMachineReadable = '0%';


  /* CONSTRUCTOR */

  /**
   * constructor
   */
  constructor() { }

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
        datasets: [{
          data: [presolicitation, undetermined, NoDocument, NonMachineReadable],
          backgroundColor: ['#2C81C0', '#ff0000', '#C28800', '#B46AF0'],
          hoverBackgroundColor: ['#2C81C0', '#ff0000', '#C28800', '#B46AF0']
        }
        ]
      };

      this.displayPresolicitation = Math.round(presolicitation / total * 1000) / 10 + '%';
      this.displayNonMachineReadable = Math.round(NonMachineReadable / total * 1000) / 10 + '%';
      this.displayNoDocument = Math.round(NoDocument / total * 1000) / 10 + '%';
      this.displayOtherUndetermined = Math.round(undetermined / total * 1000) / 10 + '%';

      this.hasValue = true;
      this.forceChartRefresh();
    }
  }

  /**
   * lifecycle
   */
  forceChartRefresh() {
    setTimeout(() => {
      this.baseChart.update();
    }, 10);
  }

}