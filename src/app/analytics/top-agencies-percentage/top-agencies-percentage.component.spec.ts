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

  it('should get agency abbreviation', () => {
    const agencyList = [
      { Agency: 'Department of Agriculture', Acronym: 'USDA' },
      { Agency: 'Department of Commerce', Acronym: 'DOC' },
      { Agency: 'Department of Defense', Acronym: 'DOD' },
    ];
    component.agencyList = agencyList;
    expect(component.getAbbr('Department of Agriculture')).toEqual('USDA');
    expect(component.getAbbr('Department of Commerce')).toEqual('DOC');
    expect(component.getAbbr('Department of Defense')).toEqual('DOD');
    expect(component.getAbbr('Department of Education')).toEqual('DoE');
  });

  it('should generate bar data for government-wide selection', () => {
    component.TopAgenciesChart = {
      topAgencies: {
        'Department of Agriculture': { green: 10, red: 2 },
        'Department of Commerce': { green: 8, red: 4 },
        'Department of Defense': { green: 6, red: 6 },
      },
    };
    component.selectedGovernment = 'Government-wide';
    console.log('maxSolicitation Before ngOnChanges', component.maxSolicitation);
    component.ngOnChanges();
    console.log('maxSolicitation After ngOnChanges', component.maxSolicitation);

    expect(component.barTitle).toEqual('Top 10 Section 508 Compliant Agencies');
    expect(component.barData.length).toEqual(3);
    expect(component.barData[0]).toEqual(['Department of Agriculture', 0.8333333333333334, 10, 12]);
    expect(component.barData[1]).toEqual(['Department of Commerce', 0.6666666666666666, 8, 12]);
    expect(component.barData[2]).toEqual(['Department of Defense', 0.5, 6, 12]);

    /* 
    xAxisUnit = 5;
    maxSolicitation = 12;

    const remain = this.maxSolicitation % this.xAxisUnit;
    this.maxSolicitation = remain !== 0 ? (this.maxSolicitation - remain + this.xAxisUnit) : this.maxSolicitation;
    */

    expect(component.maxSolicitation).toEqual(15);

  });

  it('should generate bar data for yearly selection', () => {
    component.TopAgenciesChart = {
      topAgencies: {
        'Department of Agriculture': [
          { date: '1/1', predictions: { value: 'GREEN' } },
          { date: '2/1', predictions: { value: 'RED' } },
          { date: '3/1', predictions: { value: 'GREEN' } },
          { date: '4/1', predictions: { value: 'GREEN' } },
          { date: '5/1', predictions: { value: 'GREEN' } },
          { date: '6/1', predictions: { value: 'GREEN' } },
          { date: '7/1', predictions: { value: 'GREEN' } },
          { date: '8/1', predictions: { value: 'GREEN' } },
          { date: '9/1', predictions: { value: 'GREEN' } },
          { date: '10/1', predictions: { value: 'GREEN' } },
          { date: '11/1', predictions: { value: 'GREEN' } },
          { date: '12/1', predictions: { value: 'GREEN' } },
        ],
      },
    };
    component.selectedGovernment = 'Department of Agriculture';
    component.selectedPeriod = 'This Year';
    component.xAxisUnit = 1;
    component.ngOnChanges();
    expect(component.barTitle).toEqual('Department of Agriculture');
    expect(component.barData.length).toEqual(13);
    expect(component.barData[0]).toEqual([0, 0, 0, 0]);
    expect(component.barData[1]).toEqual([1, 1, 1, 1]);
    expect(component.barData[2]).toEqual([2, 0, 0, 1]);
    expect(component.barData[3]).toEqual([3, 1, 1, 1]);
    expect(component.barData[4]).toEqual([4, 1, 1, 1]);
    expect(component.barData[5]).toEqual([5, 1, 1, 1]);
    expect(component.barData[6]).toEqual([6, 1, 1, 1]);
    expect(component.barData[7]).toEqual([7, 1, 1, 1]);
    expect(component.barData[8]).toEqual([8, 1, 1, 1]);
    expect(component.barData[9]).toEqual([9, 1, 1, 1]);
    expect(component.barData[10]).toEqual([10, 1, 1, 1]);
    expect(component.barData[11]).toEqual([11, 1, 1, 1]);
    expect(component.barData[12]).toEqual([12, 1, 1, 1]);

    expect(component.maxSolicitation).toEqual(1);
  });

  it('should generate bar data for monthly selection', () => {
    component.TopAgenciesChart = {
      topAgencies: {
        'Department of Agriculture': [
          { date: '1/1', predictions: { value: 'GREEN' } },
          { date: '1/1', predictions: { value: 'GREEN' } },
          { date: '1/2', predictions: { value: 'RED' } },
          { date: '1/3', predictions: { value: 'GREEN' } },
          { date: '1/4', predictions: { value: 'GREEN' } },
          { date: '1/5', predictions: { value: 'GREEN' } },
          { date: '1/6', predictions: { value: 'GREEN' } },
          { date: '1/7', predictions: { value: 'GREEN' } },
          { date: '1/8', predictions: { value: 'GREEN' } },
          { date: '1/9', predictions: { value: 'GREEN' } },
          { date: '1/10', predictions: { value: 'GREEN' } },
          { date: '1/11', predictions: { value: 'GREEN' } },
          { date: '1/12', predictions: { value: 'GREEN' } },
          { date: '1/13', predictions: { value: 'GREEN' } },
          { date: '1/14', predictions: { value: 'GREEN' } },
          { date: '1/15', predictions: { value: 'GREEN' } },
          { date: '1/16', predictions: { value: 'GREEN' } },
          { date: '1/17', predictions: { value: 'GREEN' } },
          { date: '1/18', predictions: { value: 'GREEN' } },
          { date: '1/19', predictions: { value: 'GREEN' } },
          { date: '1/20', predictions: { value: 'GREEN' } },
          { date: '1/21', predictions: { value: 'GREEN' } },
          { date: '1/22', predictions: { value: 'GREEN' } },
          { date: '1/23', predictions: { value: 'GREEN' } },
          { date: '1/24', predictions: { value: 'GREEN' } },
          { date: '1/25', predictions: { value: 'GREEN' } },
          { date: '1/26', predictions: { value: 'GREEN' } },
          { date: '1/27', predictions: { value: 'GREEN' } },
          { date: '1/28', predictions: { value: 'GREEN' } },
          { date: '1/29', predictions: { value: 'GREEN' } },
          { date: '1/30', predictions: { value: 'GREEN' } },
          { date: '1/31', predictions: { value: 'GREEN' } },
        ],
      },
    };
    component.selectedGovernment = 'Department of Agriculture';
    component.selectedPeriod = 'This Month';
    component.xAxisUnit = 1;
    component.toPeriod = new Date('2022-01-31');
    component.ngOnChanges();
    expect(component.barTitle).toEqual('Department of Agriculture');
    expect(component.barData.length).toEqual(32);
    expect(component.barData[0]).toEqual([0, 0, 0, 0]);
    expect(component.barData[1]).toEqual([1, 1, 2, 2]);
    expect(component.barData[2]).toEqual([2, 0, 0, 1]);
    expect(component.barData[3]).toEqual([3, 1, 1, 1]);
    expect(component.barData[4]).toEqual([4, 1, 1, 1]);
    expect(component.barData[5]).toEqual([5, 1, 1, 1]);
    expect(component.barData[6]).toEqual([6, 1, 1, 1]);
    expect(component.barData[7]).toEqual([7, 1, 1, 1]);
    expect(component.barData[8]).toEqual([8, 1, 1, 1]);
    expect(component.barData[9]).toEqual([9, 1, 1, 1]);
    expect(component.barData[10]).toEqual([10, 1, 1, 1]);
    expect(component.barData[11]).toEqual([11, 1, 1, 1]);
    expect(component.barData[12]).toEqual([12, 1, 1, 1]);
    expect(component.barData[13]).toEqual([13, 1, 1, 1]);
    expect(component.barData[14]).toEqual([14, 1, 1, 1]);
    expect(component.barData[15]).toEqual([15, 1, 1, 1]);
    expect(component.barData[16]).toEqual([16, 1, 1, 1]);
    expect(component.barData[17]).toEqual([17, 1, 1, 1]);
    expect(component.barData[18]).toEqual([18, 1, 1, 1]);
    expect(component.barData[19]).toEqual([19, 1, 1, 1]);
    expect(component.barData[20]).toEqual([20, 1, 1, 1]);
    expect(component.barData[21]).toEqual([21, 1, 1, 1]);
    expect(component.barData[22]).toEqual([22, 1, 1, 1]);
    expect(component.barData[23]).toEqual([23, 1, 1, 1]);
    expect(component.barData[24]).toEqual([24, 1, 1, 1]);
    expect(component.barData[25]).toEqual([25, 1, 1, 1]);
    expect(component.barData[26]).toEqual([26, 1, 1, 1]);
    expect(component.barData[27]).toEqual([27, 1, 1, 1]);
    expect(component.barData[28]).toEqual([28, 1, 1, 1]);
    expect(component.barData[29]).toEqual([29, 1, 1, 1]);
    expect(component.barData[30]).toEqual([30, 1, 1, 1]);
    expect(component.barData[31]).toEqual([31, 1, 1, 1]);
    expect(component.maxSolicitation).toEqual(2);

    console.log('barData', component.angencyTotal);
  });

});
