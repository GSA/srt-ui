import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAgenciesPercentageComponent } from './top-agencies-percentage.component';

describe('TopAgenciesPercentageComponent', () => {
  let component: TopAgenciesPercentageComponent;
  let fixture: ComponentFixture<TopAgenciesPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAgenciesPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAgenciesPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
