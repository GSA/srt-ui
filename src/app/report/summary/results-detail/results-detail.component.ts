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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  EmailPoc() {
      this.displayType.emit(this.emailType);
  }


  // HelpUsImprove(solicitation: any) {
  //     this.router.navigate(['/solicitation-feedback', solicitation._id]);
  // }
     
}
