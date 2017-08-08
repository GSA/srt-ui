import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() solicitation: Solicitation;
  @Output() update: EventEmitter<string> = new EventEmitter();
  @Output() displayType:EventEmitter<string> = new EventEmitter();
  myForm: FormGroup;
  //solicitation: Solicitation;
  private subscription: Subscription;
  private solicitationIndex: String;
  public emailSent = false;
  public helpUsImproveType = "2";
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

    var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    this.emailSent = this.solicitation.history.filter(function(e){return ((e["action"].indexOf('sent email to POC') > -1) )}).length > 0;    


    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    // this.subscription = this.route.params.subscribe(
    //   (params: any) => {
    //     this.solicitationIndex = params['id'];
    //     // pull chosen solicitation from mongo
    //     this.solicitationService.getSolicitation(this.solicitationIndex)
    //       .subscribe(
    //         solicitation => {
    //           this.solicitation = solicitation;
    //           // check if current user has sent email already 
    //           var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    //           this.emailSent = solicitation.history.filter(function(e){return ((e["action"].indexOf('sent email to POC') > -1) && (e["user"].indexOf(user) > -1))}).length > 0;              
    //         },
    //         err => {
    //         });
    //     });

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
    var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    var r = this.solicitation.history.push({'date': now, 'action': "sent email to POC", 'user': user , 'status' : 'Email Sent to POC'});
    this.solicitationService.sendContactEmail(emailContent)
      .subscribe(
        msg => {
          this.emailSent = true;
          this.update.emit();
          this.displayType.emit(this.helpUsImproveType);
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


  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
      placeholder: "insert content...",
      modules: {
        toolbar: false
      }, 
  };

}
