import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../../shared/solicitation';
import { Email } from './email';
import { environment } from '../../../../environments/environment';

import { htmlToPlainText } from '../../../shared/textversion';
import * as moment from 'moment';
import * as $ from 'jquery';


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
  epaSubject: String;
  emailBody: String;
  epaEmailBody: String;
  type: String = 'email';
  myForm: FormGroup;
  public step1: Boolean = false;
  public step2: Boolean = false;
  public step3: Boolean = false;
  public emailSent = false;
  templateToShow: String = 'IT Language';  // this will either be 'IT Langauge' or 'EPA Language'
  feature_flags = environment.feature_flags;

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
        this.solicitationService.getSolicitation(this.solicitationID).subscribe({
          next: data => {

            if (data.parseStatus && Array.isArray(data.parseStatus)) {
              data.parseStatus.forEach(element => {
                if (element.status === 'successfully parsed') {
                  element.status = 'Yes';
                } else if (element.status === 'processing error') {
                  element.status = 'No';
                }
              });
            } else {
              console.log ('Error processing parse status for solicitaiton ' + data.solNum);
              data.parseStatus = [{formattedDate: '', postedDate: null, name: '', status: '', attachment_url: ''}];
            }
            this.emailSent = data.history.filter(function(e){return ((e['action'].indexOf('sent email to POC') > -1) ); }).length > 0;
            this.emailTo = data.contactInfo.join(', '); // "crowley+srttestemail@tcg.com";
            this.emailCC = localStorage.getItem('email');
            this.subject = 'Section 508 Requirements Assessment of ' + data.solNum + ', reviewed on ' + now;
            this.epaSubject = 'EPA Requirements Assessment of ' + data.solNum + ', reviewed on ' + now;
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
                  'to the <a href="https://www.access-board.gov/guidelines-and-standards">Section 508 ' +
                  'guidelines and standards.</a> GSA also provides free tools and ' +
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
            this.epaEmailBody = '<p>Solicitation Title: ' + data.title  + '</p>' +
              '<p>Link: ' + '<a href=' + data.url + '>' + data.url + '</a></p>' +
              '<br>' +
              '<p>Dear Acquisition Professional:</p>' +
              '<br>' +
              '<p>You are receiving this letter as the point of contact for the ' +
              'solicitation referenced above......\n</p>' +
              '<br>' +
              '<p>To assist your efforts in addressing this issue, please refer ' +
              'to .....\n</p>' +
              '<br>' +
              '<p>For additional assistance with questions or concerns ' +
              'about the assessment of this solicitation, please reach out to....</p>' +
              '<br>' +
              '<p>Sincerely</p>' +
              '<br>' +
              '<p>';

            this.solicitation = data;
            this.myForm.controls['emailTo'].setValue(this.emailTo);
            this.myForm.controls['emailCC'].setValue(this.emailCC);
            this.myForm.controls['subject'].setValue(this.subject);
            this.myForm.controls['epaSubject'].setValue(this.epaSubject);
            this.myForm.controls['it_message'].setValue(this.emailBody);
            this.myForm.controls['epa_message'].setValue(this.epaEmailBody);
          },
          error: err => console.log(err)
      });
      });
      this.emailCC = localStorage.getItem('email');
      this.myForm = new FormGroup({
        emailTo: new FormControl('crowley+srttestemail@tcg.com', Validators.required),
        emailCC: new FormControl(this.emailCC , Validators.required),
        subject: new FormControl(this.subject, Validators.required),
        epaSubject: new FormControl(this.epaSubject, Validators.required),
        it_message: new FormControl(this.emailBody, Validators.required),
        epa_message: new FormControl(this.epaEmailBody, Validators.required)
      });

  }

  emailError(to) {
    alert (`There was a problem sending an email message to ${to}. Please try again later or contact srt@gsa.gov to report the issue.`);
  }

  clientEmail(emailTo, subject, body, from, cc) {

    const simulateError =
      (environment.ENVIRONMENT === 'local' || environment.ENVIRONMENT === 'dev') &&
      (emailTo.substring(emailTo.length - 6) === 'nospam') &&
      (Math.random() < .1);

    emailTo = encodeURI(emailTo);
    subject = encodeURI(subject);
    body = encodeURI( htmlToPlainText(body) );
    cc = encodeURI(cc);

    // if we are on dev/local and the email address ends in nospam,
    // give a chance for a simulated error
    if ( simulateError ) {
      this.emailError(emailTo);
      return;
    }

    document.location.href = `mailto: ${emailTo}?subject=${subject}&body=${body}&cc=${cc}`;
    // email sent successfully, now update the history
    this.emailSuccess();

  }

  serverEmail(emailTo, subject, body, emailFrom, cc) {
    const emailContent = new Email(emailTo, subject, body, emailFrom, cc);
    this.solicitationService.sendContactEmail(emailContent)
      .subscribe({
        next: msg => {
          this.emailSuccess();
        },
        error: err => {
          this.emailError(this.myForm.value.emailTo);
        }});
  }

  emailSuccess() {
    // email sent successfully, now update the history
    const now = moment().format('MM/DD/YYYY');

    const user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    this.solicitation.history.push({'date': now, 'action': 'sent email to POC', 'user': user , 'status' : 'Email Sent to POC'});
    this.emailSent = true;
    this.solicitationService.updateHistory(this.solicitation)
      .subscribe({
        next: m => {
          console.log('History updated successfully')
        },
        error: err => {
          console.log(`Error updating history -- ${err}`)
        }});
  }

  copyText(field) {
    const el = document.createElement('textarea');
    el.value = htmlToPlainText(this.myForm.value[field]).trim();
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  /**
   * send an email to contact
   */
  emailContact() {


    const body = this.myForm.value.message;
    const subject = this.myForm.value.subject;
    const emailTo = this.myForm.value.emailTo;
    const emailFrom = this.myForm.value.emailFrom;
    const cc = this.myForm.value.emailCC;

    if (environment.USE_CLIENT_EMAIL) {
      this.clientEmail(emailTo, subject, body, emailFrom, cc);
    } else {
      this.serverEmail(emailTo, subject, body, emailFrom, cc);
    }

  }

    skiptext(event) {
      if (event.keyCode === 9) {
        $('#btn').focus();
      }
    }

    selectLanguage(event) {
      this.templateToShow = event.value;
    }

}
