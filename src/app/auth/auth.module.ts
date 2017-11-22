import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Kailun'add
import { DataTableModule,SharedModule, ButtonModule, DropdownModule, CalendarModule} from 'primeng/primeng';
import { TooltipModule } from "ng2-tooltip";
import { Ng2CompleterModule } from "ng2-completer";


import { AuthRoutingModule } from './auth.routing';

// SERVICES

import { AuthService } from '../shared/services/auth.service';
import { UserService } from 'app/shared/services/user.service';

// COMPONENTS

import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';

import { AuthComponent } from 'app/auth/auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
    imports: [
      AuthRoutingModule,
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      SharedModule,
      ButtonModule,
      DropdownModule,
      CalendarModule,
      Ng2CompleterModule,
      
    ],
    declarations: [
      UserloginComponent,
      UserregistrationComponent,
      AuthComponent,
      ForgotPasswordComponent,
     
      

    ],
    providers: [
    AuthService,
    UserService
    
    ],
    exports: [
    ]
  })
  export class AuthModule { }
  