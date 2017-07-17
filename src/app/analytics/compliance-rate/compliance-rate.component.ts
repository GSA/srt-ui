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
    @Input() ComplianceRateChart; 

    // Doughnut Initialization 
    public doughnutChartLabels:string[] = ['Compliance', 'Non-Compliance'];
    public doughnutChartData:any[] = [0, 1];

    public doughnutChartType:string = 'doughnut';

    public options:any = {
        cutoutPercentage: 85,
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
    public compliance:Number = 0;
    public totalICT:Number = 0;

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {  

        if (this.ComplianceRateChart)
        {
            
            this.compliance = this.ComplianceRateChart.compliance;
            this.totalICT =  this.ComplianceRateChart.determinedICT; 
            this.doughnutChartData = [this.compliance, this.ComplianceRateChart.determinedICT - this.ComplianceRateChart.compliance];        
            this.percentage = this.ComplianceRateChart.determinedICT == 0 ? 0 : Math.round(this.ComplianceRateChart.compliance / this.ComplianceRateChart.determinedICT * 100);
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
