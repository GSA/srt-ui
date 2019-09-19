import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import { Email } from './email';


@Component({
  selector: 'app-email-poc',
  templateUrl: './email-poc.component.html',
  styleUrls: ['./email-poc.component.css']
})
export class EmailPocComponent implements OnInit {

  /* ATTRIBUTES */

  solicitation: Solicitation;
  subscription: Subscription;
  solicitationID: String;
  emailTo: String;
  emailCC: String;
  subject: String;
  emailBody: String;
  type: String = 'email';
  myForm: FormGroup;
  public step1: Boolean = false;
  public step2: Boolean = false;
  public step3: Boolean = false;
  public emailSent = false;

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: 'insert content...',
    modules: {
      toolbar: false
    },
  };

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
        const now = new Date().toLocaleDateString();
        this.solicitationID = params['id'];
        this.solicitationService.getSolicitation(this.solicitationID).subscribe(
          data => {

            data.parseStatus.forEach(element => {
                if (element.status == 'successfully parsed') element.status = 'Yes';
                else if (element.status == 'processing error')  element.status = 'No';
            });
            this.step1 = data.history.filter(function(e){return e['action'].indexOf('reviewed solicitation action requested summary') > -1; }).length > 0;
            this.step2 = data.history.filter(function(e){return e['action'].indexOf('sent email to POC') > -1; }).length > 0;
            this.step3 = data.history.filter(function(e){return e['action'].indexOf('provided feedback on the solicitation prediction result') > -1; }).length > 0;
            this.emailSent = data.history.filter(function(e){return ((e['action'].indexOf('sent email to POC') > -1) ); }).length > 0;
            this.emailTo = data.contactInfo.email; // "crowley+srttestemail@tcg.com";
            this.emailCC = localStorage.getItem('email');
            this.subject = 'Section 508 Requirements Assessment of ' + data.solNum + ', reviewed on ' + now;
            this.emailBody =
                  '<p>Solicitation Title: ' + data.title  + '</p>' +
                  '<p>Link: ' + '<a href=' + data.url + '>' + data.url + '</a></p>' +
                  '<br>' +

                  '<p>Dear Acquisition Professional:</p>' +
                  '<br>' +

                  '<p>You are receiving this letter as the point of contact for the ' +
                  'solicitation referenced above. The GSA Solicitation Review Tool (SRT) has flagged ' +
                  'your solicitation because Section 508 requires that any ICT that is developed, procured, ' +
                  'maintained, or used by the Federal government conform to the Section 508 Standards. This means that ' +
                  'Section 508 technical criteria MUST be included in the requirements document in ' +
                  'order to inform the vendor  of the Section 508 deliverables to meet the ' +
                  'contractual requirements.\n</p>' +
                  '<br>' +
                  '<p>To assist your efforts in addressing Section 508, please refer ' +
                  'to the <a href="https://www.section508.gov/manage/laws-and-policies">Section 508 ' +
                  'Guidelines.</a> GSA also provides free tools and ' +
                  'resources to assist with generating accessibility requirements. ' +
                  'The <a href="https://buyaccessible.gov/">Accessibility Requirement Tool</a> ' +
                  'is a web-based tool that guides users through the process of gathering ' +
                  'Section 508 requirements for ICT procurements and provides documentation ' +
                  'of due diligence.</p>' +
                  '<br>' +
                  '<p>For additional assistance with Section 508 requirements or concerns ' +
                  'about the assessment of this solicitation, please reach out to the Section 508 ' +
                  'Coordinator or contact us at srt@gsa.gov.</p>' +
                  '<br>' +
                  '<p>Sincerely</p>' +
                  '<br>' +
                  '<p>Section 508 Program Manager';

            this.solicitation = data;
            this.myForm.controls['emailTo'].setValue(this.emailTo);
            this.myForm.controls['emailCC'].setValue(this.emailCC);
            this.myForm.controls['subject'].setValue(this.subject);
            this.myForm.controls['message'].setValue(this.emailBody);
          },
          err => console.log(err)
        );
      });
      this.emailCC = localStorage.getItem('email');
      this.myForm = new FormGroup({
        emailTo: new FormControl('crowley+srttestemail@tcg.com', Validators.required),
        emailCC: new FormControl(this.emailCC , Validators.required),
        subject: new FormControl(this.subject, Validators.required),
        message: new FormControl(this.emailBody, Validators.required)
      });

    const user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');

  }

  /**
   * send an email to contact
   */
  emailContact() {

      const emailContent = new Email(
        this.myForm.value.emailTo,
        this.myForm.value.subject,
        this.myForm.value.message,
        this.myForm.value.emailFrom,
        this.myForm.value.emailCC
      );

      const now = new Date().toLocaleDateString();
      const user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
      const r = this.solicitation.history.push({'date': now, 'action': 'sent email to POC', 'user': user , 'status' : 'Email Sent to POC'});
      this.solicitationService.sendContactEmail(emailContent)
        .subscribe(
          msg => {
            this.emailSent = true;
            this.step2 = true;
            console.log ('setting the emailSent to true');
          },
          err => {
          });


      this.solicitationService.updateHistory(this.solicitation)
        .subscribe(
          msg => {
          },
          err => {
          });
    }

    skiptext(event) {
      if (event.keyCode == 9) {
        $('#btn').focus();
      }
    }


}
