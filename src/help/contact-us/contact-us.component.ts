import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../../app/solicitation/solicitation.service';
import { Solicitation } from '../../app/shared/solicitation';

import { Email } from '../../app/solicitation/summary/email-poc/email';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  myForm: FormGroup;
  emailTo: String;
  emailCC: String;
  subject: String;
  emailBody: String;
  type: String = "email";
  emailSent: Boolean = false;

  constructor(
    private solicitationService: SolicitationService
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.emailTo = "marina.fox@gsa.gov";
    this.emailCC = "";
    this.subject = "SRT Contact Us";
    this.emailBody =
      "<p>From: " + this.myForm.value.name + " (" + this.myForm.value.email + ") </p>" +
      "<br> " +
      "<p>Content: " + this.myForm.value.content + "</p>";

    const emailContent = new Email(
      this.emailTo,
      this.subject,
      this.emailBody,
      "",
      ""
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
