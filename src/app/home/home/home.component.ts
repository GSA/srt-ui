import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  currentID: string;
  isGSAAdmin = false;
  private adminCheckTimes: number = 0;
  private interval: any;

  @ViewChild('gridContainer') gridContainer: ElementRef;

  showGrid = true;

  constructor(
    private auth: AuthGuard,
    private router: Router,
    private titleService: Title,
    private $gaService: GoogleAnalyticsService
  ) {
    super(titleService);
  }

  ngOnInit() {
    this.loadAdminComponents();
    this.currentID = localStorage.getItem('id');
    this.pageName = 'SRT Home Page';
    super.ngOnInit();
    this.checkAdmin();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loadAdminComponents() {
    this.isGSAAdmin = this.auth.checkAdmin();
  }

  checkAdmin() {
    this.interval = setInterval(() => {
      this.loadAdminComponents();
      if (this.adminCheckTimes > 1) {
        clearInterval(this.interval);
      }
      this.adminCheckTimes++;
    }, 2000);
  }

  onClickTiles(action: string, label: string) {
    this.$gaService.event(action, 'home_tiles', label);
  }
}