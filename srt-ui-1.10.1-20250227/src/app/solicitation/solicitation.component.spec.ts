import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationComponent } from './solicitation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SolicitationComponent', () => {
  let component: SolicitationComponent;
  let fixture: ComponentFixture<SolicitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
