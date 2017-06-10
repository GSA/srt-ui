import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../solicitation.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';

import {TooltipModule} from "ng2-tooltip";

import * as $ from 'jquery';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})

@Directive({selector: 'baseChart'})

export class AnalyticsComponent implements OnInit {
        
  
    @ViewChild(BaseChartDirective) private baseChart;   
    
    solicitationNumber = 0;
    
    // Filter 
    public selectedGovernment = "Government-wide";
    public selectedPeriod = "All";
    public formPeriod:Date = new Date(new Date().getFullYear(), 0, 1);
    public toPeriod:Date = new Date(new Date().getFullYear(), 11, 31);
    public xAxis = "Agency";
    
    ICT = [];
    ICTforDisplay = [];    

    // bar
    public barTitle = "Top 10 Section 508 Compliant Agencies";
    public isGovernomentWide = true;
    public noData = true;    

    public nonCompliantICT = [];
    public compliantICT = [];
    // doughnut
    // solicitationType = {};   
    // public doughnutChartLabels:string[] = [];
    // public doughnutChartData:number[] = [];
    // public doughnutChartType:string = 'doughnut';
    // public datasets: any[];   


    constructor(
        private SolicitationService: SolicitationService,
        private router: Router
    ) { }

    // Analytic chart     

    //Change analytic color
    // colorsOverride: Array<Color> = [{
    //     backgroundColor: [
    //         "#2C81C0",
    //         "#53A9DE",
    //         "#77DDFC",
    //         "#DCEBF9",
    //     ],
    //     hoverBackgroundColor: [
    //         "#2C81C0",
    //         "#53A9DE",
    //         "#77DDFC",
    //         "#DCEBF9",
    //     ],
    // }];

    // barColorsOverride: Array<Color> = [
    //     { backgroundColor: ['#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0',] }, 
    //     { backgroundColor: ['#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE'] }, 
    // ];

    // events
    // public pieChartClicked(e:any):void {
    //     console.log(e);
    // }

    // public pieChartHovered(e:any):void {
    //     console.log(e);
    // }
  
    public agencyList:string[] = [];   

    // events
    // public chartClicked(e:any):void {
    //     console.log(e);
    // }

    // public chartHovered(e:any):void {
    //     console.log(e);
    // }    

    onChange(str)
    {
        this.selectedGovernment = str;   
        if (str == "Government-wide")
        {
            this.ICTforDisplay = this.ICT;
            this.isGovernomentWide = true;
            this.xAxis = "Agency";
        } 
        else
        {
            this.ICTforDisplay = this.ICT.filter(d => d.agency == str);
            this.isGovernomentWide = false;
            // Pre select for individaul agency
            if (this.selectedPeriod == "All") {
                this.selectedPeriod = "This Year";
                this.xAxis = "Month"
            }
            else if (this.selectedPeriod == "This Year") {
                this.xAxis = "Month"
            }
            else if (this.selectedPeriod == "This Month")
            {
                this.xAxis = "Date"
            }

        }
        this.GetTotalData();
    }
    
    onPeriodChange(str) {
        this.selectedPeriod = str;

        // Get time period to filter.
        switch(str)
        {
            case "This Year":
                this.formPeriod = new Date(new Date().getFullYear(), 0, 1);
                this.toPeriod = new Date(new Date().getFullYear(), 11, 31);
                break;
            case "This Month":
                this.formPeriod = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                this.toPeriod = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                break;
            case "This Week":
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6
                this.formPeriod = new Date(curr.setDate(first));
                this.toPeriod = new Date(curr.setDate(last));
                break;
            default:
                this.formPeriod = new Date(1900,0,1);
                this.toPeriod = new Date(2100,0,1);
                break;
        }
        
        this.GetTotalData();        
    }

    
    GetTotalData() 
    {

        this.nonCompliantICT = [];
        this.compliantICT = [];

        this.SolicitationService.getICT()
        .subscribe(
            solicitation => {   
                console.log(solicitation.length)                           
               this.ICT = solicitation.filter( d => d.eitLikelihood.value == "Yes" );
               // following variable will be affected by filter   
               this.ICTforDisplay =  solicitation.filter( d => d.eitLikelihood.value == "Yes" );

                // get total agency list
               this.agencyList = []; 
               var map = new Object();
               for (let item of this.ICTforDisplay) 
               {
                   if (!map.hasOwnProperty(item.agency))
                   {
                        map[item.agency] = item.agency;
                        this.agencyList.push(item.agency)
                   }
               }               
               this.agencyList.sort();    
              

               if (this.selectedGovernment != "Government-wide")  
               {
                    this.ICTforDisplay =  this.ICTforDisplay.filter( d => d.agency == this.selectedGovernment );   
               }
               
               var filteredData = [];
                for (let item of this.ICTforDisplay)
                {          
                    if (item.date != null)
                    {       
                        //var dateSpliiter = item.date.split('/');
                        var date = new Date(item.date);
                        // Filter by time
                        if (date > this.formPeriod && date < this.toPeriod)
                        {
                            filteredData.push(item);
                        }                   
                    }          
                } 
                this.ICTforDisplay = filteredData;                
                this.nonCompliantICT = this.ICTforDisplay.filter( d => d.predictions.value=="RED");
                this.compliantICT = this.ICTforDisplay.filter( d => d.predictions.value=="GREEN");

                this.noData = Object.keys(this.ICTforDisplay).length == 0;
            },
            err => {
                console.log(err);
        }); 
    }

    // Analytic get data
    ngOnInit() {    
        this.GetTotalData();        
    }    
      
    
   
}

