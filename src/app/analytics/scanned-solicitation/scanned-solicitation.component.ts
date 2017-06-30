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

    @Input() ICT;
    @ViewChild(BaseChartDirective) private baseChart; 

    // Get 30 days range
    public toPeriod:Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 ));
    public fromPeriod:Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32 ));
    public hasValue = false;
    public date:number[] = Array.apply(null, new Array(32)).map(Number.prototype.valueOf,0);
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
        }
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
        // Only need to run this loop once since this is not affected by filter.
        if (this.ICT.length > 0 && !this.hasValue)
        {          

            this.barChartLabels = [];
            this.ICT.forEach(element => {  
                var elementDate = new Date(element.date);
                
                if (elementDate.getTime() > this.fromPeriod.getTime() && elementDate.getTime() < this.toPeriod.getTime()) 
                {
                    var day = +element.date.split('/')[1];
                    this.date[day] = this.date[day] + 1;  
                }      
            });

            var i = 0;
            for(var d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)){            
                this.outputData[i] = this.date[d.getDate()];
                this.barChartLabels.push(d.getMonth()+1 + "/" + d.getDate());              
                i++;
            }           
            this.barChartData = [{data: this.outputData, label:''}];

            this.forceChartRefresh();
            this.hasValue = true;           
        }     
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }
    
    public chartHovered(e:any):void {
        console.log(e);
    }

   // refresh the charts
    forceChartRefresh() {
        setTimeout(() => {
            this.baseChart.refresh();
        }, 10);
    }
}
