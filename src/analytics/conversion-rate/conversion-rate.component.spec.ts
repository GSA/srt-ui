import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionRateComponent } from './conversion-rate.component';

describe('ConversionRateComponent', () => {
  let component: ConversionRateComponent;
  let fixture: ComponentFixture<ConversionRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversionRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
