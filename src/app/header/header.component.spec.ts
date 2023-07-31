import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../auth-guard.service';
import { AppComponent } from '../app.component';
import { Globals } from '../../globals';
import { VersionService } from '../shared/services/version.service';
import {ClientVersionService} from '../shared/services/clientVersion.service';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [UserService, AuthService, 
                AuthGuard, AppComponent, Globals, 
                VersionService, ClientVersionService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
