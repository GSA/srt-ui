import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Services
import { UserService } from '../shared/services/user.service';
import { HttpService } from '../shared/services/http.service';
import { AuthService } from '../shared/services/auth.service';
import { EmailService } from '../shared/services/email.service';
import { FileService } from 'app/shared/services/file.service';


//Routes
import { UserRoutingModule } from './user.routing';


//Components
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from 'app/user/profile/profile.component';

// Open Sources
import { DataTableModule, SharedModule, ButtonModule, DropdownModule, CalendarModule } from 'primeng/primeng';
import { Ng2CompleterModule } from "ng2-completer";
import { FileUploadModule } from 'primeng/primeng';



@NgModule({
    imports: [
      CommonModule,
      UserRoutingModule,
      DataTableModule,
      SharedModule,
      ButtonModule,
      DropdownModule,
      CalendarModule,
      FormsModule,
      ReactiveFormsModule,
      Ng2CompleterModule,
      FileUploadModule
    ],
    providers: [
      UserService,
      HttpService,
      AuthService,
      EmailService,
      FileService
    ],
    declarations: [
    ProfileComponent,
    PasswordComponent,
    
    ]
  })
  export class UserModule { }
  