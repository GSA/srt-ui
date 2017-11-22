import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS

import { PublicComponent } from '../home/public/public.component';
import { HomeComponent } from '../home/home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { PasswordComponent } from 'app/user/password/password.component';

import { AuthGuard } from '../auth-guard.service';


const routes: Routes = [
    {
        path: 'auth',
        component: PublicComponent, 
        children: [
            {path: '', redirectTo: 'signin', pathMatch: 'full'},
            {path: 'signin', component: AuthComponent},
            {path: 'forgetpassword', component: ForgotPasswordComponent} ,   
            {path: ':email/:temp', component: PasswordComponent},
        ]
    },
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AuthRoutingModule{}