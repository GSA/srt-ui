import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationReportComponent } from './solicitation-report.component';
import {SolicitationService} from '../solicitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {NoticeTypesService} from '../../shared/services/noticeTypes.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import {Globals} from '../../../globals';
import { before } from 'node:test';

describe('SolicitationReportComponent', () => {
  let component: SolicitationReportComponent;
  let fixture: ComponentFixture<SolicitationReportComponent>;

  beforeAll(() => {
  let store = {
    'agency': 'Department of Testing',
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationReportComponent ],
      imports: [HttpClientTestingModule, LoggerTestingModule],
      providers: [SolicitationService, NoticeTypesService, Globals], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem("agency", 'General Services Administration');
    localStorage.setItem("userRole", 'Administrator');
    
  
    
    
  });

  it('should create', () => {
    localStorage.setItem("agency", 'General Services Administration');
    localStorage.setItem("userRole", 'Administrator');
    expect(component).toBeTruthy();
  });

  it('should set agency to empty string if user is an Administrator or SRT Program Manager and agency is GSA', () => {
    
    localStorage.setItem("agency", 'General Services Administration');
    localStorage.setItem("userRole", 'Administrator');
    component.filterParams.agency = 'General Services Administration';
    component.ngOnInit();
    expect(component.filterParams.agency).toEqual('');
    localStorage.setItem("agency", 'General Services Administration');
    localStorage.setItem("userRole", 'SRT Program Manager');
    component.ngOnInit();
    expect(component.filterParams.agency).toEqual('');
  });

  it('should set agency to local storage value if user is not an Administrator or SRT Program Manager and agency is GSA', () => {
    localStorage.setItem("userRole", 'User');
    localStorage.setItem('agency', 'Test Agency');
    component.filterParams.agency = 'General Services Administration';
    component.ngOnInit();
    expect(component.filterParams.agency).toEqual('Test Agency');
  });

  it('should not change agency if agency is not GSA', () => {
    localStorage.setItem("userRole", 'Administrator');
    localStorage.setItem('agency', 'Test Agency');
    component.filterParams.agency = 'Test Agency';
    component.ngOnInit();
    expect(component.filterParams.agency).toEqual('Test Agency');
  });

  it('should select solicitation on mouse up if mouse down and up events occur within 300ms on the same solicitation', () => {
    const solicitation = { id: 1, name: 'Test Solicitation' };
    component.mouseDown(solicitation);
    spyOn(component, 'selectSol');
    component.mouseUp(solicitation);
    expect(component.selectSol).toHaveBeenCalled();
  });

  it('should not select solicitation on mouse up if mouse down and up events occur on different solicitations', () => {
    const solicitation1 = { id: 1, name: 'Test Solicitation 1' };
    const solicitation2 = { id: 2, name: 'Test Solicitation 2' };
    component.mouseDown(solicitation1);
    spyOn(component, 'selectSol');
    component.mouseUp(solicitation2);
    expect(component.selectSol).not.toHaveBeenCalled();
  });

});
