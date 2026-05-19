import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss'],
    standalone: false
})
export class AdminHeaderComponent implements OnInit {

  @Output() menuClick = new EventEmitter<string>();
  active: Object;

  constructor() {
    this.active = {};
    this.active['user-management'] = true;
    this.active['website-analytics'] = false;
    this.active['accepted'] = false;
    this.active['masquerade'] = false;
    this.active['reports'] = false;
    this.active['audit-log'] = false;
    this.active['system-health'] = false;
    this.active['feedback'] = false;
    this.active['email-templates'] = false;
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
