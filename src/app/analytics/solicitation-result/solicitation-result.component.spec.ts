import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationResultComponent } from './solicitation-result.component';

describe('SolicitationResultComponent', () => {
  let component: SolicitationResultComponent;
  let fixture: ComponentFixture<SolicitationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitationResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
