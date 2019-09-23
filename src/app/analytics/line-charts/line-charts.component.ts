import { Component, OnInit, Input, ViewChild, Directive } from '@angular/core';


import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartsModule, Color } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['../analytics.component.css','./line-charts.component.css']
})
export class LineChartsComponent implements OnInit {

  /* ATTRIBUTES */

  @Input() TopAgenciesChart;
  @Input() selectedGovernment;
  @Input() selectedPeriod;
  @Input() toPeriod;
  @Input() fromPeriod;
  @ViewChild(BaseChartDirective, {static: false}) private baseChart;

  public angencyPass = {}
  public angencyTotal = {}
  public barData = [];
  public xAxis = 'Date';
  public yAxis = 'Compliance Rate (%)';

  public lineChartData:Array<any> = [
    { data: [0, 2, 2, 4, 8, 12, 12, 16, 16, 18, 20, 24, 28, 32, 34, 32, 30, 30, 36, 40, 43, 45, 45, 46, 47, 48, 49, 50, 51, 51, 53, 55], label: '' },
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartType: String = 'line';

  public options:any = {
    cutoutPercentage: 85,
    legend: {
        display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
            }],
        yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
            }],
    },
    tooltips: {
      enabled: true,
      callbacks: {
          label: function(tooltipItem, data) {
              return '# scanned solicitations: ' + data.datasets[0].data[tooltipItem.index];
          }
      },
      opacity: 1,
      displayColors: false
    }
  };

  public colorsOverride: Array<Color> = [{
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(44,129,192,1)',
      pointBackgroundColor: 'rgba(44,129,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(44,129,192,1)'
  }];


  /* CONSTRUCTOR */

  /**
   * constructor
   */
  constructor(
  ) {}

  /**
   * lifecycle
   */
  ngOnInit() {
  }

  /**
   * lifecycle
   */
  ngOnChanges() {
    if (this.TopAgenciesChart.topAgencies[this.selectedGovernment] != null) {

        var array = this.TopAgenciesChart.topAgencies[this.selectedGovernment];

        if (this.selectedPeriod == "This Year" || this.selectedPeriod =="All") {
          var percentage:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
          var pass:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
          var total:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
          for (let item of this.TopAgenciesChart.topAgencies[this.selectedGovernment])
          {
              if (item.date != null)
              {
                  var date = +item.date.split('/')[0];
                  if (item.predictions.value == 'green') pass[date-1]++;
                  total[date-1]++;
              }
          }
          for (var i = 0; i < total.length; i++) percentage[i] = total[i] == 0 ? 0 : (Math.round(pass[i] / total[i] * 1000)/10);
          this.lineChartData = [{data: percentage}];
          this.lineChartLabels = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
           this.options["tooltips"].callbacks = {
              beforeLabel :function(tooltipItem, data) {
                  return "Compliance Rate: " + percentage[tooltipItem.index] + "%";
              },
              label: function(tooltipItem, data) {
                  return "Compliance Solicitation: " + pass[tooltipItem.index];;
              },
              afterLabel: function(tooltipItem, data) {
                  var no =  total[tooltipItem.index] - pass[tooltipItem.index]
                  return "Non-Compliance Solicitation:" + no;
              }
          }
          this.xAxis = "Month";
          this.forceChartRefresh();
        }
        else if (this.selectedPeriod == "This Month")
        {
          var indexFrom = 1;
          var indexTo = this.toPeriod.getDate() + 1;
          var percentage:any[] = [];
          var pass:any[] = [];
          var total:any[] = [];
          this.lineChartLabels = [];
          var month = new Date().getMonth() + 1
          for(var i = 1;  i < indexTo; i ++)
          {
            this.lineChartLabels.push(month+"/"+i)
            percentage.push(0);
            pass.push(0);
            total.push(0);
          }

          for (let item of this.TopAgenciesChart.topAgencies[this.selectedGovernment])
          {
              if (item.date != null)
              {
                  var date = +item.date.split('/')[1];
                  if (item.predictions.value == 'green') pass[date-1]++;
                  total[date-1]++;
              }
          }
          for (var i = 0; i < total.length; i++) percentage[i] = total[i] == 0 ? 0 : (Math.round(pass[i] / total[i] * 1000)/10);
          this.lineChartData = [{data: percentage}];
          this.options["tooltips"].callbacks = {
              beforeLabel :function(tooltipItem, data) {
                  return "Compliance Rate: " + percentage[tooltipItem.index] + "%";
              },
              label: function(tooltipItem, data) {
                  return "Compliance Solicitation: " + pass[tooltipItem.index];;
              },
              afterLabel: function(tooltipItem, data) {
                  var no =  total[tooltipItem.index] - pass[tooltipItem.index]
                  return "Non-Compliance Solicitation:" + no;
              }
          }
          this.xAxis = "Date";
          this.forceChartRefresh();
        }

    }
    else
    {
        this.lineChartData = [
            {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: ''},
        ];
        this.lineChartLabels = [];
    }
  }


  /**
   * refresf chart
   */
  forceChartRefresh() {
      setTimeout(() => {
          this.baseChart.refresh();
      }, 10);
  }

}
