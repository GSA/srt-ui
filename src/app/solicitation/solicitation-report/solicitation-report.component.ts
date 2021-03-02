import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SolicitationService} from '../solicitation.service';
import {LazyLoadEvent, SelectItem} from 'primeng';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';
import {BaseComponent} from '../../base.component';
import {NoticeTypesService} from '../../shared/services/noticeTypes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-solicitation-report',
  templateUrl: './solicitation-report.component.html',
  styleUrls: ['./solicitation-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SolicitationReportComponent extends BaseComponent implements OnInit {



  /* ATTRIBUTES */

  solicitations: Array<any>;
  solicitation = {};
  ict: SelectItem[] = [];
  solType: SelectItem[] = [];
  revResult: SelectItem[] = [];
  loading: boolean;
  totalRecordCount = 0;


  stacked: Boolean = false;

  dateScan: String = '';

  filterParams = {
    agency: '',
    office: '',
    contact: '',
    eitLikelihood: '',
    numDocs: '',
    reviewStatus: '',
    reviewRec: '',
    filters: { 'active': {'value': true, 'matchMode': 'equals' }},
    rows: 15
  };

  columns = [
    { field: 'solNum', title: 'Solicitation ID'},
    { field: 'title', title: 'Solicitation Title'},
    { field: 'noticeType', title: 'Notice Type'},
    { field: 'date', title: 'Date Posted'},
    { field: 'reviewRec', title: 'SRT Review Result'},
    { field: 'actionStatus', title: 'Action Status'},
    { field: 'actionDate', title: 'Latest Action Date'},
    { field: 'agency', title: 'Agency'},
    { field: 'office', title: 'Office'}
  ];


  noticeTypes: Array<Object> = [
    {label : 'All', value : ''}
    ];

  reviewRec: Array<Object> = [
    {label : 'All', value : ''},
    {label : 'Not Applicable', value : 'Not Applicable'},
    {label : 'Non-Compliant', value : 'Non-compliant (Action Required)'},
    {label : 'Compliant', value : 'Compliant'}
  ];

  /**
   * constructor
   * @param solicitationService
   * @param router
   * @param titleService
   * @param noticeTypesService
   * @param renderer
   * @param titleService
   * @param noticeTypesService
   */
  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private titleService: Title,
    private noticeTypesService: NoticeTypesService,
    private renderer: Renderer2
  ) {
    super(titleService);
    this.pageName = 'SRT - Manage/Review Workload';
  }


  /**
   * lifecycle
   */
  ngOnInit() {
    super.ngOnInit();


    this.stacked = window.matchMedia('(max-width: 992px)').matches;
    this.loading = true;
    this.initFilterParams();
    this.solicitationService.getFilteredSolicitations(this.filterParams)
      .subscribe(
        solicitations => {
          this.totalRecordCount = solicitations.totalCount;
          this.solicitations = solicitations.predictions;
          this.solicitationService.solicitations = solicitations.predictions;
          this.dateScan = this.solicitations[0].date;
          $('.pDataTable').show();
          // sorting
          //  this.solicitations = this.sortByReviewResult(this.solicitations);

          this.getNoticeTypes(this.solicitations);
          this.loading = false;

          // give the PrimNG Table time to render, then set the default sort icon manually
          // to cover over a bug where the default column is not getting the arrow rendered
          setTimeout( () => {
            this.renderer.selectRootElement('p-sorticon[ng-reflect-field=\'date\']>i').classList.add('pi-sort-down');
          }, 100);

        },
        err => {
          console.log(err);
          this.loading = false;
        });

    this.noticeTypesService.getNoticeTypes()
      .subscribe( (typesArray: Array<String>) => {
        this.noticeTypes = [{label: 'All', value: ''}];
        for (const t of typesArray) {
          this.noticeTypes.push({label: t, value: t});
        }
      });

    this.ict.push({label: 'All', value: null});
    this.ict.push({label: 'Yes', value: 'Yes'});
    this.ict.push({label: 'No', value: 'No'});

    this.revResult.push({label: 'All', value: null});
    this.revResult.push({label: 'Compliant', value: 'Compliant'});
    this.revResult.push({label: 'Non-compliant (Action Required)', value: 'Non-compliant (Action Required)'});
    this.revResult.push({label: 'Not Applicable', value: 'Not Applicable'});

  }

  loadSolicitationsLazy(event: LazyLoadEvent) {
    this.loading = true;

    this.solicitationService.getFilteredSolicitations(event)
      .subscribe(
        solicitations => {
          this.solicitations = solicitations.predictions;
          this.solicitationService.solicitations = solicitations.predictions;
          this.dateScan = this.solicitations[0] && this.solicitations[0].date;
          $('.pDataTable').show();

          // convert the dates to a nice display format
          const date_options = {year: 'numeric', month: 'short', day: 'numeric'};
          for (const p of this.solicitations) {
            p.date = (new Date(p.date)).toLocaleDateString('en', date_options);
            p.actionDate = (new Date(p.actionDate)).toLocaleDateString('en', date_options);
          }


          this.getNoticeTypes(this.solicitations);
          this.totalRecordCount = solicitations.totalCount;
          this.loading = false;


          // fix accessibility of paginator
          setTimeout( () => {
            $('.ui-paginator-icon.pi-caret-right').attr('title', 'next page');
            $('.ui-paginator-icon.pi-caret-left').attr('title', 'previous page');
            $('a.ui-paginator-first').attr('title', 'first page');
            $('a.ui-paginator-last').attr('title', 'last page');
            $('a.ui-paginator-page').each(
              (idx, el) => {
                const pageNum = $(el).text();
                const title = 'page ' + pageNum;
                $(el).attr('title', title);
                $(el).html(`<span aria-hidden="true">${pageNum}</span>`);
              });
          }, 1000);

        },
        err => {
          console.log(err);
        });

  }

  /**
   * initialize filter
   */
  initFilterParams() {
    const agency = localStorage.getItem('agency');
    const userRole = localStorage.getItem('userRole');
    if (agency.indexOf('General Services Administration') > -1 &&
      (userRole.indexOf('Administrator') > -1 || userRole.indexOf('SRT Program Manager') > -1)) {
      this.filterParams.agency = '';
    } else {
      this.filterParams.agency = localStorage.getItem('agency');
    }
  }

  /**
   * select solicitation
   * Manual review button kicks this off.  navigates to solicitation review page
   * @param solicitation
   */
  selectSol(solicitation: any) {
    const now = moment().format('MM/DD/YYYY');
    const user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    solicitation.history.push({
      'date': now,
      'action': 'reviewed solicitation action requested summary',
      'user': user,
      'status': ''
    });

    this.solicitationService.updateHistory(solicitation)
      .subscribe(
        msg => {
          this.titleService.setTitle('SRT - Solicitation ID ' + msg.id);
          this.router.navigate(['/solicitation/report', msg.id]);
        },
        () => {
          console.log('e131');
        });
  }


  /**
   * get notice types for filter
   * @param solicitations
   */
  getNoticeTypes(solicitations) {
    const noticeTypeMap = {};
    if (solicitations) {
      solicitations.forEach(element => {
        const noticeTypeLabel: String = element.noticeType;
        const noticeTypeValue: String = element.noticeType;
        let noticeCount: Number;
        if (noticeTypeMap.hasOwnProperty(element.noticeType)) {
          noticeCount = noticeTypeMap[element.noticeType].count + 1;
          noticeTypeMap[element.noticeType] = {label: noticeTypeLabel, value: noticeTypeValue, count: noticeCount};
        } else {
          noticeCount = 1;
          noticeTypeMap[element.noticeType] = {label: noticeTypeLabel, value: noticeTypeValue, count: noticeCount};
        }
      });

      this.solType = [];
      this.solType.push({label: 'Any', value: null});
      for (const k in noticeTypeMap) {
        if (noticeTypeMap[k] !== null && noticeTypeMap[k] !== null) {
          this.solType.push({label: noticeTypeMap[k].label + ' (' + noticeTypeMap[k].count + ')', value: noticeTypeMap[k].label});
        }
      }
    }
  }


  /**
   * Copied from the PrimeNG prototype and then modified
   *
   * @param options
   */
  exportCSV (options) {
    const csvSeparator = ',';
    let csv = '';

    // headers
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];
      if (column.field) {
        csv += '"' + (column.title || column.field) + '"';
        if (i < (this.columns.length - 1)) {
          csv += csvSeparator;
        }
      }
    }

    const filter = {first: 0, rows: 1000};
    const appendSolicitations = (solicitations) => {
      document.body.style.cursor = 'wait';
      for (const s of solicitations.predictions) {
        csv += '\n';
        for (let i = 0; i < this.columns.length; i++) {
          csv += '"' + s[this.columns[i].field] + '"' + csvSeparator;
        }
      }
      // if we got them all, send it. Otherwise pull another batch
      if (filter.first === solicitations.totalCount) {
        this.sendBlob(csv);
        document.body.style.cursor = 'default';
      } else {
        filter.first += solicitations.rows;
        this.solicitationService
          .getFilteredSolicitations(filter)
          .subscribe(appendSolicitations);
      }
    };

    this.solicitationService
      .getFilteredSolicitations(filter)
      .subscribe( appendSolicitations );

    return;
  };

  sendBlob(data) {
    const exportFilename = 'srt_data.csv';
    const blob = new Blob([data], {
      type: 'text/csv;charset=utf-8;'
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, exportFilename);
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', exportFilename);
        link.click();
      } else {
        data = 'data:text/csv;charset=utf-8,' + data;
        window.open(encodeURI(data));
      }
      document.body.removeChild(link);
    }

  }

}
