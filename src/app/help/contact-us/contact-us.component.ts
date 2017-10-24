import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../../solicitation/solicitation.service';
import { Solicitation } from '../../shared/solicitation';

import { Email } from '../../solicitation/summary/email-poc/email';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

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
    private solicitationService: SolicitationService
  ) { }

  /**
   * angular lifecycle
   */
  ngOnInit() {
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

    this.emailTo = 'marina.fox@gsa.gov';
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
