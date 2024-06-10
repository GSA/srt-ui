import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { Router } from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */
  currentID: string;
  isGSAAdmin = false;

  private adminCheckTimes: number = 0;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param auth
   * @param router
   * @param titleService
   * @param $gaService
   */
  constructor(
    private auth: AuthGuard,
    private router: Router,
    private titleService: Title,
    private $gaService: GoogleAnalyticsService
  ) {
    super(titleService);
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.loadAdminComponents();
    this.currentID = localStorage.getItem('id');
    this.pageName = 'SRT Home Page';
    super.ngOnInit();

    this.checkAdmin();
  }

  ngOnChanges(){
  }
  
  loadAdminComponents(){
    this.isGSAAdmin = this.auth.checkAdmin();    
  }

  checkAdmin(){
    const interval = setInterval(() => {
      this.loadAdminComponents();

      if (this.adminCheckTimes > 1) {
        clearInterval(interval);
      }
      this.adminCheckTimes++;

    }, 2000);

  }

  onClickTiles(action: string, label: string) {
    this.$gaService.event(action, "home_tiles", label);
  }

}
