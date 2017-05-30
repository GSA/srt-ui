import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../solicitation.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {ChartsModule, Color} from 'ng2-charts/ng2-charts';

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
    
    
    ICT = [];
    ICTforDisplay = [];

    // bar
    barData = [];
    angencyTotal = {}
    angencyPass = {}
    angency = {};
    public indexFrom = 0;
    public indexTo = 10;
    public maxSolicitation:number = 0;
    public barTitle = "Top 10 Section 508 Compliant Agencies";
    public isGovernomentWide = true;
    public noData = false;

    // doughnut
    solicitationType = {};   
    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';
    public datasets: any[];   


    // overview
    public reviewed:number;
    public emailSend: number;

    constructor(
        private SolicitationService: SolicitationService,
        private router: Router
    ) { }

    // Analytic chart     

    //Change analytic color
    colorsOverride: Array<Color> = [{
        backgroundColor: [
            "#2C81C0",
            "#53A9DE",
            "#77DDFC",
            "#DCEBF9",
        ],
        hoverBackgroundColor: [
            "#2C81C0",
            "#53A9DE",
            "#77DDFC",
            "#DCEBF9",
        ],
    }];

    barColorsOverride: Array<Color> = [
        { backgroundColor: ['#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0', '#2C81C0',] }, 
        { backgroundColor: ['#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE', '#53A9DE'] }, 
    ];

    // events
    public pieChartClicked(e:any):void {
        console.log(e);
    }

    public pieChartHovered(e:any):void {
        console.log(e);
    }
  
    public agencyList:string[] = [];   

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }    

    onChange(str)
    {
        this.selectedGovernment = str;   
        if (str == "Government-wide")
        {
            this.ICTforDisplay = this.ICT;
            this.isGovernomentWide = true;
        } 
        else
        {
            this.ICTforDisplay = this.ICT.filter(d => d.agency == str);
            this.isGovernomentWide = false;
            // Pre select for individaul agency
            if (this.selectedPeriod == "All") this.selectedPeriod = "This Year";
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
        console.log(this.formPeriod.toLocaleDateString());
        console.log(this.toPeriod.toLocaleDateString());


        this.GetTotalData();
        
    }

    GetDoughnutChart()
    {        
        // Doughnut Chart
        this.doughnutChartLabels= [];
        this.doughnutChartData = [];
        this.doughnutChartType= 'doughnut';
        this.solicitationType = {};
        /*   Doughnut Chart   */                
        for (let item of this.ICTforDisplay)
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
        this.forceChartRefresh();        
    }   

    GetAbbr(name)
    {        
        if (name == "Department of the Air Force") return "DAF";
        else if (name == "Defense Information Systems Agency") return "DISA";
        else if (name == "Securities and Exchange Commission") return "SEC";
        else if (name == "Department of the Interior") return "DOI";
        else if (name == "Department of the Navy") return "DoN";
        else if (name == "Legal Services Corporation") return "LSC";
        else if (name == "Department of the Army") return "DA";
        else if (name == "Defense Logistics Agency") return "DLA";
        else if (name == "Other Defense Agencies") return "Other Defense Agencies";
        else if (name == "Department of Transportation") return "DOT";
        else if (name == "Department of Homeland Security") return "DHS";
        else if (name == "Department of Veterans Affairs") return "DVA";    
        else if (name == "United States International Trade Commission") return "USITC";
        else if (name == "1" && this.selectedPeriod == "This Year") return "Jan.";
        else if (name == "2" && this.selectedPeriod == "This Year") return "Feb.";
        else if (name == "3" && this.selectedPeriod == "This Year") return "Mar.";
        else if (name == "4" && this.selectedPeriod == "This Year") return "Apr.";
        else if (name == "5" && this.selectedPeriod == "This Year") return "May";
        else if (name == "6" && this.selectedPeriod == "This Year") return "Jun.";
        else if (name == "7" && this.selectedPeriod == "This Year") return "Jul.";
        else if (name == "8" && this.selectedPeriod == "This Year") return "Aug.";
        else if (name == "9" && this.selectedPeriod == "This Year") return "Sep.";
        else if (name == "10" && this.selectedPeriod == "This Year") return "Oct.";
        else if (name == "11" && this.selectedPeriod == "This Year") return "Nov.";
        else if (name == "12" && this.selectedPeriod == "This Year") return "Dec.";
        else return name;
    }

    GetBarChart()
    {
        /*   Bar Chart   */
        
        this.angencyTotal = {};
        this.angencyPass = {};
        this.maxSolicitation = 0;
        this.barData = [];
        if (this.selectedGovernment == "Government-wide")
        {   
            this.indexFrom = 0;
            this.indexTo = 10;
            this.barTitle = "Top 10 Section 508 Compliant Agencies";
            debugger
            // Filter by date      
            for (let item of this.ICTforDisplay)
            {   
                // Gathering data by noticeType
                if (this.angencyTotal[item.agency] == null)
                {                        
                    this.angencyTotal[item.agency] = 1;
                    if (item.predictions.value == "GREEN") this.angencyPass[item.agency] = 1;  
                    else this.angencyPass[item.agency] = 0; 

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
                    this.barData.push([key, 0, this.angencyPass[key], this.angencyTotal[key]]);                
                }
                else
                {
                    this.barData.push([key, this.angencyPass[key] / this.angencyTotal[key], this.angencyPass[key], this.angencyTotal[key]]);
                }              
                if (this.maxSolicitation <= this.angencyTotal[key]) this.maxSolicitation = this.angencyTotal[key];            
                
            }


            // Sorting by rate        
            this.barData.sort(function(a, b) {
                if (b[1] > a[1])
                {
                    return 1;
                }
                else if (b[1] < a[1])
                {
                    return -1;
                }
                else if (b[1] == a[1])
                {
                    if (b[3] > a[3])
                    {
                        return 1;
                    }
                    else if (b[3] < a[3])
                    {
                        return -1;
                    }
                }
            });   
           
        }
        else
        {    
            // Chagne year x-axis format
            if (this.selectedPeriod == "This Year" || this.selectedPeriod =="All")
            {
                this.indexFrom = 1;
                this.indexTo = 13;
                this.barTitle = this.selectedGovernment;
                // Filter by year and agency                
                for (let item of this.ICTforDisplay)
                {  
                    if (item.date != null)
                    {
                        var month = +item.date.split('/')[0];                
                        if (this.angencyTotal[month] == null)
                        {
                            this.angencyTotal[month] = 1;
                            if (item.predictions.value == "GREEN") this.angencyPass[month] = 1;  
                            else this.angencyPass[month] = 0; 
                        }  
                        else {
                            this.angencyTotal[month]++;
                            if (item.predictions.value == "GREEN") this.angencyPass[month]++;
                        }  
                    }
                }

                for (var i = 0;  i < 13; i ++)
                {
                    if (this.angencyPass[i] == null) {
                        this.barData.push([i, 0, 0, 0]);  
                    }
                    else
                    {
                        this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
                    }
                    if (this.maxSolicitation <= this.angencyTotal[i]) this.maxSolicitation = this.angencyTotal[i];     
                }
                
            }
            else if (this.selectedPeriod == "This Month") 
            {
                this.indexFrom = 1;                
                this.indexTo = this.toPeriod.getDate() + 1;
                
                this.barTitle = this.selectedGovernment;
                // Filter by year and agency                
                for (let item of this.ICTforDisplay)
                {  
                    if (item.date != null)
                    {
                        var date = +item.date.split('/')[1];                
                        if (this.angencyTotal[date] == null)
                        {
                            this.angencyTotal[date] = 1;
                            if (item.predictions.value == "GREEN") this.angencyPass[date] = 1;  
                            else this.angencyPass[date] = 0; 
                        }  
                        else {
                            this.angencyTotal[date]++;
                            if (item.predictions.value == "GREEN") this.angencyPass[date]++;
                        }  
                    }
                }
                
                for (var i = 0;  i < this.indexTo + 1; i ++)
                {
                    if (this.angencyPass[i] == null) {
                        this.barData.push([i, 0, 0, 0]);  
                    }
                    else
                    {
                        this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
                    }
                    if (this.maxSolicitation <= this.angencyTotal[i]) this.maxSolicitation = this.angencyTotal[i];     
                }
            }
            
            

        }
        
    }

    GetOverview()
    {
        this.solicitationNumber = this.ICTforDisplay.length;   
        var reviewedSolicitation = this.ICTforDisplay.filter(function(d){
             return (d.history.filter(function(e){return e["action"] == 'Reviewed Action Requested Summary'}).length > 0)
        });
        this.reviewed = reviewedSolicitation.length;
        var emailSentSolicitation = this.ICTforDisplay.filter(function(d){
             return (d.history.filter(function(e){return e["action"] == 'Email Sent to PoC'}).length > 0)
        });
        this.emailSend = emailSentSolicitation.length;
        debugger
    }


    GetTotalData() 
    {
        this.SolicitationService.getData()
        .subscribe(
            solicitation => {  
                
            
               this.ICT = solicitation.filter( d => d.eitLikelihood.value == "Yes" );       
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
                this.noData = Object.keys(this.ICTforDisplay).length == 0;



               console.log(this.ICTforDisplay);
                // ICT Solicitation        
                this.GetOverview();
                this.GetBarChart();
                this.GetDoughnutChart();   
            },
            err => {
                console.log(err);
        }); 
    }

    // Analytic get data
    ngOnInit() {    
        
        this.GetTotalData();        
    }    
      
    
    // refresh the charts
    forceChartRefresh() {
        setTimeout(() => {
            this.baseChart.refresh();
        }, 10);
    }
}

