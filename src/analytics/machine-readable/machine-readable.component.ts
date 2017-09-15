import { Component, OnInit, Input, ViewChild, Directive  } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-machine-readable',
  templateUrl: './machine-readable.component.html',
  styleUrls: ['../analytics.component.css','./machine-readable.component.css']
})

@Directive({selector: 'baseChart'})
export class MachineReadableComponent implements OnInit {

  @Input() MachineReadableChart;
  @ViewChild(BaseChartDirective) private baseChart;  

  public hasValue = false;
  public pieChartLabels:string[] = ['Machine Readable', 'Non Machine Readable'];
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
            title:function(tooltipItem, data) {                 
              var label = tooltipItem[0].index == 0 ? "Machine Readable: " : "Non Machine Readable: "              
              return  label;
            },
            label :function(tooltipItem, data) {                           
              return  data.datasets[0].data[tooltipItem.index] + " documents"
            }
        }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  colorsOverride: Array<Color> = [{
      backgroundColor: [
          "#2C81C0",
          "#ff0000"
      ],
      hoverBackgroundColor: [
          "#2C81C0",
          "#ff0000"
      ],
  }];

  public displayUnreadable = "";
  public displayReadable = ""

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {

    if (this.MachineReadableChart && !this.hasValue)
    {
        var readable = this.MachineReadableChart.machineReadable;
        var unreadable = this.MachineReadableChart.machineUnreadable;
        var total = readable + unreadable;
        this.pieChartData = [this.MachineReadableChart.machineReadable, this.MachineReadableChart.machineUnreadable];
        this.displayReadable = Math.round(readable / total * 1000) / 10 + "%";
        this.displayUnreadable = Math.round(unreadable / total * 1000) / 10 + "%";
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
