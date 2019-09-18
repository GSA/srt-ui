import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS

import { PrivateComponent } from '../home/private/private.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from 'app/user/profile/profile.component';
import { MasqComponent } from './masq/masq.component';


import {AuthGuard} from '../auth-guard.service';




const routes: Routes = [
    {
        path: 'user',
        component: PrivateComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: 'updatePassword', component: PasswordComponent},
            {path: 'masq', component: MasqComponent},
            {path: 'profile/:userID', component: ProfileComponent, canActivate: [AuthGuard]},

        ]
    },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class UserRoutingModule { }
