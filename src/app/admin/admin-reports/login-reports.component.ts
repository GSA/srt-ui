import {Component, OnInit} from '@angular/core';
import {LoginReportService} from './login-report.service';
import {SelectItem} from 'primeng/api';
import {saveAs} from 'file-saver';
import {parse} from 'json2csv';

interface TimeSelection {
  days: number;
}

@Component({
  selector: 'app-login-reports',
  templateUrl: './login-reports.component.html',
  styleUrls: ['./login-reports.component.css']
})

export class LoginReportsComponent implements OnInit {
  loginData: any;
  chartOptions: any;
  userData: any;
  userChartCols: any;
  msInDay = 24 * 60 * 60 * 1000;
  today: Date;
  readerSupplement = '';
  timeSelection: SelectItem[];
  selection: TimeSelection;
  data = null;

  constructor(private loginReportService: LoginReportService) {

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); // dates from db don't include timestamp, so remove that from our 'today' var

    this.timeSelection = [
      {label: 'Show 7 days', value: {days: 7}},
      {label: 'Show 14 days', value: {days: 14}},
      {label: 'Show 30 days', value: {days: 30}},
      {label: 'Show 60 days', value: {days: 60}},
      {label: 'Show 90 days', value: {days: 90}},
      {label: 'Show 180 days', value: {days: 180}},
      {label: 'Show 365 days', value: {days: 365}}
    ];
    this.selection = {days: 30};

    this.chartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Total number of logins'
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
        }]
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
          this.data = data;
          this.chartifyLoginReport(data);
          this.chartifyUserReport(data);

        },
        error => {
          console.log(error);
        }
      );
  }


  chartifyLoginReport(data: any) {

    if (this.selection.days > 90) {
      this.chartOptions.scales.xAxes[0].time.unit = 'month';
    } else if (this.selection.days > 30) {
      this.chartOptions.scales.xAxes[0].time.unit = 'week';
    } else {
      this.chartOptions.scales.xAxes[0].time.unit = 'day';
    }

    this.loginData = {
      labels: [],
      datasets: [{label: 'User Logins', data: [], fill: false, backgroundColor: '#2C81C0'}],
    };
    this.readerSupplement = '<table style="border: 1px black solid"><thead><tr><th>Date</th><th>Login Count</th></tr></thead>';

    Object.keys(data).forEach(date => {
      const dateLogin = new Date(date);
      const daysAgo = (this.today.getTime() - dateLogin.getTime()) / this.msInDay;


      if (daysAgo < this.selection.days) {
        this.loginData.labels.push(date);

        let loginsForDay = 0;
        Object.keys(data[date]).forEach(email => {
          loginsForDay += data[date][email];
        });
        this.loginData.datasets[0].data.push(loginsForDay);

        this.readerSupplement += `<tr><td>${date}</td><td>${loginsForDay}</td>`;
      }
    });
    this.readerSupplement += '</table>';
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
        }

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

  timeChange(event) {
    this.selection = event.value;
    this.chartifyLoginReport(this.data);
  }

  downloadLoginData(data: any) {

    const flatData = [];
    Object.keys(data).forEach( day => {
      Object.keys(data[day]).forEach( email => {
        flatData.push(
          {date: day, email: email, 'number of logins': data[day][email]}
        );
      });

    });

    const csv = parse(flatData, ['email', 'date', 'number of logins']);
    saveAs(new Blob([csv], {type: 'text/csv; charset=utf-8'}), 'srt-login-report.csv');
  }

  ngOnInit() {
  }

}
