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

  ngOnInit() {

    // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.solicitationIndex = params['id'];
        // pull chosen solicitation from mongo
        this.solicitationService.getSolicitation(this.solicitationIndex)
          .subscribe(
            solicitation => {
              console.log(solicitation);
              this.solicitation = solicitation;
              this.emailTo = "srttestuser@gmail.com";    
              this.emailCC = localStorage.getItem("email");        
              this.subject = "Section 508 Requirements Assessment of " + this.solicitation.solNum + ", reviewed on " + this.solicitation.date;              
              this.emailBody = 
                              "Solicitation Title: " + this.solicitation.title  + "\n" + 
                              "Link: " + this.solicitation.url + "\n\n" +
                              "Dear Acquisition Professional:\n\n" + 
                              "You are receiving this letter as the point of contact for the solicitation referenced above.\n\n" +                               
                              "Your solicitation appears to describe requirements for Information and Communication Technology (ICT) deliverables, but according to the GSA Solicitation Review Tool (SRT), " + 
                              "it does not appear to be in compliance with Section 508 requirements. Section 508 requires that individuals with disabilities have access to and use of information and data that is comparable to those who are not individuals with disabilities. Please find the SRT’s solicitation assessment results attached. It can also be accessed at " + 
                              "“Solicitation Review Result Summary”. \n\n" +   
                              "[Please insert here your subject matter expert feedback specific to the solicitation to help with the compliance improvement] * \n\n" +                            
                              "To assist your efforts in addressing Section 508, please refer to the Section 508 Guidelines.  Also, GSA provides free tools and resources.  The BuyAccessible Wizard is a web-based tool that guides users through a process of gathering Section 508 and market research data for ICT purchases and provides complete documentation of due diligence.\n\n" + 
                              "For additional support on Section 508 requirements or concerns about the assessment of the solicitation, please reach out to the Section 508 Coordinator copied on this email." +                               
                              "\n\n\n" +
                              "Sincerely\n\n" + 
                              localStorage.getItem("firstName") + " " + 
                              localStorage.getItem("lastName") + "\n" +
                              // localStorage.getItem("position") + "," + 
                              localStorage.getItem("agency") +"."
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