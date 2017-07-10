import { Component, OnInit, Input, ViewChild, Directive  } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-machine-readable',
  templateUrl: './machine-readable.component.html',
  styleUrls: ['./machine-readable.component.css']
})

@Directive({selector: 'baseChart'})
export class MachineReadableComponent implements OnInit {

  @Input() ICT;
  @ViewChild(BaseChartDirective) private baseChart;  
  machineReadable = 0;
  machineUnreadable = 0;
  displayReadable = "";
  displayUnreadable = "";
  constructor() { }

  ngOnInit() {
    
  }


  ngOnChanges() {
    if (this.machineUnreadable == 0 && this.machineReadable == 0)
    {
      this.machineUnreadable = 0;
      this.machineReadable = 0;
      this.ICT.forEach(element => {
        element.parseStatus.forEach(ele => {        
          if (ele.status == "successfully parsed") this.machineReadable++;
          else this.machineUnreadable++;
        });
      });
      var machineReadablePercentage = Math.round((this.machineReadable / (this.machineReadable + this.machineUnreadable)) * 10000) / 100;
      var machineUnreadablePercentage = Math.round((this.machineUnreadable / (this.machineReadable + this.machineUnreadable)) * 10000) / 100;
      this.displayReadable = machineReadablePercentage + "%";
      this.displayUnreadable = machineUnreadablePercentage + "%";
      this.pieChartData = [this.machineReadable, this.machineUnreadable];
      console.log("Machine readable documents: " + this.machineReadable);
      console.log("Non-machine readable documents: " + this.machineUnreadable);
      //this.pieChartLabels = ['Machine Readable (' + machineReadablePercentage + "%)", 'Non Machine Readable (' + machineUnreadablePercentage + "%)"];
      this.forceChartRefresh();  
    }
     
  }

  // Doughnut
  public pieChartLabels:string[] = ['Machine Readable', 'Non Machine Readable'];
  public pieChartData:any[] = [17, 83];

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


  // refresh the charts
  forceChartRefresh() {
      setTimeout(() => {
          this.baseChart.refresh();
      }, 10);
  }

  // // events
  // public pieChartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public pieChartHovered(e:any):void {
  //   console.log(e);
  // }
}
