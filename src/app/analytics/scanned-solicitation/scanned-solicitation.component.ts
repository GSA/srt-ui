import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';
import {TooltipModule} from "ng2-tooltip";

import * as _ from 'underscore';

@Component({
    selector: 'app-scanned-solicitation',
    templateUrl: './scanned-solicitation.component.html',
    styleUrls: ['./scanned-solicitation.component.css']
})

@Directive({selector: 'baseChart'})

export class ScannedSolicitationComponent implements OnInit {

    @Input() ScannedSolicitationChart;
    @ViewChild(BaseChartDirective) private baseChart; 

    // Get 30 days range
    public toPeriod:Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 ));
    public fromPeriod:Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32 ));
    public hasValue = false;
    public outputData:number[] = [];
  
    // chart config.
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        maintainAspectRatio: false,
        responsive: true,
        barPercentage: 1.0,
        scales: {
            xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    barPercentage: 1.0,
                    categoryPercentage: 0.9, 
                }],
            yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                }],
            labelString: 'probability'
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label :function(tooltipItem, data) {   
                    return "# scanned solicitations: " + data.datasets[0].data[tooltipItem.index];
                }
            },
            opacity: 1,
        },
    };

    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false;
 
    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
    ];

    public colorsOverride: Array<Color> = [
        { backgroundColor: _.range(32).map(function () { return '#2C81C0' })}
    ];
 

    constructor() { }

    ngOnInit() {
    }
    
    ngOnChanges() {    
        if (this.ScannedSolicitationChart && !this.hasValue)
        {
            this.barChartLabels = [];
            var i = 0;
            for(var d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)){    
                var formattedNumber = ("0" + d.getDate()).slice(-2);                   
                this.outputData[i] = this.ScannedSolicitationChart.scannedData[+((d.getMonth()+1).toString() + formattedNumber)];
                this.barChartLabels.push(d.getMonth()+1 + "/" + d.getDate());              
                i++;
            }         
            this.barChartData = [{data: this.outputData, label:''}];
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
