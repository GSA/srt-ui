import {Component, Directive, Input, OnInit, ViewChild} from '@angular/core';

import {BaseChartDirective, Color} from 'ng2-charts';

@Component({
  selector: 'app-machine-readable',
  templateUrl: './machine-readable.component.html',
  styleUrls: ['../analytics.component.css', './machine-readable.component.css']
})

@Directive({selector: 'baseChart'})
// tslint:disable-next-line:directive-class-suffix
export class MachineReadableComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() MachineReadableChart;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public hasValue = false;
  public pieChartLabels: string[] = ['Machine Readable', 'Non Machine Readable'];
  public pieChartData: any[] = [0, 0];

  public pieChartType = 'pie';
  public options: any = {
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
            title: function(tooltipItem, data) {
              return  tooltipItem[0].index === 0 ? 'Machine Readable: ' : 'Non Machine Readable: ';
            },
            label : function(tooltipItem, data) {
              return  data.datasets[0].data[tooltipItem.index] + ' documents';
            }
        }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  public colorsOverride: Array<Color> = [{
    backgroundColor: [ '#2C81C0', '#f7f7f7'],
    hoverBackgroundColor: [ '#2C81C0', '#f7f7f7'],
  }];

  public displayUnreadable = '';
  public displayReadable = '';

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

    if (this.MachineReadableChart && !this.hasValue) {
        const readable = this.MachineReadableChart.machineReadable;
        const unreadable = this.MachineReadableChart.machineUnreadable;
        const total = readable + unreadable;
        this.pieChartData = [this.MachineReadableChart.machineReadable, this.MachineReadableChart.machineUnreadable];
        this.displayReadable = Math.round(readable / total * 1000) / 10 + '%';
        this.displayUnreadable = Math.round(unreadable / total * 1000) / 10 + '%';
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
