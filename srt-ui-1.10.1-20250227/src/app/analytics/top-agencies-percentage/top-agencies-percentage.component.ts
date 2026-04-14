import {Component, OnInit, Input} from '@angular/core';


import * as _ from 'underscore';


@Component({
  selector: 'app-top-agencies-percentage',
  templateUrl: './top-agencies-percentage.component.html',
  styleUrls: ['../analytics.component.scss', './top-agencies-percentage.component.scss']
})
export class TopAgenciesPercentageComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() isGovernomentWide: Boolean;
  @Input() TopAgenciesChart;
  @Input() selectedGovernment;
  @Input() barTitle;
  @Input() selectedPeriod;
  @Input() toPeriod;
  @Input() fromPeriod;
  @Input() xAxis;
  @Input() agencyList;

  barData = [];
  angencyTotal = {};
  angencyPass = {};
  angency = {};
  public xAxisUnit = 5;
  public xAxisBreakPoint = [];
  public indexFrom = 0;
  public indexTo = 10;
  public maxSolicitation = 0;
  public noData: Boolean = true;
  public chartToolTip = `The agencies ranking is sorted by Compliance Rate where
    Compliance Rate = (Number of compliant solicitations / Total ICT solicitations)`;

  /* CONSTRUCTOR */

  /**
   * constructor
   */
  constructor() {
  }

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * lifecycle
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {

    if (this.TopAgenciesChart) {
      this.angencyTotal = {};
      this.angencyPass = {};
      this.maxSolicitation = 0;
      this.barData = [];
      if (this.selectedGovernment === 'Government-wide') {
        this.indexFrom = 0;
        this.indexTo = 10;
        this.barTitle = 'Top 10 Section 508 Compliant Agencies';

        // Insert data to the chart
        // tslint:disable-next-line:forin
        for (const key in this.TopAgenciesChart.topAgencies) {
          this.barData.push(
            [key,
              this.TopAgenciesChart.topAgencies[key]['green'] /
              (this.TopAgenciesChart.topAgencies[key]['green'] + this.TopAgenciesChart.topAgencies[key]['red']),
              this.TopAgenciesChart.topAgencies[key]['green'],
              (this.TopAgenciesChart.topAgencies[key]['green'] + this.TopAgenciesChart.topAgencies[key]['red'])
            ]);
        }
        // Sorting by rate
        this.barData.sort(function (a, b) {
          if (b[1] > a[1]) {
            return 1;
          } else if (b[1] < a[1]) {
            return -1;
          } else if (b[1] === a[1]) {
            if (b[3] > a[3]) {
              return 1;
            } else if (b[3] < a[3]) {
              return -1;
            }
          }
        });

        let i = this.indexFrom;
        this.barData.forEach(element => {
          if (i < this.indexTo) {
            if (this.maxSolicitation <= element[3]) {
              this.maxSolicitation = element[3];
            }
          }
          i++;
        });

      } else {
        // Chagne year x-axis format
        if (this.selectedPeriod === 'This Year' || this.selectedPeriod === 'All') {
          this.indexFrom = 1;
          this.indexTo = 13;
          this.barTitle = this.selectedGovernment;

          // Filter by year and agency

          if (this.TopAgenciesChart.topAgencies[this.selectedGovernment] != null) {
            for (const item of this.TopAgenciesChart.topAgencies[this.selectedGovernment]) {
              if (item.date != null) {
                const month = +item.date.split('/')[0];
                if (this.angencyTotal[month] == null) {
                  this.angencyTotal[month] = 1;
                  if (item.predictions.value === 'GREEN') {
                    this.angencyPass[month] = 1;
                  } else {
                    this.angencyPass[month] = 0;
                  }
                } else {
                  this.angencyTotal[month]++;
                  if (item.predictions.value === 'GREEN') {
                    this.angencyPass[month]++;
                  }
                }
              }
            }

            for (let i = 0; i < 13; i++) {
              if (this.angencyPass[i] == null) {
                this.barData.push([i, 0, 0, 0]);
              } else {
                this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
              }
              if (this.maxSolicitation <= this.angencyTotal[i]) {
                this.maxSolicitation = this.angencyTotal[i];
              }
            }
          }

        } else if (this.selectedPeriod === 'This Month') {
          this.indexFrom = 1;
          this.indexTo = this.toPeriod.getDate() + 1;

          this.barTitle = this.selectedGovernment;
          // Filter by year and agency
          if (this.TopAgenciesChart.topAgencies[this.selectedGovernment] != null) {
            for (const item of this.TopAgenciesChart.topAgencies[this.selectedGovernment]) {
              if (item.date != null) {
                const date = +item.date.split('/')[1];
                if (this.angencyTotal[date] == null) {
                  this.angencyTotal[date] = 1;
                  if (item.predictions.value === 'GREEN') {
                    this.angencyPass[date] = 1;
                  } else {
                    this.angencyPass[date] = 0;
                  }
                } else {
                  this.angencyTotal[date]++;
                  if (item.predictions.value === 'GREEN') {
                    this.angencyPass[date]++;
                  }
                }
              }
            }

            for (let i = 0; i < this.indexTo + 1; i++) {
              if (this.angencyPass[i] == null) {
                this.barData.push([i, 0, 0, 0]);
              } else {
                this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
              }
              if (this.maxSolicitation <= this.angencyTotal[i]) {
                this.maxSolicitation = this.angencyTotal[i];
              }
            }
          }
        }
      }
      this.noData = this.barData.length === 0;

    }

    const remain = this.maxSolicitation % this.xAxisUnit;
    this.maxSolicitation = remain !== 0 ? (this.maxSolicitation - remain + this.xAxisUnit) : this.maxSolicitation;
    const a = this.maxSolicitation / this.xAxisUnit;
    this.xAxisBreakPoint = _.range(a + 1);

  }


  /**
   * Get abbr of agency name
   * @param name
   */
  public getAbbr(name) {
    for(let i = 0; i < this.agencyList.length; i++) {
      if (this.agencyList[i].Agency === name && this.agencyList[i].Acronym) {
        return this.agencyList[i].Acronym;
      }
    }

    const matches = name.match(/\b(\w)/g);
    if (!matches) {
      return name;
    }
    const acronym = matches.join('');
    return acronym;
  }
}
