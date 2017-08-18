import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Route
import { HelpRoutes } from './help.routing';

// Components
import { HelpComponent } from './help.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutes    
  ],
  declarations: [
    HelpComponent,
    FaqComponent,
    ContactUsComponent,
  ],
  providers: [
    //HelpSer
  ],
  exports: [
    HelpComponent
  ]
})
export class HelpModule { }