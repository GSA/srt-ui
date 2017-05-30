import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUsImproveComponent } from './help-us-improve.component';

describe('HelpUsImproveComponent', () => {
  let component: HelpUsImproveComponent;
  let fixture: ComponentFixture<HelpUsImproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpUsImproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpUsImproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
