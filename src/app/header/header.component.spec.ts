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
import { AuthComponent } from 'app/auth/auth.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  
  beforeAll(() => {
    let store = {
      'firstName': 'Test',
    } as any;
  
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (var member in store) delete store[member];
      }};
  
      spyOn(window.localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(Storage.prototype, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(Storage.prototype, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(Storage.prototype, 'clear')
        .and.callFake(mockLocalStorage.clear);
  
    });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [UserService, AuthService, 
                AuthGuard, AppComponent, Globals, 
                VersionService, ClientVersionService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: 'auth', component: AuthComponent}
      ])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    spyOn(authService, 'logout');
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should save current user information to localstorage', () => {
    const currentUser = { firstName: 'John' };
    component.saveCurrentUser(currentUser);
    expect(component.firstName).toEqual('John');
    expect(localStorage.getItem('firstName')).toEqual('John');
  });

});
