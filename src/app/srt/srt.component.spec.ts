import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrtComponent } from './srt.component';

describe('SrtComponent', () => {
  let component: SrtComponent;
  let fixture: ComponentFixture<SrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
