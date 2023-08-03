import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from '../../auth-guard.service';
import { AuthService } from 'app/shared/services/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeAll(() => {
    let store = {
      'id': '123',
      'userRole': 'customer test'
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
      declarations: [ HomeComponent ],
      providers: [AuthGuard, AuthService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.currentID).toEqual('123');

  });
});
