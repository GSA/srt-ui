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

  @Input() solicitation;
  submitter;
  date;
  params: { }

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
    var solNum = this.route.snapshot.params["id"];
    this.params = {
      solNum : solNum
    }
    this.solicitationService.getSolicitationFeedback(this.params).subscribe(
      data => {
        this.solicitation = data[0];
        var history = this.solicitation.history.filter(d => d.action == "provided feedback on the solicitation prediction result")[0];
        this.submitter = history.user;
        this.date = history.date;
        console.log(data[0]);
      },
      error => console.log(error)
    )
  }

  ngOnInit() {

  }


}
