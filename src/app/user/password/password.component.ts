
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';

// import services
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { EmailService } from '../../shared/services/email.service';

//import classes
import { User } from '../../shared/user'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']

})
export class PasswordComponent implements OnInit {


  /* Attributes */

  validation;
  pwshow: boolean = false;
  form: FormGroup;
  allValid: boolean = false;
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  str1: string;
  str2: string;
  str3: string;
  params = {};

  filterParams = {};
  


  /**
  * Constructor.
  * @param authService
  * @param router
  */
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private emailService: EmailService,
    public route: ActivatedRoute,    
    private router: Router
  ) {

  }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ])
    }, passwordMatchValidator);

    // if(this.route.snapshot.params){
     
    //   this.filterParams['_email'] = this.route.snapshot.params['email'];
    //   this.filterParams['_temp'] = this.route.snapshot.params['temp'];
    //   debugger
    //   this.getUrltempPassword();
      
    // } 
    
      
  }

  /**
  * Hide/Show password
  */
  showHidePsw() {
    this.pwshow = !this.pwshow;
  }

  /**
   * User update password
   */  
  changePassword() {
    var password = this.form.value.newPassword;
    var oldpassword = this.form.value.oldPassword;
    this.params['password'] = password;
    this.params['oldpassword'] = oldpassword;
    this.userService.updatePassword(this.params).subscribe(
      data => {
        if(environment.EMAIL_NOTIFICATION){
          this.emailService.updatePassword().subscribe(
            data => {
               console.log(data.message)
            },
            error => console.log(error)
          )
        }
        alert(data.message);
        this.router.navigate(['/home']);

      },
      error => console.log(error)
    );
  }

  /**
   * Check Password  Validator
   */
  matchValidation() {
    if (this.step1 == true && this.step2 == true && this.step3 == true && this.step4 == true && this.str2 == this.str3) {
      this.allValid = true;
    }
  }

  /**
   * Get the serverside data for password
   */
  // getUrltempPassword(){
  //   this.authService.updatePasswordByUrl().subscribe(
  //     data => {},
  //     error => {}
  //   );
  // }

  /**
   * Password  Validator
   */
  validationFunction() {

    if (this.str2.length > 8) {
      this.step1 = true;
    } else {
      this.step1 = false;
    }

    if (/[A-Z]/.test(this.str2)) {
      this.step2 = true;
    } else {
      this.step2 = false;
    }

    if (/\d+/.test(this.str2)) {
      this.step3 = true;
    } else {
      this.step3 = false;
    }

    if (/[$-/:-?{-~!"^_`\[\]]/.test(this.str2)) {
      this.step4 = true;
    } else {
      this.step4 = false;
    }

  }
}

/**
 * Password Matching Validator
 */
export function passwordMatchValidator(g: FormGroup) {
  return g.get('newPassword').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
}

