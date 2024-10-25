import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { Router, NavigationEnd } from '@angular/router';
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
  private routerSubscription: Subscription;

  @ViewChild('gridContainer') gridContainer: ElementRef;

  // Add the showGrid property
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

    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/home') {
          // Toggle showGrid to force re-rendering
          this.showGrid = false;
          setTimeout(() => {
            this.showGrid = true;
          }, 0);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
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