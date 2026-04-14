import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAgenciesComponent } from './top-agencies.component';
import { TooltipModule } from 'primeng/tooltip';

describe('TopAgenciesComponent', () => {
  let component: TopAgenciesComponent;
  let fixture: ComponentFixture<TopAgenciesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAgenciesComponent ],
      imports: [TooltipModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
