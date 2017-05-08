import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../shared/solicitation';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.css']
})
export class ResultsDetailComponent implements OnInit {
  emailBody: String = "";
  subject: String = "";
  emailTo: String = "";
  solicitation: Solicitation;
  private subscription: Subscription;
  private solicitationIndex: String;

  constructor(private solicitationService: SolicitationService,
              private route: ActivatedRoute,
              private router: Router) { }

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
              this.emailTo = "srttestuser@gmail.com";
              this.subject = "Solicitation " + this.solicitation.solNum + ": Action Requested";
              this.emailBody = "Solicitation Number: " + this.solicitation.solNum  + "\nURL: " + this.solicitation.url + "\nThis solicitation does not contain sufficient Section 508 Requirements.";
            },
            err => {
              console.log(err);
            });
        });

  }

  emailPoc(solicitation: any) {
    this.router.navigate(['/email', solicitation._id]);
  }

}
