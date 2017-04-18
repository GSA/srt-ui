
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
    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    this.myForm.reset();
  }

}
