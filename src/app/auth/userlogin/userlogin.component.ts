import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user';
import { Currentuser } from '../../shared/currentuser';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { AuthGuard } from '../../auth-guard.service'
import { AppComponent } from '../../app.component'
import { environment } from '../../../environments/environment'
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */

  myForm: FormGroup;
  errorMessage = false;
  errorInformation = "";
  public loginUrl = environment.SERVER_URL + '/casLogin';

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param app
   * @param authGuard
   * @param authService
   * @param router
   * @param user
   */
  constructor(private app: AppComponent,
              private authGuard: AuthGuard,
              private authService: AuthService,
              private router: Router,
              private user: UserService,
              private ts: Title) {
    super(ts);
    this.pageName = 'Solicitation Review Tool';
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    super.ngOnInit();
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]
      ),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * submit
   * submit authentication data.  uses local storage to hold encrypted
   * json web token and user agency.
   * the jwt is set to expire after 2 hours.
   */
  onSubmit() {
    const user = new User();
    user.email = this.myForm.value.email;
    user.password = this.myForm.value.password;

    if (!this.myForm.valid) {
      alert('your input is not valid!')
      this.myForm.reset();

    }else{
    this.authService.login(user)
      .subscribe(
        data => {
          // debugger
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('firstName', data.firstName);
          localStorage.setItem('lastName', data.lastName);
          localStorage.setItem('agency', data.agency); // ToDo: clean this up and use user service
          localStorage.setItem('email', data.email);
          localStorage.setItem('position', data.position);
          localStorage.setItem('id', data.id);
          localStorage.setItem('userRole', data.userRole);

          console.log ('SAVING (1) token ' + data.token);


          this.authGuard.isLogin = true;
          this.app.isLogin = true;
          this.authGuard.isGSAAdmin = (data.userRole == "Administrator" || data.userRole == "SRT Program Manager ") && data.agency.indexOf("General Services Administration") > -1;
          this.app.isGSAAdmin = (data.userRole == "Administrator" || data.userRole == "SRT Program Manager ") && data.agency.indexOf("General Services Administration") > -1;
          var currentUser = new Currentuser(data.firstName, data.lastName, data.agency, data.email, data.position, data.tempPassword);

          this.user.saveUser(currentUser);
          console.log(currentUser)
          if (currentUser.tempPassword != '') {this.router.navigate(['/user/updatePassword']);}
          else{this.router.navigate(['/home']);}
          //this.router.navigate(['/home']);
        },
        error => {
          this.errorMessage = true;
          this.errorInformation = error.error.message
        }
      );
    }



  }

}
