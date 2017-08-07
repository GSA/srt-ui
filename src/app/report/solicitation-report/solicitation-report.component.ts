import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../../solicitation.service';
import { SelectItem } from 'primeng/primeng';
import * as $ from 'jquery';


@Component({
  selector: 'app-solicitation-report',
  templateUrl: './solicitation-report.component.html',
  styleUrls: ['./solicitation-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SolicitationReportComponent implements OnInit {

  solicitations: any[];
  solicitation = {};
  ict: SelectItem[] = [];
  solType: SelectItem[] = [];
  revResult: SelectItem[] = [];
  
  
  dateSorting:number = 1;
  stacked:Boolean = false;  
  
  dateFrom:Date;
  dateTo:Date;
  today:Date = new Date();
  maxDate:Date = new Date();;
  minDate:Date;

  dateScan: String = "";

  filterParams = {
      agency: '',
      office: '',
      contact: '',
      eitLikelihood: '',
      numDocs: '',
      reviewStatus: '',
      reviewRec: '',
    };

  constructor(
    private solicitationService: SolicitationService,
    private router: Router
  ) { }

  ngOnInit() {
    
    // Mobile responsive
    this.stacked = window.matchMedia("(max-width: 992px)").matches

    this.initFilterParams();

    // Cache Data
    if (!this.solicitationService.solicitations || this.solicitationService.reloadSolicitations)
    {
      this.solicitationService.getFilteredSolicitations(this.filterParams)
        .subscribe(
            solicitations => {          
              this.solicitations = solicitations;
              this.solicitationService.solicitations = solicitations;
              this.solicitationService.reloadSolicitations = false;

              this.solicitations = this.solicitations.sort(
                function(a,b){
                  var aDate = new Date(a.date);
                  var bDate = new Date(b.date);            
                  if (aDate > bDate) return -1;
                  else if (aDate < bDate) return 1;
                  else return 0;
                }                
              )
              
              this.dateScan = this.solicitations[0].date;
              $('.pDataTable').show();
              // sorting
              this.solicitations = this.sortByReviewResult(this.solicitations)
              this.getNoticeTypes(this.solicitations);
            },
            err => {
                console.log(err);
        });
    }
    else
    {
      // sorting
      this.solicitations = this.sortByReviewResult(this.solicitationService.solicitations)
      this.getNoticeTypes(this.solicitationService.solicitations);
      this.dateScan = this.solicitations[0].date;      
    }
    
    // do I still need this?
    // this.solicitationService.pushedSolicitations.subscribe(
    //   solicitations => this.solicitations = solicitations);

    this.ict.push({label: 'All', value: null});
    this.ict.push({label: 'Yes', value: 'Yes'});
    this.ict.push({label: 'No', value: 'No'});
    
    this.revResult.push({label: 'All', value: null});
    this.revResult.push({label: 'Non-compliant (Action Required)', value: "Non-compliant (Action Required)"});
    this.revResult.push({label: 'Undetermined', value: 'Undetermined'});
    this.revResult.push({label: 'Compliant', value: "Compliant"});


  }

  // set initial params based upon logged in user
  initFilterParams() {
    var agency = localStorage.getItem("agency");
    if (agency == "General Services Administration"){
      this.filterParams.agency = "";
    } else {
      this.filterParams.agency = localStorage.getItem("agency");
    }
  }

  // Manual review button kicks this off.  navigates to solicitation review page
  selectSol(solicitation: any) {
    var now = new Date().toLocaleDateString();
    var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    var r = solicitation.history.push({'date': now, 'action': "reviewed solicitation action requested summary", 'user': user, 'status' : ''});
    
    this.solicitationService.updateHistory(solicitation)
        .subscribe(
            msg => {
              // console.log(msg);
              this.router.navigate(['/report', solicitation._id]);              
            },
            err => {
              console.log(err);
        });
  }


  sortByReviewResult(solicitations) {    
    var Undetermined = solicitations.filter(d => d.reviewRec == 'Undetermined');
    var Noncompliant = solicitations.filter(d => d.reviewRec == 'Non-compliant (Action Required)');
    var Compliant = solicitations.filter(d => d.reviewRec == 'Compliant');
    solicitations = Noncompliant.concat(Compliant).concat(Undetermined);
    return solicitations;
  }

  getNoticeTypes(solicitations) {
    var noticeTypeMap = {};
    if ( solicitations)
    {
      solicitations.forEach(element => {        
        var noticeTypelabel:String = element.noticeType;
        var noticeTypevalue:String = element.noticeType;
        var noticeCount:Number = 1;
        if (noticeTypeMap.hasOwnProperty(element.noticeType))
        {          
          noticeCount =  noticeTypeMap[element.noticeType].count+1;
          noticeTypeMap[element.noticeType] = {label: noticeTypelabel, value: noticeTypevalue, count: noticeCount};
        }
        else
        {                    
          noticeCount = 1;
          noticeTypeMap[element.noticeType] = {label: noticeTypelabel, value: noticeTypevalue, count: noticeCount};
        }        
      });  
        
      this.solType = [];
      this.solType.push({label: 'Any', value: null});
      for (var k in noticeTypeMap) {
        this.solType.push({label: noticeTypeMap[k].label + ' (' +  noticeTypeMap[k].count + ')', value: noticeTypeMap[k].label});
      }
    }
  }

  filterDate(event) {
     if (this.dateFrom && this.dateTo) {
        this.minDate = this.dateFrom;
        this.maxDate = this.dateTo;
        this.solicitations = this.solicitationService.solicitations.filter(
          d => {
             var dDate = new Date(d.date);      
             return dDate >= this.dateFrom && dDate <= this.dateTo;      
          }
        )   
        this.getNoticeTypes(this.solicitations);
     }  
  }
    
  reset() {
    if(!this.dateFrom && !this.dateTo)
    {
      this.solicitations = this.solicitationService.solicitations
    }
  }
    
  soryByDate(event:any) {     
    if (this.dateSorting != event.order)
    {
        this.dateSorting = event.order;
        this.solicitations = this.solicitations.sort(
          function(a,b){
            var aDate = new Date(a.date);
            var bDate = new Date(b.date);    
                    
            if (aDate > bDate) return -1 * event.order;
            else if (aDate < bDate) return 1 * event.order;
            else return 0 * event.order;
          }                
        )
    }
    this.getNoticeTypes(this.solicitations);
  }

}
