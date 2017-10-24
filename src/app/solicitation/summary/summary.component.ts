import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../solicitation.service';
import { Solicitation } from '../../shared/solicitation';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
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
  ngOnChanges() {
    console.log(this.solicitationID)
  }
}
