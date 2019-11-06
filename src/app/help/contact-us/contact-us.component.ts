import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../../solicitation/solicitation.service';
import { Solicitation } from '../../shared/solicitation';

import { Email } from '../../solicitation/summary/email-poc/email';
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */

  emailBody: String;
  emailCC: String;
  emailSent: Boolean = false;
  emailTo: String;
  myForm: FormGroup;
  subject: String;
  type: String = 'email';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param solicitationService
   */
  constructor(
    private solicitationService: SolicitationService,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Contact Us';
  }

  /**
   * angular lifecycle
   */
  ngOnInit() {
    super.ngOnInit();
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required)
    });
  }

  /**
   * Submit
   */
  onSubmit() {

    // this.emailTo = 'marina.fox@gsa.gov';
    //TODO: parameterize email contact address
    this.emailTo = 'crowley@tcg.com';

    this.emailCC = '';
    this.subject = 'SRT Contact Us';
    this.emailBody =
      '<p>From: ' + this.myForm.value.name + ' (' + this.myForm.value.email + ') </p>' +
      '<br> ' +
      '<p>Content: ' + this.myForm.value.content + '</p>';

    const emailContent = new Email(
      this.emailTo,
      this.subject,
      this.emailBody,
      '',
      ''
    );

    this.solicitationService.sendContactEmail(emailContent)
    .subscribe(
      msg => {
        this.emailSent = true;
      },
      err => {
      });
  }

}
