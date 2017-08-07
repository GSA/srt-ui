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
    public formPeriod:Date = new Date(1900, 0, 1);
    public toPeriod:Date = new Date(2100, 11, 31);
    public xAxis = "Agency";
    
    ICT = [];
    ICTforDisplay = [];    

    // bar
    public barTitle = "Top 10 Section 508 Compliant Agencies";
    public isGovernomentWide = true;
    // public noData = true;    

    // data
    // public nonCompliantICT = [];
    // public compliantICT = [];
    // public updatedICT = [];
    // public updatedNonCompliantICT = [];
    // public updatedCompliantICT = [];
    // public undeterminedICT = [];




    // redo
    public params = {};
    public ScannedSolicitationChart = null;
    public MachineReadableChart = null;
    public ComplianceRateChart = null;
    public ConversionRateChart = null;
    public TopSRTActionChart = null;
    public TopAgenciesChart = null;       
    public PredictResultChart = null;
    public UndeterminedSolicitationChart = null;
    public filterActionChange = false;

    constructor(
        private SolicitationService: SolicitationService,
        private router: Router
    ) { }
  
    public agencyList:string[] = [];         

    onChange(str)
    {
        this.selectedGovernment = str;  
        this.filterActionChange = true; 
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
        this.filterActionChange = true;
        // Get time period to filter.
        switch(str)
        {
            case "This Year":
                this.formPeriod = new Date(new Date().getFullYear(), 0, 1);
                this.toPeriod = new Date(new Date().getFullYear(), 11, 31);
                this.xAxis = "Month";
                break;
            case "This Month":
                this.formPeriod = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                this.toPeriod = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                this.xAxis = "Date";
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

        if (this.selectedGovernment == "Government-wide") this.xAxis = "Agency";

        
        this.GetTotalData();        
    }

    // Get Agencies list for dropdown
    GetAgencyList() {
        var agency = localStorage.getItem("agency");
        if (agency == '' || agency.indexOf('General Services Administration') > -1)
        {
            this.SolicitationService.GetAgencyList()
            .subscribe(
                data => {
                    this.agencyList = data;
                },
                err => {
                    console.log(err);
                }
            )
        }
        else
        {
            agency = agency.split(' (')[0];
            this.agencyList = [agency];
        }
        
    }


    GetTotalData() 
    {
        this.params = {
            fromPeriod: this.formPeriod.toLocaleDateString(),
            toPeriod: this.toPeriod.toLocaleDateString(),
            agency: this.selectedGovernment
        }

        
        if ((!this.SolicitationService.analytics.ScannedSolicitationChart &&
            !this.SolicitationService.analytics.MachineReadableChart &&
            !this.SolicitationService.analytics.ComplianceRateChart &&
            !this.SolicitationService.analytics.ConversionRateChart &&
            !this.SolicitationService.analytics.TopSRTActionChart &&
            !this.SolicitationService.analytics.TopAgenciesChart &&
            !this.SolicitationService.analytics.PredictResultChart && 
            !this.SolicitationService.analytics.UndeterminedSolicitationChart) || this.filterActionChange )
        {
             this.SolicitationService.getAnalytics(this.params)
                .subscribe(
                    data => {
                        this.ScannedSolicitationChart = data.ScannedSolicitationChart;
                        this.MachineReadableChart = data.MachineReadableChart;
                        this.ComplianceRateChart = data.ComplianceRateChart;
                        this.ConversionRateChart = data.ConversionRateChart;
                        this.TopSRTActionChart = data.TopSRTActionChart;
                        this.TopAgenciesChart = data.TopAgenciesChart;
                        this.PredictResultChart = data.PredictResultChart;
                        this.UndeterminedSolicitationChart = data.UndeterminedSolicitationChart;
                        // only cached total data
                        if (this.selectedGovernment == "Government-wide" && this.selectedPeriod == "All")
                        {
                            this.SolicitationService.analytics = data;
                        }
                        this.filterActionChange = false;
                        console.log(data);
                    },
                    err => {
                        console.log(err);
                    }
                )
        }
        else
        {
            this.ScannedSolicitationChart = this.SolicitationService.analytics.ScannedSolicitationChart;
            this.MachineReadableChart = this.SolicitationService.analytics.MachineReadableChart;
            this.ComplianceRateChart = this.SolicitationService.analytics.ComplianceRateChart;
            this.ConversionRateChart = this.SolicitationService.analytics.ConversionRateChart;
            this.TopSRTActionChart = this.SolicitationService.analytics.TopSRTActionChart;
            this.TopAgenciesChart = this.SolicitationService.analytics.TopAgenciesChart;
            this.PredictResultChart = this.SolicitationService.analytics.PredictResultChart;
            this.UndeterminedSolicitationChart = this.SolicitationService.analytics.UndeterminedSolicitationChart;
        }


       
        // this.SolicitationService.getICT()
        // .subscribe(
        //     solicitation => {   
        //         console.log(solicitation.length)                           
        //        this.ICT = solicitation.filter( d => d.eitLikelihood.value == "Yes" );
        //        // following variable will be affected by filter   
        //        this.ICTforDisplay =  solicitation.filter( d => d.eitLikelihood.value == "Yes" );

        //         // get total agency list
        //        this.agencyList = []; 
        //        var map = new Object();
        //        for (let item of this.ICTforDisplay) 
        //        {
        //            if (!map.hasOwnProperty(item.agency))
        //            {
        //                 map[item.agency] = item.agency;
        //                 this.agencyList.push(item.agency)
        //            }
        //        }               
        //        this.agencyList.sort();    
              

        //        if (this.selectedGovernment != "Government-wide")  
        //        {
        //             this.ICTforDisplay =  this.ICTforDisplay.filter( d => d.agency == this.selectedGovernment );   
        //        }
               
        //        var filteredData = [];
        //         for (let item of this.ICTforDisplay)
        //         {          
        //             if (item.date != null)
        //             {       
        //                 //var dateSpliiter = item.date.split('/');
        //                 var date = new Date(item.date);
        //                 // Filter by time
        //                 if (date > this.formPeriod && date < this.toPeriod)
        //                 {
        //                     filteredData.push(item);
        //                 }   
        //                 else {
        //                     console.log(item.solNum);
        //                 }               
        //             }   
        //             else
        //             {
        //                 console.log(item.solNum);
        //             }      
        //         } 
        //         this.undeterminedICT = filteredData.filter(d => d.undetermined == true);
        //         
        //         // get rid of undetermined results.
        //         this.ICTforDisplay = filteredData.filter(d => d.undetermined == false);  
                
        //         this.updatedICT = this.ICTforDisplay.filter(d => d.history.filter(function(e){return e["action"].indexOf('Solicitation Updated on FBO.gov') > -1 }).length > 0)
        //         this.nonCompliantICT = this.ICTforDisplay.filter( d => d.predictions.value=="RED");     
        //         this.compliantICT = this.ICTforDisplay.filter( d => d.predictions.value=="GREEN");
        //         this.updatedNonCompliantICT = this.nonCompliantICT.filter(d => d.history.filter(function(e){return e["action"].indexOf('Solicitation Updated on FBO.gov') > -1 }).length > 0)
        //         this.updatedCompliantICT = this.compliantICT.filter(d => d.history.filter(function(e){return e["action"].indexOf('Solicitation Updated on FBO.gov') > -1 }).length > 0)
                
        //         this.noData = Object.keys(this.ICTforDisplay).length == 0;

        //     },
        //     err => {
        //     }
        // ); 
    }

    // Analytic get data
    ngOnInit() {    
        this.GetAgencyList();
        this.GetTotalData();  
    }    
      
    
   
}

