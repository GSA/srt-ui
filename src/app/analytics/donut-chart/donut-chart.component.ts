import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartsModule, Color } from 'ng2-charts';
import * as $ from 'jquery';


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['../analytics.component.css', './donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {


  /* ATTRIBUTES */

  @Input() doughnutChartDataInput;
  @Input() title;
  @Input() componentTooltip;
  @Input() note;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public doughnutChartLabels: String[] = ['', ''];
  public doughnutChartData: any[] = [0, 1];
  public doughnutChartType: String = 'doughnut';

  public percentage: Number = 0;
  public numerator: Number = 0;
  public denominator: Number = 0;
  public id: String = '';
  public tableHTML = '';

  public options: any = {
      cutoutPercentage: 85,
      legend: {
          display: false
      },
      tooltips: {
          enabled: false
      },
      maintainAspectRatio: false,
      responsive: true,
  };

  public colorsOverride: Array<Color> = [{
      backgroundColor: [ '#2C81C0', '#f7f7f7'],
      hoverBackgroundColor: [ '#2C81C0', '#f7f7f7'],
  }];

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
    if (this.doughnutChartDataInput) {
      if (this.title === 'Conversion Rate') {

        this.numerator = this.doughnutChartDataInput.updatedCompliantICT;
        this.denominator = this.doughnutChartDataInput.uncompliance;
        this.doughnutChartData = [this.doughnutChartDataInput.updatedCompliantICT, this.doughnutChartDataInput.uncompliance];
        this.percentage = this.doughnutChartDataInput.uncompliance === 0 ? 0 : Math.round(this.doughnutChartDataInput.updatedCompliantICT / this.doughnutChartDataInput.uncompliance * 100);
        const CountTo = this.percentage;
        this.id = 'ConversionRate'
        this.note = 'non-compliant ICT solicitations became compliant after they were updated on FedBizOpps.gov';
        this.tableHTML = this.makeDataTable([[this.doughnutChartData[0], this.percentage + '%', this.doughnutChartData[1]]],
          ['Updated Solicitations Converted to Compliant', 'Percent Changed to Compliant', 'Number Updated Solicitations'],
          'Conversion Rate Donut Chart Data Table');

      } else if (this.title === 'Preliminary Compliance Rate') {
        this.numerator = this.doughnutChartDataInput.compliance;
        this.denominator = this.doughnutChartDataInput.determinedICT;
        this.doughnutChartData = [this.numerator, this.doughnutChartDataInput.determinedICT - this.doughnutChartDataInput.compliance];
        this.percentage = this.doughnutChartDataInput.determinedICT === 0 ? 0 : Math.round(this.doughnutChartDataInput.compliance / this.doughnutChartDataInput.determinedICT * 100);
        const CountTo = this.percentage;
        this.id = 'ComplianceRate'
        this.note = 'ICT machine readable solicitations scanned by SRT are Section 508 compliant solicitations';
        this.tableHTML = this.makeDataTable([[this.doughnutChartData[0], this.percentage + '%', this.doughnutChartData[1]]],
          ['Compliant Machine Readable Solicitations', 'Percent Compliant Machine Readable Solicitations', 'Total Machine Readable Solicitations'],
          'Preliminary Compliance Rate Donut Chart Data Table');
      }

      $("#" + this.id).each(function() {
        $(this)
        .prop("Counter", 0)
          .animate(
            {
              Counter: '' + CountTo
            },
            {
              duration: 500,
              easing: 'swing',
              step: function(now) {
                $(this).text(Math.ceil(now) + '%');
              }
            }
          );
      });

    }
  }

  makeDataTable(data: Array<Array<any>>, headers: Array<any>, caption: string) {
    const head_html = '<th>' + headers.join('</th><th>') + '</th>';
    const body_html = data.map( x => '<tr><td>' + x.join('</td><td>') + '</td></tr>').join('\n');
    let html = `
      <table class="visually-hidden">
        <caption>${caption}</caption>
        <thead>
          <tr>
            ${head_html}
          </tr>
        </thead>
        <tbody>
          ${body_html}
        </tbody>
      </table>`;

    return html;
  }
}
