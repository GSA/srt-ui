import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-compliance-rate',
  templateUrl: './compliance-rate.component.html',
  styleUrls: ['./compliance-rate.component.css']
})

@Directive({selector: 'baseChart'})

export class ComplianceRateComponent implements OnInit {

  @Input() ICTforDisplay; 
  public canvas;
  public ctx;
  public compliance:any = 0;
  public nonCompliance:any = 0;
  public totalICT:any = 0;
  public rate:any = 0.0;

  // Doughnut Initialization 
  public doughnutChartLabels:string[] = ['Compliance', 'Non-Compliance'];
  public doughnutChartData:any[] = [350, 450];

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

  constructor() { }
  
    

  ngOnInit() {   
  }

  ngOnChanges() {
      
      if ( this.ICTforDisplay.length > 0)
      {     
        this.totalICT = this.ICTforDisplay.length;
        this.compliance = this.ICTforDisplay.filter(function(e){ return e.predictions.value=="GREEN"}).length;
        this.nonCompliance = this.totalICT - this.compliance;   
        //this.rate = Math.round(this.compliance / this.ICTforDisplay.length * 10000) / 100;
        this.doughnutChartData = [this.compliance, this.nonCompliance];
        this.rate = Math.round(this.compliance / this.totalICT * 100);   
        this.textCenter()
      }
      
  }

  ngDoCheck() {
      this.canvas  = this.baseChart.element.nativeElement;
      this.ctx = this.canvas.getContext("2d")
      this.textCenter()
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
      var text = this.rate + "%";
      this.ctx.fillText(text, this.canvas.width/2, this.canvas.height /2);      
  }

  @ViewChild(BaseChartDirective) private baseChart; 

    

}
