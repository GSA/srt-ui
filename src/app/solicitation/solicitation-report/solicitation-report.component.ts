import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SolicitationService} from '../solicitation.service';
import {LazyLoadEvent, SelectItem} from 'primeng';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';
import {BaseComponent} from '../../base.component';
import {NoticeTypesService} from '../../shared/services/noticeTypes.service';
import * as moment from 'moment';
import {environment} from 'environments/environment';

interface TableSort {
  field: string;
  order: number;
}
interface TableState {
  first: number;
  rows: number;
  filter: any;
  sort: TableSort;
  version: number;
  timestamp: number;
}

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
  mouseDownTimestamp: number;
  mouseDownSolicitation: any;
  ict: SelectItem[] = [];
  solType: SelectItem[] = [];
  revResult: SelectItem[] = [];
  loading: boolean;
  totalRecordCount = 0;
  feature_flags = environment.feature_flags;
  tableStateVersion = 1;
  tableState: TableState =
    {
      first: 0,
      rows: 15,
      filter: {'active': {'value': true, 'matchMode': 'equals' }},
      sort: {field: 'date', order: -1},
      version: 1,
      timestamp: 0
    };
  noticeTypeFilterModel: string;
  reviewResultFilterModel: string;

  stacked: Boolean = false;

  dateScan: String = '';

  filterParams = {
    agency: '',
    office: '',
    contact: '',
    category_list: '',
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
    {label : 'Non-Compliant', value : 'Non-compliant (Action Required)'},
    {label : 'Compliant', value : 'Compliant'},
    {label : 'Not Applicable', value : 'Not Applicable'},
  ];

  epaDropdown: Array<Object> = [
    {label : 'All', value : ''},
    {label : 'Non-Compliant', value : 'red'},
    {label : 'Compliant', value : 'green'},
    {label : 'Not Applicable', value : 'Not Applicable'},
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

    if (environment.feature_flags.estar) {
      // insert the new energy star column after reviewRec
      let i = 0;
      for (; i < this.columns.length; i++) {
        if (this.columns[i].field === 'reviewRec') {
          break;
        }
      }
      this.columns.splice(i + 1, 0, {field: 'predictions.estar', title: 'EPA Review Result'});
    }

    this.retstoreState();
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
          this.dateScan = this.solicitations[0] ? this.solicitations[0].date : null;
          $('.pDataTable').show();
          // sorting
          //  this.solicitations = this.sortByReviewResult(this.solicitations);

          this.getNoticeTypes(this.solicitations);
          setTimeout(() => {this.loading = false; } , 1); // don't change the view data while we are rendering it.

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
    this.filterChange();
    this.loading = true;
    event.filters = { ...event.filters, ...this.tableState.filter};

    this.solicitationService.getFilteredSolicitations(event)
      .subscribe(
        solicitations => {
          this.solicitations = solicitations.predictions;
          this.solicitationService.solicitations = solicitations.predictions;
          this.dateScan = this.solicitations[0] && this.solicitations[0].date;
          $('.pDataTable').show();

          // convert the dates to a nice display format
          const date_options = {year: 'numeric', month: 'short', day: 'numeric'} as const;
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
    this.filterParams.filters = { ...this.filterParams.filters, ...this.tableState.filter };
  }

  mouseDown(solicitation: any) {
    this.mouseDownTimestamp = (new Date()).getTime();
    this.mouseDownSolicitation = solicitation;
  }

  mouseUp(solicitation: any) {
    const now = (new Date()).getTime();
    if ( (now - this.mouseDownTimestamp) < 300 && solicitation === this.mouseDownSolicitation) {
      this.selectSol(solicitation);
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
          this.router.navigate(['/solicitation/report', msg.id]).catch(r => console.log(r));
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
          const escaped_field = (s[this.columns[i].field] || '').replace(/"/g, '""' );
          csv += '"' + escaped_field + '"' + csvSeparator;
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

  /**
   * Function called when filters change or when you need to set
   * the tableState based on the dropdown state.
   */
  filterChange() {
    const noticeEl = document.getElementById('ddl_noticeTypes');
    if (noticeEl) {
      this.tableState.filter.noticeType = {
        matchMode: 'equals', value: noticeEl.getElementsByClassName('ui-dropdown-label')[0].textContent
      };
      if (this.tableState.filter.noticeType.value === 'All') {
        delete this.tableState.filter.noticeType;
      }
    }

    const rrEl = document.getElementById('ddl_reviewRec');
    if (rrEl) {
      this.tableState.filter.reviewRec = {
        matchMode: 'equals', value: rrEl.getElementsByClassName('ui-dropdown-label')[0].textContent
      };
      // adjust the Non-Compliant reviewRec filter to be "Non-compliant (Action Required)"
      if (this.tableState.filter.reviewRec.value === 'Non-Compliant') {
        this.tableState.filter.reviewRec.value = 'Non-compliant (Action Required)';
      }
      if (this.tableState.filter.reviewRec.value === 'All') {
        delete this.tableState.filter.reviewRec;
      }
    }
    localStorage.setItem('workloadTableState', JSON.stringify(this.tableState));
  }

  stageChange(event) {
    this.tableState.first = event.first ? event.first : this.tableState.first;
    this.tableState.sort.field = event.field ? event.field : this.tableState.sort.field;
    this.tableState.sort.order = event.order ? event.order : this.tableState.sort.order;
    this.tableState.timestamp = (new Date()).getTime();
    localStorage.setItem('workloadTableState', JSON.stringify(this.tableState));
  }

  retstoreState() {
    try {
      const stateString = localStorage.getItem('workloadTableState');
      if (stateString) {
        const retreivedState = JSON.parse(stateString);
        if (retreivedState.version === this.tableStateVersion) {
          this.tableState = retreivedState;
          this.noticeTypeFilterModel = this.tableState.filter.noticeType ? this.tableState.filter.noticeType.value : 'All';
          this.reviewResultFilterModel = this.tableState.filter.reviewRec ? this.tableState.filter.reviewRec.value : 'All';
          this.solicitationService.firstLoadFilter = this.tableState.filter;
        } else {
          localStorage.removeItem('workloadTableState');
        }
      }
    } catch (e) {
      console.log(e);
      console.log('Unable to parse saved table state. Using default.');
    }

  }
}
