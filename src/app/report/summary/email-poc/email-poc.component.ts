import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import { Email } from './email';


@Component({
  selector: 'app-email-poc',
  templateUrl: './email-poc.component.html',
  styleUrls: ['./email-poc.component.css']
})
export class EmailPocComponent implements OnInit {
  @Input() emailTo: String;
  @Input() emailCC: String;
  @Input() subject: String;
  @Input() emailBody: String;
  myForm: FormGroup;
  solicitation: Solicitation;
  private subscription: Subscription;
  private solicitationIndex: String;

  constructor(private solicitationService: SolicitationService,
              private route: ActivatedRoute
) { }

  ngOnInit() {
    
    this.emailCC = localStorage.getItem("email");

    this.myForm = new FormGroup({
      emailTo: new FormControl("srttestuser@gmail.com", Validators.required),
      emailCC: new FormControl(this.emailCC , Validators.required),
      subject: new FormControl(this.subject, Validators.required),
      message: new FormControl(this.emailBody, Validators.required)
    });
    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.solicitationIndex = params['id'];
        // pull chosen solicitation from mongo
        this.solicitationService.getSolicitation(this.solicitationIndex)
          .subscribe(
            solicitation => {
              this.solicitation = solicitation;
              console.log("solicitation", this.solicitation);
            },
            err => {
              console.log(err);
            });
        });
  }

emailContact() {

    const emailContent = new Email(
      this.myForm.value.emailTo,
      this.myForm.value.subject,
      this.myForm.value.message,
      this.myForm.value.emailFrom,
      this.myForm.value.emailCC
    );

    var now = new Date().toLocaleDateString();
    var r = this.solicitation.history.push({'date': now, 'action': "Email Sent to PoC"});

    this.solicitationService.sendContactEmail(emailContent)
      .subscribe(
        msg => {
          console.log(msg);
        },
        err => {
          console.log(err);
        });

    this.solicitationService.updateHistory(this.solicitation)
      .subscribe(
        msg => {
          console.log(msg);
        },
        err => {
          console.log(err);
        });
  }

}
