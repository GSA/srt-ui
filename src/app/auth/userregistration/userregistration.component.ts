
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../user';


@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})

export class UserregistrationComponent implements OnInit {
  myForm: FormGroup;
  registerSuccess = false;
  errorMessage = false;
  constructor(private authService: AuthService) { }
// sets up data template for  registration form
  ngOnInit() {
    this.myForm = new FormGroup({
      position: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      agency: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
// requests user account for SRT
  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.position,
      this.myForm.value.firstName,
      this.myForm.value.lastName,
      this.myForm.value.agency
    );    
    if (this.myForm.value.email == null ||
        this.myForm.value.password == null ||
        this.myForm.value.position == null ||
        this.myForm.value.firstName == null ||
        this.myForm.value.lastName == null ||
        this.myForm.value.agency == null)
    {        
        this.errorMessage = true;
    }
    else
    {
      this.registerSuccess = true;
      // this.authService.signup(user)
      //   .subscribe(
      //     data => {
      //       console.log(data);
      //       this.registerSuccess = true;
      //     },
      //     error => console.log(error)
      //   );
      // this.myForm.reset();
    }
  
  }

}
