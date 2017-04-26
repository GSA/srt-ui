import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../shared/solicitation';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.css']
})
export class ResultsDetailComponent implements OnInit {
  solicitation: Solicitation;
  private subscription: Subscription;
  private solicitationIndex: String;

  constructor(private solicitationService: SolicitationService, private route: ActivatedRoute) { }

  ngOnInit() {
    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.solicitationIndex = params['id'];
        // pull chosen solicitation from mongo
        this.solicitationService.getSolicitation(this.solicitationIndex)
          .subscribe(
            solicitation => {
              this.solicitation = solicitation;
            },
            err => {
              console.log(err);
            });
        });

  }

  emailContact(solicitation) {
    var emailContent = {
      text: "Solicitation has been reviewed.  Due to the solicitation dealing with ICT, it is required to be compliant with Section 508 Law.  Please modify the solicitation to inclue Section 508 requirements.",
      email: "srttestuser@gmail.com"
    }
    this.solicitationService.sendContactEmail(emailContent)
      .subscribe(
        msg => {
          console.log(msg);
        },
        err => {
          console.log(err);
        });
  }

}
