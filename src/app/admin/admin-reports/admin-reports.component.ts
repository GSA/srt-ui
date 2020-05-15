import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginReportService} from './login-report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  loginData: any;
  chartOptions: any;
  userData: any;
  userChartCols: any;
  msInDay = 24 * 60 * 60 * 1000;
  today: Date;
  RANGE_OF_LOGIN_CHART = 30;

  constructor(private loginReportService: LoginReportService) {

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); // dates from db don't include timestamp, so remove that from our 'today' var


    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          display: true,
          type: 'time',
          time: {
            parser: 'MM/DD/YYYY',
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
              'day': 'MM/DD/YYYY'
            }
          }
        } ]
      }
    };


    this.userChartCols = [
      { field: 'email', header: 'Email Address'},
      { field: 'lastLogin', header: 'Last Login'},
      { field: 'sevenDays', header: 'Logins Last 7 Days'},
      { field: 'thirtyDays', header: 'Logins Last 30 Days'},
      { field: 'totalLogins', header: 'Total Logins All Time'}
    ];

    loginReportService.getLoginReport()
      .subscribe(
        data => {
          this.chartifyLoginReport(data);
          this.chartifyUserReport(data);

        },
        error => {
          console.log(error);
        }
      );
  }


  chartifyLoginReport(data: any) {

    this.loginData = {
      labels: [],
      datasets: [{label: 'User Logins', data: [], fill: false, backgroundColor: '#2C81C0'}],
    };

    Object.keys(data).forEach(date => {

      const dateLogin = new Date(date);
      const daysAgo = (this.today.getTime() - dateLogin.getTime()) / this.msInDay;

      if (daysAgo < this.RANGE_OF_LOGIN_CHART) {
        this.loginData.labels.push(date);

        let loginsForDay = 0;
        Object.keys(data[date]).forEach(email => {
          loginsForDay += data[date][email];
        });
        this.loginData.datasets[0].data.push(loginsForDay);
      }
    });
  }

  chartifyUserReport(data: any) {

    this.userData = [];
    const userAccumulator = {};
    const totals = {
      email: 'All Users',
      lastLogin: '',
      sevenDays: 0,
      thirtyDays: 0,
      totalLogins: 0
    };

    Object.keys(data).forEach(date => {

      Object.keys(data[date]).forEach(email => {
        if (! userAccumulator[email]) {
          userAccumulator[email] = { email: email, totalLogins: 0, sevenDays: 0, thirtyDays: 0, lastLogin: date};
        }
        userAccumulator[email].totalLogins += data[date][email];
        totals.totalLogins += data[date][email];

        // check if this is a more recent login
        if (new Date(userAccumulator[email].lastLogin) < new Date(date)) {
          userAccumulator[email].lastLogin = date;
        };

        const dateLogin = new Date(date);
        const daysAgo = (this.today.getTime() - dateLogin.getTime()) / this.msInDay;

        if (daysAgo < 7) {
          userAccumulator[email].sevenDays += data[date][email];
          totals.sevenDays += data[date][email];
        }

        if (daysAgo < 30) {
          userAccumulator[email].thirtyDays += data[date][email];
          totals.thirtyDays += data[date][email];
        }

      });
    });

    Object.keys(userAccumulator).forEach( email => {
      this.userData.push(userAccumulator[email]);
    });
    this.userData.push(totals);
  }

  ngOnInit() {
  }

}
