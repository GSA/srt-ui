import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {AppComponent} from '../../app.component';
import { UserloginComponent } from './userlogin.component';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthService} from '../../shared/services/auth.service';
import {UserService} from '../../shared/services/user.service';
import {AuthGuard} from '../../auth-guard.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {Globals} from '../../../globals';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [UserloginComponent],
    imports: [RouterTestingModule.withRoutes([])],
    providers: [AppComponent, UserService, AuthService, AuthGuard, Globals, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
