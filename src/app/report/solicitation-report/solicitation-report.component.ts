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

    this.solicitationService.getFilteredSolicitations(this.filterParams)
    .subscribe(
        solicitations => {
          this.solicitations = solicitations;
        },
        err => {
            console.log(err);
        });
        //do I still need this?
  this.solicitationService.pushedSolicitations.subscribe(
    solicitations => this.solicitations = solicitations);

  this.ict.push({label: 'All', value: null});
  this.ict.push({label: 'Yes', value: 'Yes'});
  this.ict.push({label: 'No', value: 'No'});

  this.solType.push({label: 'All', value: null});
  this.solType.push({label: 'Combined Synopsis/Solicitation', value: 'Combined Synopsis/Solicitation'});
  this.solType.push({label: 'Presolicitation', value: 'Presolicitation'});
  this.solType.push({label: 'Sources Sought', value: 'Sources Sought'});
  this.solType.push({label: 'Special Notice', value: 'Special Notice'});


  this.revResult.push({label: 'All', value: null});
  this.revResult.push({label: 'Action Requested', value: 'RED'});
  this.revResult.push({label: 'Pass', value: 'GREEN'});
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

    this.router.navigate(['/report', solicitation._id]);

  }

}
