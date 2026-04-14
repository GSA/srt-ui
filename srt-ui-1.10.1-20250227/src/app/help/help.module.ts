import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Route
import { HelpRoutesModule } from './help.routing';

// Components
import { HelpComponent } from './help.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

// Services
import { HelpService } from '../shared/services/help.service';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HelpComponent,
    FaqComponent,
    ContactUsComponent,
  ],
  providers: [
    HelpService
  ],
  exports: [
    HelpComponent
  ]
})
export class HelpModule { }
