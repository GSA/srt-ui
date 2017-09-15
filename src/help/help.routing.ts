
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component'
import { FaqComponent} from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AuthGuard } from '../app/auth-guard.service'

const helpRoutes: Routes = [
    { path: 'help',
        component: HelpComponent,
        children: [
            { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
            { path: 'faq/:id', component: FaqComponent, canActivate: [AuthGuard] },
            { path: 'contactus', component: ContactUsComponent, canActivate: [AuthGuard] },
        ]
    },

]

export const HelpRoutes = RouterModule.forChild(helpRoutes);
