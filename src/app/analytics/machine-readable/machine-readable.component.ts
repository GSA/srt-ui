import { Component, OnInit, Input } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-machine-readable',
  templateUrl: './machine-readable.component.html',
  styleUrls: ['./machine-readable.component.css']
})
export class MachineReadableComponent implements OnInit {

  @Input() ICT;
  machineReadable = 0;
  machineUnreadable = 0;
  constructor() { }

  ngOnInit() {
    
  }


  ngOnChanges() {
    console.log(this.ICT);
    this.ICT.forEach(element => {
      element.parseStatus.forEach(ele => {        
        if (ele.status == "successfully parsed") this.machineReadable++;
        else this.machineUnreadable++;
      });
    });
    this.doughnutChartData = [this.machineReadable, this.machineUnreadable];
  }

  

  // Doughnut
  public doughnutChartLabels:string[] = ['Machine Readable', 'Non Machine Readable'];
  public doughnutChartData:any[] = [17, 83];

  public doughnutChartType:string = 'doughnut';
  public options:any = {
    cutoutPercentage: 0,
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  colorsOverride: Array<Color> = [{
      backgroundColor: [
          "#2C81C0",
          "#800000"
      ],
      hoverBackgroundColor: [
          "#2C81C0",
          "#800000"
      ],
  }];

}
