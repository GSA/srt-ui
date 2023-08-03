import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSrtActionsComponent } from './top-srt-actions.component';
import { TooltipModule } from 'primeng/tooltip';


describe('TopSrtActionsComponent', () => {
  let component: TopSrtActionsComponent;
  let fixture: ComponentFixture<TopSrtActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSrtActionsComponent ],
      imports: [TooltipModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSrtActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set attributes when TopSRTActionChart is set', () => {
    const chartData = {
      determinedICT: 10,
      uncompliance: 20,
      review: 5,
      email: 15,
      updatedICT: 8,
      updatedCompliantICT: 6,
      updatedNonCompliantICT: 2,
      params: {
        agency: 'Government-wide'
      }
    };
    component.TopSRTActionChart = chartData;
    component.ngOnChanges();
    expect(component.solicitationNumber).toBe(10);
    expect(component.nonCompliantICTNumber).toBe(20);
    expect(component.reviewed).toBe(5);
    expect(component.emailSend).toBe(15);
    expect(component.updatedICTNumber).toBe(8);
    expect(component.updatedCompliantICTNumber).toBe(6);
    expect(component.updatedNonCompliantICTNumber).toBe(2);
    expect(component.selectedAgency).toBe('all federal agencies');
  });

  it('should set selectedAgency correctly when agency is not Government-wide', () => {
    const chartData = {
      determinedICT: 10,
      uncompliance: 20,
      review: 5,
      email: 15,
      updatedICT: 8,
      updatedCompliantICT: 6,
      updatedNonCompliantICT: 2,
      params: {
        agency: 'Department of Defense'
      }
    };
    component.TopSRTActionChart = chartData;
    component.ngOnChanges();
    expect(component.selectedAgency).toBe('the Department of Defense');
  });

});
