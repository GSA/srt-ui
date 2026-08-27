import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../shared/services/user.service';
import {BaseComponent} from '../base.component';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: false
})
export class AdminComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */
  public activeTab = 'users';

  /**
   * The ten pre-consolidation tab ids still resolve to a home, so old
   * bookmarks, muscle memory, and any code that emits a legacy id keep
   * working instead of landing on a blank panel.
   */
  private static readonly LEGACY_TABS: { [old: string]: string } = {
    'user-management': 'users',
    'approved': 'users',
    'accepted': 'users',
    'masquerade': 'users',
    'website-analytics': 'analytics',
    'reports': 'analytics',
    'metric-downloads': 'analytics',
    'audit-log': 'ops',
    'system-health': 'ops',
    'email-templates': 'content',
    'user-feedback': 'content',
    'feedback': 'content'
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Administration';
  }

  // Phase 4: Metric Downloads folds into Analytics behind this toggle.
  exportOpen = false;

  ngOnInit() {
    super.ngOnInit();
    // ?tab= makes each admin tab linkable; legacy ids are honored here too.
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab) { this.activeTab = AdminComponent.LEGACY_TABS[tab] || tab; }
    if (!['users', 'analytics', 'ops', 'content'].includes(this.activeTab)) {
      this.activeTab = 'users';
    }
  }

  processMenuClick(s: string) {
    this.activeTab = AdminComponent.LEGACY_TABS[s] || s;
    // Users tab manages its own richer query string (filters); don't clobber it.
    if (this.activeTab !== 'users') {
      this.location.replaceState('/admin', 'tab=' + this.activeTab);
    }
    // Move focus to the newly shown panel so screen-reader and keyboard
    // users land on the content they just selected, not back at the top.
    setTimeout(() => {
      const panel = document.getElementById('admin-panel-' + this.activeTab);
      if (panel) { panel.focus(); }
    }, 0);
  }
}
