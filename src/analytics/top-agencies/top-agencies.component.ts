import { Component, OnInit, Input } from '@angular/core';

import {TooltipModule} from "ng2-tooltip";
import * as $ from 'jquery';
import * as _ from 'underscore';

@Component({
  selector: 'app-top-agencies',
  templateUrl: './top-agencies.component.html',
  styleUrls: ['./top-agencies.component.css']
})
export class TopAgenciesComponent implements OnInit {

    @Input() isGovernomentWide:Boolean;
    @Input() TopAgenciesChart;
    @Input() selectedGovernment;
    @Input() barTitle; 
    @Input() selectedPeriod;
    @Input() toPeriod;
    @Input() fromPeriod;
    @Input() xAxis;

    barData = [];
    angencyTotal = {}
    angencyPass = {}
    angency = {};
    public xAxisUnit = 5;
    public xAxisBreakPoint = [];
    public indexFrom = 0;
    public indexTo = 10;
    public maxSolicitation:number = 0;
    public noData:Boolean = true;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(){
        /*   Bar Chart   */

        if (this.TopAgenciesChart)
        {
            this.angencyTotal = {};
            this.angencyPass = {};
            this.maxSolicitation = 0;
            this.barData = [];
            if (this.selectedGovernment == "Government-wide")
            {   
                this.indexFrom = 0;
                this.indexTo = 10;
                this.barTitle = "Top 10 Section 508 Compliant Agencies";          

                // Insert data to the chart
                for (var key in this.TopAgenciesChart.topAgencies) {                     
                    this.barData.push(
                        [ key, 
                          this.TopAgenciesChart.topAgencies[key]["green"] / (this.TopAgenciesChart.topAgencies[key]["green"] + this.TopAgenciesChart.topAgencies[key]["red"]),
                          this.TopAgenciesChart.topAgencies[key]["green"],
                          (this.TopAgenciesChart.topAgencies[key]["green"] + this.TopAgenciesChart.topAgencies[key]["red"])
                        ]);
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
                
                var i = this.indexFrom;
                this.barData.forEach(element => {
                    if (i < this.indexTo)
                        if (this.maxSolicitation <= element[3]) 
                            this.maxSolicitation = element[3];  
                    i++
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
                    for (let item of this.TopAgenciesChart.topAgencies[this.selectedGovernment])
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
                    for (let item of this.TopAgenciesChart.topAgencies[this.selectedGovernment])
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

            this.noData = Object.keys(this.TopAgenciesChart).length == 0;
        }
            
        
        
        

        var remain = this.maxSolicitation % this.xAxisUnit;
        this.maxSolicitation = remain != 0 ? (this.maxSolicitation - remain + this.xAxisUnit) :  this.maxSolicitation;
        var a = this.maxSolicitation / this.xAxisUnit;
        this.xAxisBreakPoint = _.range(a + 1);        
        
    }


    public GetAbbr(name)
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
        else if (name == "Department of Health and Human Services") return "HHS";
        else if (name == "Department of Commerce") return "DOC";
        else if (name == "Department of Labor") return "DOL";
        else if (name == "National Aeronautics and Space Administration") return "NASA";
        else if (name == "Library of Congress") return "LOC";
        else if (name == "Department of the Treasury") return "Treasury";
        else if (name == "Consumer Financial Protection Bureau") return "CFPB";
        else if (name == "Department of Education") return "ED";
        else if (name == "Pension Benefit Guaranty Corporation") return "PBGC";
        else if (name == "Department of State") return "DOS";
        else if (name == "General Services Administration") return "GSA";
        else if (name == "Millennium Challenge Corporation") return "MCC";
        else if (name == "Office of Personnel Management") return "OPM"
        else if (name == "National Archives and Records Administration") return "NARA";
        else if (name == "Export - Import Bank of the United States") return "EXIM";
        else if (name == "Department of Justice") return "DOJ";
        else if (name == "Social Security Administration") return "SSA";
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
}
