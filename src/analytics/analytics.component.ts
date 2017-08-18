import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';

import { TooltipModule } from "ng2-tooltip";

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
        private AnalyticsService: AnalyticsService,
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
        var userRole = localStorage.getItem("userRole");

        if (agency == '' ||  
          (agency.indexOf("General Services Administration") > -1 && ( userRole.indexOf('Administrator') > -1 || userRole.indexOf('SRT Program Manager') > -1))   
        )
        {
            this.AnalyticsService.GetAgencyList()
            .subscribe(
                data => {
                    this.agencyList = data;
                },
                err => {
                }
            )
        }
        else
        {
            agency = agency.split(' (')[0];
            this.agencyList = [agency];
        }
        
    }

    convertDate(date: Date) {        
        return  date.getMonth() + 1  + "/" + date.getDate() +"/"+ date.getFullYear()
    }

    GetTotalData() 
    {        
        this.params = {
            fromPeriod: this.convertDate(this.formPeriod),
            toPeriod: this.convertDate(this.toPeriod),
            agency: this.selectedGovernment
        }
        console.log(this.params);

        this.AnalyticsService.getAnalytics(this.params)
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
                // if (this.selectedGovernment == "Government-wide" && this.selectedPeriod == "All")
                // {
                //     this.AnalyticsService.analytics = data;
                // }
                this.filterActionChange = false;
            },
            err => {
            }
        )
    }

    // Analytic get data
    ngOnInit() {    
        this.GetAgencyList();
        this.GetTotalData();  
    }    
      

    go(id) {
        this.router.navigateByUrl('faq', id);
        
    }
    
   
}

