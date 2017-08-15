import { Component, OnInit, Input } from '@angular/core';

import {TooltipModule} from "ng2-tooltip";
import * as $ from 'jquery';

@Component({
  selector: 'app-top-srt-actions',
  templateUrl: './top-srt-actions.component.html',
  styleUrls: ['./top-srt-actions.component.css']
})
export class TopSrtActionsComponent implements OnInit {

  @Input() TopSRTActionChart;
 
  public solicitationNumber = 0;
  public nonCompliantICTNumber = 0;
  public updatedCompliantICTNumber = 0;
  public updatedNonCompliantICTNumber = 0;
  public updatedICTNumber = 0;
  public reviewed:number;
  public emailSend: number;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {  
    if (this.TopSRTActionChart) 
    {
      this.solicitationNumber = this.TopSRTActionChart.determinedICT;
      this.nonCompliantICTNumber = this.TopSRTActionChart.uncompliance;
      this.reviewed = this.TopSRTActionChart.review;
      this.emailSend = this.TopSRTActionChart.email;
      this.updatedICTNumber = this.TopSRTActionChart.updatedICT;
      this.updatedCompliantICTNumber = this.TopSRTActionChart.updatedCompliantICT;
      this.updatedNonCompliantICTNumber = this.TopSRTActionChart.updatedNonCompliantICT;
    }    
      
  }

}
