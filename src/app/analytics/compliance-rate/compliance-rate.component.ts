import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-compliance-rate',
  templateUrl: './compliance-rate.component.html',
  styleUrls: ['./compliance-rate.component.css']
})

@Directive({selector: 'baseChart'})

export class ComplianceRateComponent implements OnInit {

    @ViewChild(BaseChartDirective) private baseChart; 
    @Input() ICTforDisplay; 
    public canvas;
    public ctx;
    public compliance:any = 0;
    public nonCompliance:any = 0;
    public totalICT:any = 0;
    public percentage:Number = 0;

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

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {      
        if ( this.ICTforDisplay.length > 0)
        {     
            this.totalICT = this.ICTforDisplay.length;
            this.compliance = this.ICTforDisplay.filter(function(e){ return e.predictions.value=="GREEN"}).length;
            this.nonCompliance = this.totalICT - this.compliance;  
            this.doughnutChartData = [this.compliance, this.nonCompliance];
            this.percentage = Math.round(this.compliance / this.totalICT * 100);

            var CountTo = this.percentage;
            
            $('.compliance-count').each(function () {
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
