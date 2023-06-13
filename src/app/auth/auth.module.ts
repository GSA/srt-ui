import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { AuthRoutingModule } from './auth.routing';

// SERVICES

import { AuthService } from '../shared/services/auth.service';
import { UserService } from 'app/shared/services/user.service';

// COMPONENTS

import { UserloginComponent } from './userlogin/userlogin.component';

import { AuthComponent } from 'app/auth/auth.component';

@NgModule({
    imports: [
      AuthRoutingModule,
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TableModule,
      ButtonModule,
      DropdownModule,
      CalendarModule,
      AutoCompleteModule,
    ],
    declarations: [
      UserloginComponent,
      AuthComponent,
    ],
    providers: [
    AuthService,
    UserService
    ],
    exports: [
    ]
  })
  export class AuthModule { }
