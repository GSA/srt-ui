import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-conversion-rate',
  templateUrl: './conversion-rate.component.html',
  styleUrls: ['./conversion-rate.component.css']
})

@Directive({selector: 'baseChart'})

export class ConversionRateComponent implements OnInit {

  @Input() ICTforDisplay;
  @Input() nonCompliantICT;
  public canvas;
  public ctx;   
  public updatedCompliant:any = 0;
  public TotalNonCompliant:any = 0;
   

  
  constructor() { }
  


  ngOnInit() {    
      
      
  }
  ngDoCheck() {
      this.canvas  = this.baseChart.element.nativeElement;
      this.ctx = this.canvas.getContext("2d")
      this.textCenter()
  }

  ngOnChanges() {
      this.TotalNonCompliant = this.nonCompliantICT.length;
      this.doughnutChartData = [this.updatedCompliant, this.TotalNonCompliant];
  }

  textCenter() {
    
      var width = this.baseChart.element.nativeElement.clientWidth;
      var height = this.baseChart.element.nativeElement.clientHeight; 
      // var fontSize = (height / 250).toFixed(2);

      // this.chart.font = fontSize + "em Verdana";
      this.ctx.font = "30px Source Sans Pro";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "#2C81C0";
      this.ctx.textAlign = "center";
      var text =  this.TotalNonCompliant == 0 ? "0%" : Math.round(this.updatedCompliant / this.TotalNonCompliant * 100) + "%";
      this.ctx.fillText(text, this.canvas.width/2, this.canvas.height /2);      
  }

  @ViewChild(BaseChartDirective) private baseChart;   
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales'];
  public doughnutChartData:any[] = [17, 83];

  public doughnutChartType:string = 'doughnut';
  public options:any = {
    cutoutPercentage: 85,
    // rotation: 2 * Math.PI,
    // circumference: 2/3 * Math.PI,
    // animation: {
    //     animateScale: true
    // },
    legend: {
        display: false
    },
    tooltips: {
        enabled: false
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  colorsOverride: Array<Color> = [{
        backgroundColor: [
            "#2C81C0",
            "#f7f7f7"
        ],
        hoverBackgroundColor: [
            "#2C81C0",
            "#f7f7f7"
        ],
    }];
    
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
