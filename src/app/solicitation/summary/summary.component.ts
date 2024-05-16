import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { SolicitationService } from '../solicitation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() solicitationID;
  @Input() step1;
  @Input() step2;
  @Input() step3;
  @Input() type;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param solicitationService
   * @param route
   * @param router
   */
  constructor(
    private solicitationService: SolicitationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * lifecycle
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    // console.log(this.solicitationID);
  }
}
