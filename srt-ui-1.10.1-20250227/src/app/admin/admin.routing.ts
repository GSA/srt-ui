import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS

import { PrivateComponent } from '../home/private/private.component';
import { MasqComponent } from '../user/masq/masq.component';


import {AuthGuard} from '../auth-guard.service';




const routes: Routes = [
    {
        path: 'user',
        component: PrivateComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: 'masq', component: MasqComponent}
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
