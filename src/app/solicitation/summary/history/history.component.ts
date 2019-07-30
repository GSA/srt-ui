import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() history;

  /* ATTRIBUTES */

  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: String;
  type: String = 'history';
  public step1:Boolean = false;
  public step2:Boolean = false;
  public step3:Boolean = false;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param solicitationService
   * @param router
   * @param route
   */
  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        var now = new Date().toLocaleDateString();
        this.solicitationID = params['id'];
        console.log(this.solicitationID);
        this.solicitationService.getSolicitation(this.solicitationID).subscribe(
          data => {
            data.parseStatus.forEach(element => {
                if (element.status == 'successfully parsed') element.status = 'Yes';
                else if (element.status == 'processing error')  element.status = 'No';
            });

            this.step1 = data.history.filter(function(e){
              return e['action'].indexOf('reviewed solicitation action requested summary') > -1;
            }).length > 0;
            this.step2 = data.history.filter(function(e){
              return e['action'].indexOf('sent email to POC') > -1;
            }).length > 0;
            this.step3 = data.history.filter(function(e){
              return e['action'].indexOf('provided feedback on the solicitation prediction result') > -1;
            }).length > 0;

            this.solicitation = data;

            this.history = data.history.sort(function(a, b){
              var dateA = new Date(String(a.date));
              var dateB = new Date(String(b.date));
              if (dateA > dateB) return 1;
              else if (dateA < dateB ) return -1;
              else return 0;
           });
          },
          err => console.log(err)
        )
      })
  }

  ngOnChanges() {
  }

}
