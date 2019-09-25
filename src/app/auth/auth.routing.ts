import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS

import { PublicComponent } from '../home/public/public.component';
import { AuthComponent } from './auth.component';

import { AuthGuard } from '../auth-guard.service';


const routes: Routes = [
    {
        path: 'auth',
        component: PublicComponent,
        children: [
            {path: '', redirectTo: 'signin', pathMatch: 'full'},
            {path: 'signin', component: AuthComponent}
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
