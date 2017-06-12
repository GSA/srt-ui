import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public displayTab:number = 1;
  
  constructor() { }

  ngOnInit() {

      
  }

  ChangeDisplayTab( num ){
      this.displayTab = num;    
  }

  
  
}
