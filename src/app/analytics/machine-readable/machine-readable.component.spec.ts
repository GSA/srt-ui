import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineReadableComponent } from './machine-readable.component';

describe('MachineReadableComponent', () => {
  let component: MachineReadableComponent;
  let fixture: ComponentFixture<MachineReadableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineReadableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineReadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
