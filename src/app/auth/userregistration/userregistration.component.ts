
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { AgencyService } from '../../agency.service';

import { Agency } from '../../Shared/agency';
import { User } from '../user';

import { CompleterService, CompleterData } from 'ng2-completer';


@Component({
    selector: 'app-userregistration',
    templateUrl: './userregistration.component.html',
    styleUrls: ['./userregistration.component.css']
})

export class UserregistrationComponent implements OnInit {
    myForm: FormGroup;
    registerSuccess = false;
    errorMessage = false;
    
    protected data: String[];
    public searchStr: string;
    public placeholder = "Click and begin typing to initiate search...";
    public textSearching = "Searhing for agency...";
    public selectedUserRole = "Select your request access level";
    protected dataService: CompleterData;
    
    constructor(
        private authService: AuthService, private agencyService: AgencyService, 
        private completerService: CompleterService) {
        
    }

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

        this.agencyService.GetAgencies()
            .subscribe(
              data => {            
                  this.data = [];                  
                  data.forEach(element => {                    
                      this.data.push(element.Agency + " (" + element.Acronym + ")");
                  });    
                  this.dataService = this.completerService.local(this.data);
              },
              error => console.log(error)
        );


    }
    // requests user account for SRT
    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.position,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.agency,            
            this.selectedUserRole
        );    

        if (this.myForm.value.email == null ||
            this.myForm.value.password == null ||
            this.myForm.value.position == null ||
            this.myForm.value.firstName == null ||
            this.myForm.value.lastName == null ||
            this.myForm.value.agency == null ||
            this.selectedUserRole == "Select your request access level")
        {        
            this.errorMessage = true;
        }
        else
        {
            //this.registerSuccess = true;
            this.authService.signup(user)
                .subscribe(
                  data => {
                    this.registerSuccess = true;
                  },
                  error => console.log(error)
                );
            this.myForm.reset();
        }

      }

      open() {
        debugger
      }

      onChangeAccessLevel(userRole) {
          this.selectedUserRole = userRole;
      }

      onFocus() {
          $('#dropdownMenuButton').click();
      }

}
