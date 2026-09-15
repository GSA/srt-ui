import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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

@NgModule({ declarations: [
        UserloginComponent,
        AuthComponent,
    ],
    exports: [], imports: [AuthRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        CalendarModule,
        AutoCompleteModule], providers: [
        AuthService,
        UserService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
  export class AuthModule { }
