import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitationService } from '../../solicitation.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
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
      function (data: any) {
        this.submitter = data.email;
        this.date = data.date;
        this.feedback = data.responses;
        this.title = data.solNum;
        this.solNum = data.solNum;
      }.bind(this),
      error => console.log('ERROR: ' + error)
    );
  }

  ngOnInit() {
  }


}
