import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './shared/services/auth.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Globals} from '../globals';
import { HeaderComponent } from './header/header.component';
import { UserService } from './shared/services/user.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [ AuthService, AuthGuard, 
                   HttpClient, HttpHandler, Globals,
                   UserService]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
