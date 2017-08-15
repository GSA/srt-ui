import { Component, OnInit } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  // Get 30 days range
  public toPeriod:Date = new Date();
  public fromPeriod:Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31 ));
  public currentLoginUsers:Number = 24;


  constructor() { }

  ngOnInit() {

  }

   ngDoCheck() {
      var i = 0;
      for(var d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)){      
          this.lineChartLabels.push(d.getMonth()+1 + "/" + d.getDate());              
          i++;
      }   
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [0, 2, 2, 4, 8, 12, 12, 16, 16, 18, 20, 24, 28, 32, 34, 32, 30, 30, 36, 40, 43, 45, 45, 46, 47, 48, 49, 50, 51, 51, 53, 55], label: ''},
      
  ];

  public lineChartLabels:Array<any> = [];
  public lineChartType:string = 'line';
 
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
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
            }],
        yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
            }],
    }
  };
  


  colorsOverride: Array<Color> = [{
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(44,129,192,1)',
      pointBackgroundColor: 'rgba(44,129,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(44,129,192,1)'
  }];
  
 
  public chartClicked(e:any):void {
  }
 
  public chartHovered(e:any):void {
  }

}
