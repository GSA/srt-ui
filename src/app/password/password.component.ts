import { PasswordValidators } from './password.validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']

})
export class PasswordComponent {
  // pwshow :boolean = false;
  // form: FormGroup;

 

  // constructor(fb: FormBuilder) {
  //   this.form = fb.group({
  //     oldPassword: ['', 
  //       Validators.required,
       
  //       PasswordValidators.validOldPassword,
      
  //     ],
  //     newPassword: ['', 
  //           Validators.required,
  //            Validators.minLength(4),
  //           PasswordValidators.cannotContainSpace
            

  //     ],

  //     confirmPassword: ['', Validators.required]
  //   }, {
  //     validator: PasswordValidators.passwordsShouldMatch
  //   });
  // }

  //    showHidePsw(){
  //      this.pwshow = !this.pwshow;
  //   }


  // get oldPassword() { return this.form.get('oldPassword'); }
  // get newPassword() { return this.form.get('newPassword'); }
  // get confirmPassword() { return this.form.get('confirmPassword'); }
}
