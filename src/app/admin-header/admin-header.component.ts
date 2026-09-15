import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Admin section tab bar.
 *
 * Four tabs, consolidated from the previous ten:
 *   users     — user management (+ approval views, masquerade row action)
 *   analytics — website analytics, login reports, metric downloads
 *   ops       — system health, audit log
 *   content   — email templates, user feedback
 *   agencies  — agency hierarchy, domain mapping, access, deviation
 */
@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss'],
    standalone: false
})
export class AdminHeaderComponent implements OnInit {

  @Output() menuClick = new EventEmitter<string>();
  @Input() initialTab = 'users';
  active: { [key: string]: boolean } = { users: true, agencies: false, analytics: false, ops: false, content: false };

  ngOnInit() {
    if (this.active.hasOwnProperty(this.initialTab)) { this.setActiveTab(this.initialTab); }
  }

  setActiveTab(tab: string) {
    for (const key of Object.keys(this.active)) { this.active[key] = false; }
    this.active[tab] = true;
  }
}
