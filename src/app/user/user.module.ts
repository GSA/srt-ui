import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Services
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { EmailService } from '../shared/services/email.service';
import { FileService } from 'app/shared/services/file.service';


// Routes
import { UserRoutingModule } from './user.routing';


// Components

// Open Sources
import { SharedModule, ButtonModule, DropdownModule, CalendarModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Ng2CompleterModule } from 'ng2-completer';
import { FileUploadModule } from 'primeng/primeng';
import {MasqComponent} from './masq/masq.component';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    FileUploadModule,
  ],
    providers: [
      UserService,
      AuthService,
      EmailService,
      FileService
    ],
    declarations: [
      MasqComponent
    ]
  })
  export class UserModule { }
