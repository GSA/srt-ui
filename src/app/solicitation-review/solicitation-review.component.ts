import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

import { SolicitationService } from '../solicitation.service';
import { Solicitation } from '../shared/solicitation';

@Component({
  selector: 'app-solicitation-review',
  templateUrl: './solicitation-review.component.html',
  styleUrls: ['./solicitation-review.component.css']
})
export class SolicitationReviewComponent implements OnInit {

  solicitation = [];
  private subscription: Subscription;
  private solicitationIndex: String;

  // radio button choices
  choices = [
    {value: 'Yes', display: 'Yes'},
    {value: 'No', display: 'No'}
  ];
// initialize radio choices
	review = {
		eit: '',
		standards: '',
		v_conformance: '',
		evaluation: '',
		a_conformance: '',
		comments: ''
	};

  constructor( private solicitationService: SolicitationService, private route: ActivatedRoute ) { }

  ngOnInit() {
    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    this.subscription = this.route.params.subscribe(
      (params: any) => {
    this.solicitationIndex = params['id'];
    // pull chosen solicitation from mongo
    console.log("solicitation index: ", this.solicitationIndex);
    this.solicitationService.getSolicitation(this.solicitationIndex)
      .subscribe(
        solicitation => {
          this.solicitation.push(solicitation);
          console.log(this.solicitation);
      },
      err => {
          console.log(err);
      });
    });
  }

}
