import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAgenciesPercentageComponent } from './top-agencies-percentage.component';
import { TooltipModule } from 'primeng/tooltip';

describe('TopAgenciesPercentageComponent', () => {
  let component: TopAgenciesPercentageComponent;
  let fixture: ComponentFixture<TopAgenciesPercentageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAgenciesPercentageComponent ],
      imports: [TooltipModule]
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
