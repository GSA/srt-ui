import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollTopModule } from 'primeng/scrolltop';

// Google Analytics
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

// Quill Editor
import { QuillModule } from 'ngx-quill';

// Components
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

// Services
import { FileUploadService } from '../services/file-upload.service';
import { AuthGuard } from '../auth-guard.service';

// Routing
import { HomeRoutingModule } from './home.routing';

import { SolicitationModule } from '../solicitation/solicitation.module';
import { DisclaimerComponent } from '../shared/components/disclaimer/disclaimer.component';


@NgModule({
    declarations: [
        HomeComponent,
        PublicComponent,
        PrivateComponent
    ],
    exports: [
        HomeComponent
    ], imports: [CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        DropdownModule,
        CalendarModule,
        TableModule,
        TooltipModule,
        DialogModule,
        CheckboxModule,
        ScrollTopModule,
        NgxGoogleAnalyticsModule.forRoot('G-RZRRP7Q0BH'),
        NgxGoogleAnalyticsRouterModule,
        QuillModule,
        SolicitationModule,
        DisclaimerComponent], providers: [
            FileUploadService,
            AuthGuard,
            provideHttpClient(withInterceptorsFromDi())
        ]
})
export class HomeModule { }