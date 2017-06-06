import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../../solicitation.service';
import { Solicitation } from '../../shared/solicitation';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private solicitationService: SolicitationService,
              private route: ActivatedRoute,
              private router: Router) { }

  public displayTab:number = 0;

  emailBody: String = "";
  subject: String = "";
  emailTo: String = "";
  emailCC: string = "";
  solicitation: Solicitation;
  private subscription: Subscription;
  private solicitationIndex: String;

  public step1:Boolean = false;
  public step2:Boolean = false;
  public step4:Boolean = false;

  ngOnInit() {

    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        var now = new Date().toLocaleDateString();
        this.solicitationIndex = params['id'];
        // pull chosen solicitation from mongo
        this.solicitationService.getSolicitation(this.solicitationIndex)
          .subscribe(
            solicitation => {
              console.log(solicitation);
              solicitation.parseStatus.forEach(element => {
                  if (element.status == "successfully parsed") element.status = "Yes";
                  else if (element.status == "processing error")  element.status = "No";
              });       

              this.step1 = solicitation.history.filter(function(e){return e["action"].indexOf('reviewed solicitation action requested summary') > -1}).length > 0
              this.step2 = solicitation.history.filter(function(e){return e["action"].indexOf('sent email to POC') > -1}).length > 0
              this.step4 = solicitation.history.filter(function(e){return e["action"].indexOf('provided feedback on the solicitation prediction result') > -1}).length > 0
              
              this.solicitation = solicitation;
              this.emailTo = "srttestuser@gmail.com";    
              this.emailCC = localStorage.getItem("email");        
              this.subject = "Section 508 Requirements Assessment of " + this.solicitation.solNum + ", reviewed on " + now;              
              this.emailBody = 
                              "<div>Solicitation Title: " + this.solicitation.title  + "</div>" + 
                              "<div style='padding-bottom: 20px;'>Link: " + "<a href=" + this.solicitation.url + ">" + this.solicitation.url + "</a></div>" +
                              "<div style='padding-bottom: 15px;'>Dear Acquisition Professional:</div>" + 
                              "<div style='padding-bottom: 15px;'>You are receiving this letter as the point of contact for the solicitation referenced above.</div>" +      

                              "<div style='padding-bottom: 15px;'>Your solicitation appears to be related to Information and Communication Technology (ICT) deliverables as " + 
                              "defined by the Access Board in the Section 508 Standard. The GSA Solicitation Review Tool (SRT) has flagged " + 
                              "your solicitation because it <i style='text-decoration: underline;'><b>does not appear to be in compliance with Section 508</b></i>. Section 508 of the " +
                              "Rehabilitation Act requires that any ICT that is developed, procured, maintained, or used by the Federal " + 
                              "government conform to the Section 508 Standards.  This means that Section 508 technical criteria MUST be " +
                              "included in the requirements document in order to inform the vendor of the Section 508 deliverables to meet the " +
                              "contractual requirements. Please find the SRT’s solicitation assessment results attached. They may also be " +
                              "accessed at “Solicitation Review Result Summary”. </div>" + 

                              "<div style='padding-bottom: 15px;'>To assist your efforts in addressing Section 508, please refer to the <a href='https://section508.gov/content/guidance'>Section 508 Guidelines</a>. GSA also provides free tools and resources. <a href='https://www.section508.gov/content/buy'>The BuyAccessible Tool</a> is a web-based tool that guides users through the process of gathering Section 508 requirements for ICT procurements  and provides documentation of due diligence.</div>" + 
                              "<div style='padding-bottom: 15px;'>For additional assistance with Section 508 requirements or concerns about the assessment of this solicitation, please reach out to the Section 508 Coordinator copied on this email or contact us at <a href='mailto:section.508@gsa.gov'>section.508@gsa.gov</a>.</div>" +                                                
                              "<div style='padding-bottom: 20px;'>Sincerely</div>" + 
                              "<div>" +
                              localStorage.getItem("firstName") + " " + 
                              localStorage.getItem("lastName") + "</div>" +
                              "<div>" + 
                              // localStorage.getItem("position") + "," + 
                              localStorage.getItem("agency") +"</div>" 
                            
            },
            err => {
              console.log(err);
            });
        });
  }

  
  emailPoc(solicitation: any) {
    this.router.navigate(['/email', solicitation._id]);
  }


  ChangeDisplayTab( num ){
      this.displayTab = num;    
  }
  
 

  HelpUsImprove(solicitation: any) {
      this.router.navigate(['/solicitation-feedback', solicitation._id]);
  }

}