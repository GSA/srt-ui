import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from '../../shared/services/auth.service';
import { AgencyService } from "../../shared/services/agency.service";

import { Agency } from "../../shared/agency";
import { User } from "../../shared/user";

import { CompleterService, CompleterData } from "ng2-completer";
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: "app-userregistration",
  templateUrl: "./userregistration.component.html",
  styleUrls: ["./userregistration.component.css"]
})
export class UserregistrationComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */

  myForm: FormGroup;
  registerSuccess = false;

  protected data: String[];
  public searchStr: string;
  public placeholder = "Click and begin typing to initiate search...";
  public textSearching = "Searhing for agency...";
  public selectedUserRole = "Select your request access level";
  protected dataService: CompleterData;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param authService
   * @param agencyService
   * @param completerService
   */
  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private completerService: CompleterService,
    private titleService: Title
  ) {
    super(titleService);
    this.pageName = 'SRT - User Management';
  }

  // sets up data template for  registration form
  ngOnInit() {
    super.ngOnInit();
    this.myForm = new FormGroup({
      position: new FormControl('', [
        Validators.required
      ]),

      firstName: new FormControl('',[
        Validators.required
      ] ),
      lastName: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required
      ]),
      agency: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/),
      ])
    });

    this.agencyService.GetAgencies().subscribe(data => {
      this.data = [];

      data.forEach(element => {
        this.data.push(element.Agency);
      });
      this.dataService = this.completerService.local(this.data);
    });
  }

  /**
   * submit
   * requests user account for SRT
   */
  onSubmit() {
    const user = new User();
    user.email = this.myForm.value.email;
    user.password = this.myForm.value.password;
    user.position = this.myForm.value.position;
    user.firstName = this.myForm.value.firstName;
    user.lastName =this.myForm.value.lastName;
    user.agency = this.myForm.value.agency;
    user.userRole = this.selectedUserRole;


    if (!this.myForm.valid ) {
      alert("your information is not valid!")
      this.myForm.reset();
    } else {
      this.authService.signup(user).subscribe(
        data => {
          this.registerSuccess = true;
        },
        error => {}
      );
      this.myForm.reset();
    }


  }



  onChangeAccessLevel(userRole) {
    this.selectedUserRole = userRole;
  }

  onFocus() {
    $("#dropdownMenuButton").click();
  }
}
