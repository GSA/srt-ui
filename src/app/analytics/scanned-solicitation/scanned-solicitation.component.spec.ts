import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedSolicitationComponent } from './scanned-solicitation.component';

describe('ScannedSolicitationComponent', () => {
  let component: ScannedSolicitationComponent;
  let fixture: ComponentFixture<ScannedSolicitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedSolicitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedSolicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
