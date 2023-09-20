import {Component, OnInit} from '@angular/core';
import {LoginReportService} from './login-report.service';
import {SelectItem} from 'primeng/api';
import {saveAs} from 'file-saver';
import {parse} from 'json2csv';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
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
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total number of logins'
          }
        },
        x: {
          adapters: { 
            date: {
              locale: enUS, 
            },
          },
          display: true,
          type: 'time',
          time: {
            parser: 'MM/dd/yyyy',
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
              'day': 'MM/dd/yyyy'
            }
          }
        }
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
      .subscribe({
        next: (data) => {
          this.data = data;
          this.chartifyLoginReport(data);
          this.chartifyUserReport(data);

        },
        error: (error) => {
          console.log(`getLoginReport error -- ${error}`);
        }
      }
      );
  }


  chartifyLoginReport(data: any) {

    if (this.selection.days > 90) {
      this.chartOptions.scales.x.time.unit = 'month';
    } else if (this.selection.days >= 30) {
      this.chartOptions.scales.x.time.unit = 'week';
    } else {
      this.chartOptions.scales.x.time.unit = 'day';
    }

    this.loginData = {
      labels: [],
      datasets: [
        {
          label: 'User Logins', 
          data: [], 
          fill: false, 
          backgroundColor: '#2C81C0'
        }],
    };

    // Grab dates from current date back the select number of days
    let chartLabelData: Array<Date> = (() => {
      let current_date = new Date();
      current_date.setHours(0, 0, 0, 0);
      let empty_dates = [];
    
      for (let i = 0; i <= this.selection.days ; i++) {
        empty_dates.push(new Date(current_date));
        current_date.setDate(current_date.getDate() - 1);
      }
      
      return empty_dates.reverse();
    })();

    let chartLoginData = Array(this.selection.days).fill(0);

    this.loginData.labels = chartLabelData;
    
    this.readerSupplement = '<table style="border: 1px black solid"><thead><tr><th>Date</th><th>Login Count</th></tr></thead>';

    Object.keys(data).forEach(date => {
      const dateLogin = new Date(date);
      
      let index;
      if ((index = chartLabelData.findIndex( 
        function (x) {
            // Need to look at Value of Date because the Date object is different
            return x.valueOf() === dateLogin.valueOf();
          }
          )) != -1) {
        let loginsForDay = 0;
        Object.keys(data[date]).forEach(email => {
          loginsForDay += data[date][email];
        });

        chartLoginData[index] = loginsForDay;

        this.readerSupplement += `<tr><td>${date}</td><td>${loginsForDay}</td>`;
      }
    });

    this.loginData.datasets[0].data = chartLoginData;
    console.log('Login data', this.loginData)
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
