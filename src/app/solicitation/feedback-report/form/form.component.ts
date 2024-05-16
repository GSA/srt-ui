import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitationService } from '../../solicitation.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  /* ATTRIBUTES */

  submitter;
  date;
  @Input() feedback;
  title;
  solNum = 'atcsolnum';


  /* CONSTRUCTORS */

  /**
   * constructor
   * @param route
   * @param solicitationService
   */
  constructor(
    private route: ActivatedRoute,
    private solicitationService: SolicitationService
  ) {
    const solNum = this.route.snapshot.params['id'];
    const that = this;
    this.solicitationService.getSolicitationFeedback({solNum: solNum}).subscribe(
      {next: (data:any) => this.assignFeedback(data),
      error: error => console.log('ERROR: ' + error)}
    );
  }

  ngOnInit() {
  }

  /*
  * METHODS
  */
  assignFeedback(feedback) {
    this.submitter = feedback.email;
    this.date = feedback.date;
    this.feedback = feedback.responses;
    this.title = feedback.solNum;
    this.solNum = feedback.solNum;
  }

}
