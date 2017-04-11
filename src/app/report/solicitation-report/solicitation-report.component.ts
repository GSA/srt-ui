import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../../solicitation.service';
import { SelectItem } from 'primeng/primeng';


@Component({
  selector: 'app-solicitation-report',
  templateUrl: './solicitation-report.component.html',
  styleUrls: ['./solicitation-report.component.css']
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
      isReadable: '',
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
  this.solicitationService.pushedSolicitations.subscribe(
    solicitations => this.solicitations = solicitations);
  this.ict.push({label: 'All', value: null});
  this.ict.push({label: 'Yes', value: 'Yes'});
  this.ict.push({label: 'No', value: 'No'});

  this.solType.push({label: 'All', value: null});
  this.solType.push({label: 'COMBINE', value: 'COMBINE'});
  this.solType.push({label: 'PRESOL', value: 'PRESOL'});
  this.solType.push({label: 'SRCSGT', value: 'SRCSGT'});

  this.revResult.push({label: 'All', value: null});
  this.revResult.push({label: 'Red', value: 'RED'});
  this.revResult.push({label: 'Green', value: 'GREEN'});
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
