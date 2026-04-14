import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateComponent } from './private.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
