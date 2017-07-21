import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../../solicitation.service';
import { SelectItem } from 'primeng/primeng';


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
  multiSortMeta: any[];

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
              
              // sorting
              this.solicitations = this.sortByReviewResult(this.solicitations)
            },
            err => {
                console.log(err);
        });
    }
    else
    {
      // sorting
      this.solicitations = this.sortByReviewResult(this.solicitationService.solicitations)
    }
    
        //do I still need this?
    this.solicitationService.pushedSolicitations.subscribe(
      solicitations => this.solicitations = solicitations);

    this.ict.push({label: 'All', value: null});
    this.ict.push({label: 'Yes', value: 'Yes'});
    this.ict.push({label: 'No', value: 'No'});


    this.solType.push({label: 'Any', value: null});
    this.solType.push({label: 'Award Notice', value: 'Award Notice'});
    this.solType.push({label: 'Combined Synopsis / Solicitation', value: 'Combined Synopsis / Solicitation'});
    this.solType.push({label: 'Fair Opportunity / Limited Sources Justification / Cancelled', value: 'Fair Opportunity / Limited Sources Justification / Cancelled'});
    this.solType.push({label: 'Foreign Government Standard', value: 'Foreign Government Standard'});
    //this.solType.push({label: 'Intent to Bundle Requirements(DoD-Funded)', value: 'Intent to Bundle Requirements(DoD-Funded)'});
    this.solType.push({label: 'Justification and Approval(J&A)', value: 'Justification and Approval(J&A)'});
    this.solType.push({label: 'Modification/Amendment/Cancel', value: 'Modification/Amendment/Cancel'});
    this.solType.push({label: 'Presolicitation', value: 'Presolicitation'});
    this.solType.push({label: 'Sale of Surplus Property', value: 'Sale of Surplus Property'});
    this.solType.push({label: 'Special Notice', value: 'Special Notice'});
    // this.solType.push({label: 'Sources Sought', value: 'Sources Sought'});


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
    console.log("selected sol is ",solicitation);
    var now = new Date().toLocaleDateString();
    var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    var r = solicitation.history.push({'date': now, 'action': "reviewed solicitation action requested summary", 'user': user, 'status' : ''});
    
    this.solicitationService.updateHistory(solicitation)
        .subscribe(
            msg => {
              console.log(msg);
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

  // soryByDate(event) {
  //   var moment
  //    let comparer = function (a, b): number {
  //      debugger
  //     let formatedA = moment(a.date, "DD.MM.YYYY").format('YYYY-MM-DD');
  //     let formatedB = moment(b.date, "DD.MM.YYYY").format('YYYY-MM-DD');
  //     let result: number = -1;

  //     if (moment(formatedB).isBefore(formatedA, 'day')) result = 1;
  //     return result * event.order;
  //   };

  //   //this.appointments.sort(comparer);
  //     //event.field = Field to sort
  //     //event.order = Sort order
  // }

}
