import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedSolicitationComponent } from './scanned-solicitation.component';
import { AnalyticsService } from '../services/analytics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScannedSolicitationComponent', () => {
  let component: ScannedSolicitationComponent;
  let fixture: ComponentFixture<ScannedSolicitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedSolicitationComponent ],
      providers: [AnalyticsService],
      imports: [HttpClientTestingModule]
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
