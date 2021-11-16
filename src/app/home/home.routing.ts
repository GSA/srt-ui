import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private/private.component';


import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PrivateComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'home', component: HomeComponent, canActivate : [AuthGuard]},
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




