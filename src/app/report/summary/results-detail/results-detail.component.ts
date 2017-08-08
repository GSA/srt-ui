import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.css']
})



export class ResultsDetailComponent implements OnInit {
  @Input() solicitation;
  @Output() displayType:EventEmitter<string> = new EventEmitter();
  @Output() review:EventEmitter<string> = new EventEmitter();
  private emailType:string = "1";
  public lockDocs;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
      
    if (this.solicitation)
    {
        var totalDoc = Number(this.solicitation.numDocs);
        if (!isNaN(totalDoc))
        {
          // doesn't have lock files
          if (totalDoc == this.solicitation.parseStatus.length){
          }
          else
          {
            var lock = totalDoc - this.solicitation.parseStatus.length;
            this.lockDocs = [];
            for(var i = 1; i <= lock; i++){
              this.lockDocs.push(i);
            }
          }
        }
    }
    
    
  }

  EmailPoc() {
      this.displayType.emit(this.emailType);
  }


  // HelpUsImprove(solicitation: any) {
  //     this.router.navigate(['/solicitation-feedback', solicitation._id]);
  // }
     
}
