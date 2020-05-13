import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Output() menuClick = new EventEmitter<string>();
  active: Object;

  constructor() {
    this.active = {};
    this.active['accepted'] = true;
    this.active['masquerade'] = false;
    this.active['reports'] = false;
  }


  ngOnInit() {
  }

  setActiveTab(tab: string) {
    for (const key in this.active) {
      if (this.active.hasOwnProperty(key)) {
        this.active[key] = false;
      }
    }
    this.active[tab] = true;
    console.log(this.active);
  }

}
