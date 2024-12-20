import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-srt-actions',
  templateUrl: './top-srt-actions.component.html',
  styleUrls: ['./top-srt-actions.component.scss']
})
export class TopSrtActionsComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() TopSRTActionChart;

  public solicitationNumber = 0;
  public nonCompliantICTNumber = 0;
  public updatedCompliantICTNumber = 0;
  public updatedNonCompliantICTNumber = 0;
  public updatedICTNumber = 0;
  public reviewed: number;
  public emailSend: number;
  public selectedAgency = 'Government wide';

  /* CONSTRUCTOR */

  /**
   * constructor
   */
  constructor(
  ) {}

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * lifecycle
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    if (this.TopSRTActionChart) {
      this.solicitationNumber = this.TopSRTActionChart.determinedICT;
      this.nonCompliantICTNumber = this.TopSRTActionChart.uncompliance;
      this.reviewed = this.TopSRTActionChart.review;
      this.emailSend = this.TopSRTActionChart.email;
      this.updatedICTNumber = this.TopSRTActionChart.updatedICT;
      this.updatedCompliantICTNumber = this.TopSRTActionChart.updatedCompliantICT;
      this.updatedNonCompliantICTNumber = this.TopSRTActionChart.updatedNonCompliantICT;
      this.selectedAgency = this.TopSRTActionChart.params.agency === 'Government-wide' ?
                                     'all federal agencies' :
                                     'the ' + this.TopSRTActionChart.params.agency;
    }

  }

}
