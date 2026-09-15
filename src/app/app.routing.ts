import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS

import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardFn } from './auth-guard.service';
import {HelpComponent} from './help/help.component';
import {MasqComponent} from './user/masq/masq.component';
import {AdminGuardFn} from './admin-guard.service';
import {AiPipelineComponent} from './analytics/ai-pipeline/ai-pipeline.component';
import {AiPlaygroundComponent} from './analytics/ai-playground/ai-playground.component';
import {AiAnalyticsComponent} from './analytics/ai-analytics/ai-analytics.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuardFn]},
  {path: 'auth', component: AuthComponent},
  {path: 'admin/accepted', component: AdminComponent, canActivate: [AdminGuardFn] , data: { isAccepted: true, isRejected: false }},
  {path: 'admin/masq', component: MasqComponent, canActivate: [AdminGuardFn] , data: {}},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuardFn] , data: { isAccepted: false, isRejected: false }},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [AdminGuardFn]},
  {path: 'analytics/ai-pipeline', component: AiPipelineComponent, canActivate: [AdminGuardFn]},
  {path: 'analytics/ai-playground', component: AiPlaygroundComponent, canActivate: [AdminGuardFn]},
  {path: 'analytics/ai-analytics', component: AiAnalyticsComponent, canActivate: [AdminGuardFn]},
  {path: 'help', component: HelpComponent, canActivate: [AuthGuardFn]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

