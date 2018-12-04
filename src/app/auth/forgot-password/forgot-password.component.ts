import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

// import services
import { AuthService } from '../../shared/services/auth.service';
import { EmailService } from '../../shared/services/email.service';

// import classes
import { User } from '../../shared/user';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]
      ),
    });
  }

/**
 * Reset Password
 */
  resetPassword() {
    const email = this.myForm.value.email;
    if (email !== '') {
      this.authService.resetPassword(email).subscribe(
        data => {
          if (environment.EMAIL_NOTIFICATION) {
            this.emailService.resetPassword(email).subscribe(
              data => {
                alert(data.message);
                this.router.navigate(['/home']);

              },
              error => console.log(error),
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
