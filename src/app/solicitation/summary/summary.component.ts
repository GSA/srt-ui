import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../solicitation.service';
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

  @Input() solicitationID;
  @Input() step1;
  @Input() step2;
  @Input() step3;
  @Input() type;
  // public displayTab:number = 0;

  // emailBody: String = "";
  // subject: String = "";
  // emailTo: String = "";
  // emailCC: string = "";
  // solicitation: Solicitation;
  // private subscription: Subscription;
  // private solicitationIndex: String;

  // public step1:Boolean = false;
  // public step2:Boolean = false;
  // public step3:Boolean = false;


  ngOnChanges() {
    console.log(this.solicitationID)
  }
  ngOnInit() {

    // // listen for the activated route and use the 'id'  to pull chosen solicitation from mongo
    // this.subscription = this.route.params.subscribe(
    //   (params: any) => {
    //     var now = new Date().toLocaleDateString();
    //     this.solicitationIndex = params['id'];
    //     // pull chosen solicitation from mongo
    //     this.solicitationService.getSolicitation(this.solicitationIndex)
    //       .subscribe(
    //         solicitation => {
    //           solicitation.parseStatus.forEach(element => {
    //               if (element.status == "successfully parsed") element.status = "Yes";
    //               else if (element.status == "processing error")  element.status = "No";
    //           });

    //         },
    //         err => {
    //         });
    //     });
  }


  // emailPoc(solicitation: any) {
  //   this.router.navigate(['/email', solicitation._id]);
  // }


  // ChangeDisplayTab( num ){
  //     this.displayTab = num;
  // }


}
