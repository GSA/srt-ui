import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeterminedSolicitationsComponent } from './undetermined-solicitations.component';

describe('UndeterminedSolicitationsComponent', () => {
  let component: UndeterminedSolicitationsComponent;
  let fixture: ComponentFixture<UndeterminedSolicitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeterminedSolicitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeterminedSolicitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
