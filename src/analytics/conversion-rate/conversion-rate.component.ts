import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-conversion-rate',
  templateUrl: './conversion-rate.component.html',
  styleUrls: ['../analytics.component.css','./conversion-rate.component.css']
})

@Directive({selector: 'baseChart'})

export class ConversionRateComponent implements OnInit {

    @Input() ConversionRateChart;
    @ViewChild(BaseChartDirective) private baseChart;  
     
    // Doughnut
    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales'];
    public doughnutChartData:any[] = [0, 1];

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

    public percentage:Number = 0;  
    public updatedCompliantICTNumber:Number = 0;
    public TotalNonCompliant:Number = 0;

    constructor() { }  


    ngOnInit() {    
        
    }


    ngOnChanges() {
        
        if (this.ConversionRateChart) 
        {            
            this.updatedCompliantICTNumber = this.ConversionRateChart.updatedCompliantICT;
            this.TotalNonCompliant = this.ConversionRateChart.uncompliance;
            this.doughnutChartData = [this.ConversionRateChart.updatedCompliantICT, this.ConversionRateChart.uncompliance];
            this.percentage = this.ConversionRateChart.uncompliance == 0 ? 0 : Math.round(this.ConversionRateChart.updatedCompliantICT / this.ConversionRateChart.uncompliance * 100);
            var CountTo = this.percentage;        

            $('.conversion-count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: ""+CountTo
                }, {
                    duration: 500,
                    easing: 'swing',
                    step: function (now) {         
                        $(this).text(Math.ceil(now) + "%");
                    }
                });
            });
        }  
         
    }

    

}
