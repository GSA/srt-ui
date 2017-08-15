import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { Currentuser } from '../../shared/currentuser';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';
import { AuthGuard } from '../../auth-guard.service'
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  myForm: FormGroup;
  errorMessage = false;
  errorInformation = "";
  constructor(private app: AppComponent,
              private authGuard: AuthGuard,
              private authService: AuthService,
              private router: Router,
              private user: UserService) { }

// init data for login form
  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

// submit authentication data.  uses local storage to hold encrypted json web token and user agency
// the jwt is set to expire after 2 hours.
  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password);    
    this.authService.login(user)
      .subscribe(
        data => {           
          
          console.log(data);
          localStorage.setItem('token', data.token);       
          localStorage.setItem('firstName', data.firstName);
          localStorage.setItem('lastName', data.lastName);
          localStorage.setItem('agency', data.agency); // ToDo: clean this up and use user service
          localStorage.setItem('email', data.email);
          localStorage.setItem('position', data.position);
          localStorage.setItem('id', data.id);          
          localStorage.setItem('userRole', data.userRole);
          this.authGuard.isLogin = true;
          this.app.isLogin = true;
          var currentUser = new Currentuser(data.firstName, data.lastName, data.agency, data.email, data.position);
          this.user.saveUser(currentUser);
          this.router.navigateByUrl('home');
        },
        error => {          
          this.errorMessage = true;
          this.errorInformation = error.error.message
        }
      );
      
  }

}
