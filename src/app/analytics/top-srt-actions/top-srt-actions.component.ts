import { Component, OnInit, Input } from '@angular/core';

import {TooltipModule} from "ng2-tooltip";
import * as $ from 'jquery';

@Component({
  selector: 'app-top-srt-actions',
  templateUrl: './top-srt-actions.component.html',
  styleUrls: ['./top-srt-actions.component.css']
})
export class TopSrtActionsComponent implements OnInit {

  @Input() ICTforDisplay;
  @Input() nonCompliantICT;
  public solicitationNumber = 0;
  public nonCompliantICTNumber = 0;
  public reviewed:number;
  public emailSend: number;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {      
      this.solicitationNumber = this.ICTforDisplay.length;  
      this.nonCompliantICTNumber = this.nonCompliantICT.length;
      var reviewedSolicitation = this.ICTforDisplay.filter(function(d){
            return (d.history.filter(function(e){return e["action"].indexOf('reviewed solicitation action requested summary') > -1 }).length > 0)
      });
      this.reviewed = reviewedSolicitation.length;
      var emailSentSolicitation = this.ICTforDisplay.filter(function(d){
            return (d.history.filter(function(e){return e["action"].indexOf('sent email to POC') > -1}).length > 0)
      });
      this.emailSend = emailSentSolicitation.length;
  }

}
