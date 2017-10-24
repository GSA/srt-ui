import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

import { SolicitationService } from '../solicitation/solicitation.service';
import { Solicitation } from '../shared/solicitation';

@Component({
  selector: 'app-solicitation-review',
  templateUrl: './solicitation-review.component.html',
  styleUrls: ['./solicitation-review.component.css']
})
export class SolicitationReviewComponent implements OnInit {

  /* ATTRIBUTES */

  public solicitation = [];
  private subscription: Subscription;
  private solicitationIndex: String;

  public choices = [
    { value: 'Yes', display: 'Yes'},
    { value: 'No', display: 'No'}
  ];

	public review = {
		eit: '',
		standards: '',
		v_conformance: '',
		evaluation: '',
		a_conformance: '',
		comments: ''
	};

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param solicitationService
   * @param route
   */
  constructor(
    private solicitationService: SolicitationService,
    private route: ActivatedRoute
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.subscription = this.route.params.subscribe (
      (params: any) => {
      this.solicitationIndex = params['id'];
      this.solicitationService.getSolicitation(this.solicitationIndex)
      .subscribe(
        solicitation => {
          this.solicitation.push(solicitation);
      },
      err => {
      });
    });
  }

}
