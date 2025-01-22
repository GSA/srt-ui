import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { FaqComponent} from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
    { path: 'help',
        component: HelpComponent,
        children: [
            { path: 'faq', component: FaqComponent,  },
            { path: 'faq/:id', component: FaqComponent, canActivate: [AuthGuard] },
            { path: 'contactus', component: ContactUsComponent, },
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
  export class HelpRoutesModule { }

