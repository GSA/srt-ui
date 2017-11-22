import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS

import { HomeComponent } from './home/home.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

// ROUTES

import { HomeRoutingModule } from './home.routing'


@NgModule({
    imports: [
      CommonModule,
      HomeRoutingModule,
    ],
    declarations: [
      HomeComponent,
     
      PublicComponent,
      PrivateComponent
    ],
  })
  export class HomeModule { }
  