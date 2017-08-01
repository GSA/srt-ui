//Module: SRTHeaderComponent
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ReportComponent } from '../report/report.component';
import { Currentuser } from '../shared/currentuser';
import { UserService } from '../user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/****************
*  The Header Component contains the nav bar for the SRT application
****************/
export class HeaderComponent implements OnInit {
  // firstName is displayed in the welcome message on the navbar
  private firstName = "";
  public currentID = "";
  @Input() isLogin;

// UserService propogates the firstName and agency to peer components
  constructor(private authService: AuthService,
              private router: Router,
              private user: UserService) {      
      
                // listen for the event letting the system know a user has logged in
      user.updateCurrentUser.subscribe(currentUser => this.saveCurrentUser(currentUser));
      if (localStorage.getItem("firstName")) {
        this.firstName = localStorage.getItem("firstName");
      }

  }

  ngOnInit() {    
      this.currentID = localStorage.getItem("id");    
  }

// clear user information and remove jwt
  onLogout() {
    var u = new Currentuser("", "", "", "", "");
    this.user.saveUser(u);
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }


// set the firstName of the user for display
  saveCurrentUser(currentUser) {
    this.firstName = currentUser.firstName;     
    localStorage.setItem("firstName", currentUser.firstName);
  }

  GetHash(hash)
  {
      return window.location.href.indexOf(hash) > -1;
  }


}
