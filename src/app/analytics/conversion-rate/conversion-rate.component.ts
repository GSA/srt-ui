import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-conversion-rate',
  templateUrl: './conversion-rate.component.html',
  styleUrls: ['./conversion-rate.component.css']
})

@Directive({selector: 'baseChart'})

export class ConversionRateComponent implements OnInit {

    @Input() ICTforDisplay;
    @Input() nonCompliantICT;
    @Input() updatedCompliantICT;
    public canvas;
    public ctx;   
    public updatedCompliantICTNumber:any = 0;
    public TotalNonCompliant:any = 0;
    public percentage:Number = 0;  


    constructor() { }  


    ngOnInit() {    
        
    }


    ngOnChanges() {
        this.TotalNonCompliant = this.nonCompliantICT.length;
        this.updatedCompliantICTNumber = this.updatedCompliantICT.length;        
        this.doughnutChartData = [this.updatedCompliantICTNumber, this.TotalNonCompliant];
        this.percentage = this.TotalNonCompliant == 0 ? 0 : Math.round(this.updatedCompliantICTNumber / this.TotalNonCompliant * 100);
        var CountTo = this.percentage;        

        $('.conversion-count').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: ""+CountTo
            }, {
                duration: 500,
                easing: 'swing',
                step: function (now) {  
                    debugger                  
                    $(this).text(Math.ceil(now) + "%");
                }
            });
        }); 
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
