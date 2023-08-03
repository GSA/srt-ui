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

  it('should format date correctly', () => {
    const date = new Date('2022-01-01T12:00:00.000Z');
    expect(component.formatDate(date)).toEqual('20220101');
  });

  it('should filter recent dates correctly', () => {
    const fromDate = new Date('2022-01-01T00:00:00.000Z');
    const inArray = {
      '20211231': 1,
      '20220101': 2,
      '20220102': 3,
    } as any;
    const expected = {
      '20220101': 2,
      '20220102': 3,
    };

    expect(component.filterRecentDates(fromDate, inArray)).toEqual(expected);
  });

  it('should strip years correctly', () => {
    const inArray = {
      '20220101': 1,
      '20220102': 2,
      '20220103': 3,
    };
    const expected = {
      '0101': 1,
      '0102': 2,
      '0103': 3,
    };
    expect(component.stripYears(inArray)).toEqual(expected);
  });

  it('should build table correctly', () => {
    const data = [1, 2, 3];
    const labels = ['1/01', '1/02', '1/03'];
    const expected = '' +
      '<table class="visually-hidden">' +
      ' <caption>Scanned Solicitations in the Last 30 Days</caption>' +
      ' <thead>' +
      '  <tr>' +
      '   <th scope="col">Date</th>' +
      '   <th scope="col">Number of Solicitations</th>' +
      '  </tr>' +
      ' </thead>' +
      ' <tbody>' +
      '<tr><td>January 01</td><td>1</td></tr>' +
      '<tr><td>January 02</td><td>2</td></tr>' +
      '<tr><td>January 03</td><td>3</td></tr>' +
      '</tbody>' +
      '</table>';
    expect(component.buildTable(data, labels)).toEqual(expected);
  });

});
