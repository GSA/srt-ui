import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private/private.component';


import { AuthGuardFn } from '../auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PrivateComponent,
        canActivate: [AuthGuardFn],
        children: [
            {path: 'home', component: HomeComponent, canActivate : [AuthGuardFn]},
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
  export class HomeRoutingModule { }




