import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() history;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {    
      this.history.sort(function(a, b){
         var dateA = new Date(a.date);
         var dateB = new Date(b.date);
         if (dateA > dateB) return 1;
         else if (dateA < dateB ) return -1;
         else return 0;
      });
  }
  
}
