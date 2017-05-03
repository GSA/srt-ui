import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../solicitation.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})

@Directive({selector: 'baseChart'})

export class AnalyticsComponent implements OnInit {
        
    @ViewChild(BaseChartDirective) private baseChart;   
    
    solicitationType = {};   
    solicitationNumber = 0;
    actionTakenNumber= 0;
    complianceRate = 0.0;

    angencyTotal = {}
    angencyPass = {}
    angency = {};
        

    constructor(
        private SolicitationService: SolicitationService,
        private router: Router
    ) { }

    // Analytic chart
    
    // Pie Chart
    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';

    
    
    // events
    public pieChartClicked(e:any):void {
        console.log(e);
    }

    public pieChartHovered(e:any):void {
        console.log(e);
    }
        
    // Bar Chart

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    
    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;


    public barChartData:any[] = [
        {data: [], label: 'Total Solicitation'},
        {data: [], label: 'Pass Solicitation'}
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
    

    // Analytic get data
    ngOnInit() {            
        this.SolicitationService.getData()
        .subscribe(
            solicitation => {  
                
                // ICT Solicitation
                var ICT = solicitation.filter( d => d.eitLikelihood.value == "Yes" );
                this.solicitationNumber = ICT.length;         
                console.log(ICT)
                
                // Pass ICT Solicitaion
                var compliedSolicitaion = ICT.filter( d => d.predictions.value == "GREEN" );
                var compliedNumber = compliedSolicitaion.length;;
                this.complianceRate = Math.round(compliedNumber / this.solicitationNumber * 10000) / 100;
                
                // Action Taken Solicitaion
                var actionTaken = ICT.filter( d => d.history.length > 0 );                
                this.actionTakenNumber = actionTaken.length
                
                /*   Pie Chart   */                
                for (let item of ICT)
                {                                      
                    // Gathering data by noticeType
                    if (this.solicitationType[item.noticeType] == null)
                    {
                        this.solicitationType[item.noticeType] = 1;
                    } 
                    else {
                        this.solicitationType[item.noticeType]++;
                    }        
                    
                }                             
                
                // Insert data to the chart
                for (var key in this.solicitationType) {
                    var value = this.solicitationType[key];
                    this.doughnutChartData.push(value);
                    this.doughnutChartLabels.push(key);     
                }               
                                
                
                // Refresh the chart
                this.forceChartRefresh();
                
                /*   Bar Chart   */
                
                for (let item of ICT)
                {                                      
                    // Gathering data by noticeType
                    if (this.angencyTotal[item.agency] == null)
                    {
                        this.angencyTotal[item.agency] = 1;
                        if (item.predictions.value == "GREEN") this.angencyPass[item.agency] = 1;
                    } 
                    else {
                        this.angencyTotal[item.agency]++;
                        if (item.predictions.value == "GREEN") this.angencyPass[item.agency]++;
                    }       
                } 
                
                // Insert data to the chart
                for (var key in this.angencyTotal) {                
                    
                    // if angency doesn't have any passed solicitation                    
                    if (this.angencyPass[key] == null) 
                    {
                        this.angency[key] = 0;                    
                    }
                    else
                    {
                        this.angency[key] = this.angencyPass[key] / this.angencyTotal[key];  
                    }  
                           
                    this.barChartLabels.push(key);
                    this.barChartData[0].data.push(this.angencyTotal[key]);
                    this.barChartData[1].data.push(this.angencyPass[key]);
                }
                
                // Refresh the chart
                let clone = JSON.parse(JSON.stringify(this.barChartData));
                this.barChartData = clone;      
                                
                
                
                console.log(this.baseChart);
                
               
            },
            err => {
                console.log(err);
        });       
        
    }    
     
    // refresh the charts
    forceChartRefresh() {
        setTimeout(() => {
            this.baseChart.refresh();
        }, 10);
    }
   
 
    
    
}

