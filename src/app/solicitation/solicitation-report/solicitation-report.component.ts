import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitationService } from '../solicitation.service';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import $ from 'jquery';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base.component';
import { NoticeTypesService } from '../../shared/services/noticeTypes.service';
import moment from 'moment';
import { environment } from 'environments/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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
  styleUrls: ['./solicitation-report.component.scss'],
  standalone: false
})
export class SolicitationReportComponent extends BaseComponent implements OnInit {
  today: Date = new Date();


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
      filter: { 'active': { 'value': true, 'matchMode': 'equals' } },
      sort: { field: 'date', order: -1 },
      version: 1,
      timestamp: 0
    };
  noticeTypeFilterModel: string;
  reviewResultFilterModel: string;

  stacked: Boolean = false;

  dateScan: String = '';

  // Time window for the Daily Report. Default 60 days. Reviewers can switch
  // to 30/90/all via the dropdown next to the other filters. Admin user
  // expectations historically: "the last 60 days." (#10)
  timeRangeModel: 'last30' | 'last60' | 'last90' | 'last180' | 'last365' | 'all' | 'custom' = 'last60';
  timeRanges = [
    { label: 'Last 30 days', value: 'last30' },
    { label: 'Last 60 days', value: 'last60' },
    { label: 'Last 90 days', value: 'last90' },
    { label: 'Last 6 months', value: 'last180' },
    { label: 'Last year', value: 'last365' },
    { label: 'All time', value: 'all' },
    { label: 'Custom range…', value: 'custom' },
  ];

  // Custom range: two native date inputs (screen-reader friendly — the
  // PrimeNG calendar was not accessible for JAWS users). Can't pick the future.
  customStart = '';
  customEnd = '';
  todayIso = new Date().toISOString().slice(0, 10);

  scopeLabel = 'Solicitations';
  scopeSubtitle = 'Showing solicitations';
  filterParams: any = {
    agency: '',
    office: '',
    contact: '',
    category_list: '',
    numDocs: '',
    reviewStatus: '',
    reviewRec: '',
    filters: { 'active': { 'value': true, 'matchMode': 'equals' } },
    rows: 15
  };

  columns = [
    { field: 'solNum', title: 'ID' },
    { field: 'title', title: 'Title' },
    { field: 'noticeType', title: 'Notice Type' },
    { field: 'date', title: 'Date Posted' },
    { field: 'reviewRec', title: 'SRT Review Result' },
    { field: 'actionStatus', title: 'Action Status' },
    { field: 'actionDate', title: 'Latest Action Date' },
    { field: 'agency', title: 'Agency' },
    { field: 'office', title: 'Office' },
  ];

  // Values we want exported but not displayed
  hidden_columns = [
    { field: 'url', title: 'URL' },
  ];

  noticeTypes: Array<Object> = [
    { label: 'All', value: '' }
  ];

  reviewRec: Array<Object> = [
    { label: 'All', value: '' },
    { label: 'Not Included', value: 'Non-compliant (Action Required)' },
    { label: 'Included', value: 'Compliant' },
    { label: 'Cannot Evaluate', value: 'Cannot Evaluate (Review Required)' },
    { label: 'Not Applicable', value: 'Not Applicable' },
  ];

  epaDropdown: Array<Object> = [
    { label: 'All', value: '' },
    { label: 'Non-Compliant', value: 'red' },
    { label: 'Compliant', value: 'green' },
    { label: 'Cannot Evaluate', value: 'yellow' },
    { label: 'Not Applicable', value: 'grey' },
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
    private renderer: Renderer2,
    private $gaService: GoogleAnalyticsService

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
      this.columns.splice(i + 1, 0, { field: 'predictions.estar', title: 'EPA Review Result' });
    }

    this.retstoreState();
  }

  /**
   * For a Cannot Evaluate row, return a short reason for the inline hint
   * shown next to the status badge. Mirrors the detail-page logic.
   */
  cannotEvaluateReasonShort(solicitation: any): string {
    const ps: any[] = (solicitation && solicitation.parseStatus) || [];
    const fileCount = ps.filter(f => f && f.name).length;
    if (fileCount === 0) return 'No documents attached';
    const readable = ps.filter(f =>
      f && (f.status === 'Yes' || f.status === 'successfully parsed')
    ).length;
    if (readable === 0) return 'No machine-readable documents';
    return 'Manual review required';
  }

  /** Compute the ISO start-date for the selected time window, or '' for 'all'. */
  private computeStartDateForRange(range: string): string {
    if (range === 'all') return '';
    const daysByRange: { [k: string]: number } = { last30: 30, last60: 60, last90: 90, last180: 180, last365: 365 };
    const days = daysByRange[range] ?? 60;
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  /** Format a Date as YYYY-MM-DD (local) for the API. */
  private toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /** Apply the chosen window to filterParams (startDate + optional endDate). */
  private applyTimeRange(): void {
    if (this.timeRangeModel === 'custom') {
      if (this.customStart && this.customEnd) {
        this.filterParams.startDate = this.customStart;
        // Backend treats endDate as exclusive (date < endDate), so push it to
        // the day after the selected end so that end day is fully included.
        const end = new Date(this.customEnd + 'T00:00:00');
        end.setDate(end.getDate() + 1);
        this.filterParams.endDate = this.toIsoDate(end);
      }
      return;
    }
    // Preset ranges never bound the end.
    delete this.filterParams.endDate;
    const start = this.computeStartDateForRange(this.timeRangeModel);
    if (start) {
      this.filterParams.startDate = start;
    } else {
      delete this.filterParams.startDate;
    }
  }

  /** Called when the Time Range dropdown changes. Reloads the report. */
  onTimeRangeChange(): void {
    if (this.timeRangeModel === 'custom') {
      // Wait for the reviewer to pick both dates in the calendar before
      // reloading; leave the current results in place until then.
      return;
    }
    this.customStart = '';
    this.customEnd = '';
    this.applyTimeRange();
    // Trigger a full reload at page 1 with current filters preserved.
    this.loadSolicitationsLazy({ first: 0, rows: this.filterParams.rows, filters: this.tableState?.filter || {} } as LazyLoadEvent);
  }

  /** Called when either custom date input changes; reloads once both are set. */
  onCustomRangeSelect(): void {
    if (this.customStart && this.customEnd) {
      this.applyTimeRange();
      this.loadSolicitationsLazy({ first: 0, rows: this.filterParams.rows, filters: this.tableState?.filter || {} } as LazyLoadEvent);
    }
  }

  /** Plain-language summary of the selected window for the page header. */
  timeRangeSummary(): string {
    switch (this.timeRangeModel) {
      case 'last30': return 'last 30 days';
      case 'last90': return 'last 90 days';
      case 'last180': return 'last 6 months';
      case 'last365': return 'last year';
      case 'all': return 'all time';
      case 'custom': {
        if (this.customStart && this.customEnd) {
          const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
          const st = new Date(this.customStart + 'T00:00:00').toLocaleDateString('en', opts);
          const en = new Date(this.customEnd + 'T00:00:00').toLocaleDateString('en', opts);
          return `${st} – ${en}`;
        }
        return 'custom range';
      }
      default: return 'last 60 days';
    }
  }


  /**
   * lifecycle
   */
  ngOnInit() {
    super.ngOnInit();


    this.stacked = window.matchMedia('(max-width: 992px)').matches;
    this.loading = true;
    this.initFilterParams();
    this.applyTimeRange();
    this.solicitationService.getFilteredSolicitations(this.filterParams)
      .subscribe({
        next: solicitations => {
          this.totalRecordCount = solicitations.totalCount;
          this.solicitations = solicitations.predictions;
          this.solicitationService.solicitations = solicitations.predictions;
          this.dateScan = this.solicitations[0] ? this.solicitations[0].date : null;
          $('.pDataTable').show();
          // sorting
          //  this.solicitations = this.sortByReviewResult(this.solicitations);

          this.getNoticeTypes(this.solicitations);
          setTimeout(() => { this.loading = false; }, 1); // don't change the view data while we are rendering it.

          // give the PrimNG Table time to render, then set the default sort icon manually
          // to cover over a bug where the default column is not getting the arrow rendered
          setTimeout(() => {
            this.renderer.selectRootElement('p-sorticon[ng-reflect-field=\'date\']>i').classList.add('pi-sort-down');
          }, 100);

        },
        error: err => {
          console.log(err);
          this.loading = false;
        }
      });

    this.noticeTypesService.getNoticeTypes()
      .subscribe((typesArray: Array<String>) => {
        this.noticeTypes = [{ label: 'All', value: '' }];
        for (const t of typesArray) {
          this.noticeTypes.push({ label: t, value: t });
        }
      });

    this.ict.push({ label: 'All', value: null });
    this.ict.push({ label: 'Yes', value: 'Yes' });
    this.ict.push({ label: 'No', value: 'No' });

    this.revResult.push({ label: 'All', value: null });
    this.revResult.push({ label: 'Compliant', value: 'Compliant' });
    this.revResult.push({ label: 'Non-compliant (Action Required)', value: 'Non-compliant (Action Required)' });
    this.revResult.push({ label: 'Not Applicable', value: 'Not Applicable' });

  }

  loadSolicitationsLazy(event: LazyLoadEvent) {
    this.filterChange();
    this.applyTimeRange();
    this.loading = true;
    // Defend against partial state objects (e.g. the Refresh Data button passes
    // `tableState`, which may be missing first/rows/sortField). Falling through
    // to the API with `undefined` here lets the request go out malformed and
    // the table sits in a dimmed loading state forever.
    event = event || {} as LazyLoadEvent;
    event.filters = { ...(event.filters || {}), ...this.tableState.filter };
    // Always carry the chosen time window onto every request.
    if (this.filterParams.startDate) {
      (event as any).startDate = this.filterParams.startDate;
    } else {
      delete (event as any).startDate;
    }
    if (this.filterParams.endDate) {
      (event as any).endDate = this.filterParams.endDate;
    } else {
      delete (event as any).endDate;
    }

    this.solicitationService.getFilteredSolicitations(event)
      .subscribe({
        next: (solicitations) => {
          this.solicitations = solicitations.predictions;
          this.solicitationService.solicitations = solicitations.predictions;
          this.dateScan = this.solicitations[0] && this.solicitations[0].date;
          $('.pDataTable .p-datatable-gridlines').show();

          // convert the dates to a nice display format
          const date_options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
          for (const p of this.solicitations) {
            p.date = (new Date(p.date)).toLocaleDateString('en', date_options);
            p.actionDate = (new Date(p.actionDate)).toLocaleDateString('en', date_options);
          }


          this.getNoticeTypes(this.solicitations);
          this.totalRecordCount = solicitations.totalCount;
          this.loading = false;


          // fix accessibility of paginator
          this.fixPaginatorAccessibility();

        },
        error: (err) => {
          console.log(err);
          // CRITICAL: clear the loading flag on error too, otherwise the table
          // stays dimmed and the rest of the page is unusable until the user
          // refreshes the browser.
          this.loading = false;
        }
      });
  }

  /**
   * PrimeNG renders the paginator with icon-only buttons and an unlabeled
   * rows-per-page combobox. Add accessible names so screen readers can use them.
   * Runs on a short delay to let PrimeNG render, and is safe to call repeatedly.
   */
  fixPaginatorAccessibility() {
    setTimeout(() => {
      $('button.p-paginator-first').attr({ 'title': 'First page', 'aria-label': 'First page' });
      $('button.p-paginator-prev').attr({ 'title': 'Previous page', 'aria-label': 'Previous page' });
      $('button.p-paginator-next').attr({ 'title': 'Next page', 'aria-label': 'Next page' });
      $('button.p-paginator-last').attr({ 'title': 'Last page', 'aria-label': 'Last page' });
      $('.p-paginator-icon.pi-caret-right').attr('title', 'Next page');
      $('.p-paginator-icon.pi-caret-left').attr('title', 'Previous page');
      $('button.p-paginator-page').each(
        (idx, el) => {
          const pageNum = $(el).text().trim();
          $(el).attr({ 'title': 'Page ' + pageNum, 'aria-label': 'Page ' + pageNum });
        });
      // Rows-per-page selector combobox has no label
      $('.p-paginator-rpp-options input[role="combobox"]').attr('aria-label', 'Rows per page');
      $('.p-paginator-rpp-options').attr('aria-label', 'Rows per page');
    }, 1000);
  }

  /**
   * initialize filter
   */
  initFilterParams() {
    const agency = localStorage.getItem('agency') || '';
    const userRole = localStorage.getItem('userRole') || '';
    const isGsaAdmin =
      agency.indexOf('General Services Administration') > -1 &&
      (userRole.indexOf('Administrator') > -1 || userRole.indexOf('SRT Program Manager') > -1);
    if (isGsaAdmin) {
      // GSA admins / program managers see every agency's solicitations.
      this.filterParams.agency = '';
      this.scopeLabel = 'All Agency Solicitations';
      this.scopeSubtitle = 'Showing solicitations from all agencies';
    } else if (agency && agency !== 'undefined' && agency !== 'null') {
      // Other users are scoped to their own agency.
      this.filterParams.agency = agency;
      this.scopeLabel = agency + ' Solicitations';
      this.scopeSubtitle = "Showing your agency's solicitations";
    } else {
      // Agency/role missing from the session (token didn't carry it). Don't
      // silently filter to a bogus agency — that produces a blank report.
      // Leave it unfiltered and log so we can see this happened.
      console.warn('[report] No valid agency/role in session; showing unfiltered report.', { agency, userRole });
      this.filterParams.agency = '';
      this.scopeLabel = 'Solicitations';
      this.scopeSubtitle = 'Showing solicitations';
    }
    this.filterParams.filters = { ...this.filterParams.filters, ...this.tableState.filter };
  }

  mouseDown(solicitation: any) {
    this.mouseDownTimestamp = (new Date()).getTime();
    this.mouseDownSolicitation = solicitation;
  }

  mouseUp(solicitation: any) {
    const now = (new Date()).getTime();
    if ((now - this.mouseDownTimestamp) < 300 && solicitation === this.mouseDownSolicitation) {
      this.selectSol(solicitation);
    }
  }

  // ── SAM.gov leave-site speed bump ──
  // Clicking a solicitation number used to both open SAM.gov and (via the row
  // mousedown/mouseup handlers) navigate into the SRT detail view. Now the link
  // opens a confirmation instead; the row navigation is suppressed on the link.
  samGovConfirmUrl: string | null = null;
  samGovConfirmNum = '';

  // A11y: when the speed-bump dialog opens, move focus to its primary action so
  // screen-reader/keyboard users land inside the dialog instead of behind the
  // overlay. Escape closes it; focus returns naturally to the triggering link.
  @ViewChild('samgovYes') set samgovYes(el: ElementRef | undefined) {
    if (el) {
      setTimeout(() => { try { el.nativeElement.focus(); } catch (e) { /* no-op */ } }, 0);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.samGovConfirmUrl) {
      this.cancelSamGov();
    }
  }

  promptSamGov(solicitation: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.samGovConfirmUrl = solicitation?.url || null;
    this.samGovConfirmNum = solicitation?.solNum || '';
  }

  confirmSamGov(): void {
    if (this.samGovConfirmUrl) {
      window.open(this.samGovConfirmUrl, '_blank', 'noopener,noreferrer');
    }
    this.cancelSamGov();
  }

  cancelSamGov(): void {
    this.samGovConfirmUrl = null;
    this.samGovConfirmNum = '';
  }

  /**
   * select solicitation
   * Manual review button kicks this off.  navigates to solicitation review page
   * @param solicitation
   */
  selectSol(solicitation: any) {

    this.$gaService.event('select_sol_table', 'sol_section', 'Selected Solicitation from Table');

    const now = moment().format('MM/DD/YYYY');
    const user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    solicitation.history.push({
      'date': now,
      'action': 'reviewed solicitation action requested summary',
      'user': user,
      'status': ''
    });

    this.solicitationService.updateHistory(solicitation)
      .subscribe({
        next: msg => {
          this.titleService.setTitle('SRT - Solicitation ID ' + msg.id);
          this.router.navigate(['/solicitation/report', msg.id]).catch(r => console.log(r));
        },
        error: (e) => {
          console.log(e);
        }
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
          noticeTypeMap[element.noticeType] = { label: noticeTypeLabel, value: noticeTypeValue, count: noticeCount };
        } else {
          noticeCount = 1;
          noticeTypeMap[element.noticeType] = { label: noticeTypeLabel, value: noticeTypeValue, count: noticeCount };
        }
      });

      this.solType = [];
      this.solType.push({ label: 'Any', value: null });
      for (const k in noticeTypeMap) {
        if (noticeTypeMap[k] !== null && noticeTypeMap[k] !== null) {
          this.solType.push({ label: noticeTypeMap[k].label + ' (' + noticeTypeMap[k].count + ')', value: noticeTypeMap[k].label });
        }
      }
    }
  }


  /**
   * Copied from the PrimeNG prototype and then modified
   *
   * @param options
   * @param filters - Filter values associated with the soliciation p-table
   */
  exportCSV(options, filters) {
    const csvSeparator = ',';
    let csv = '';

    this.$gaService.event('export_csv', 'exporting', 'Exporting Solicitations to CSV');

    // Adding hiding columns to the export
    const export_columns = this.columns.concat(this.hidden_columns);

    // headers
    for (let i = 0; i < export_columns.length; i++) {
      const column = export_columns[i];
      if (column.field) {
        csv += '"' + (column.title || column.field) + '"';
        if (i < (export_columns.length - 1)) {
          csv += csvSeparator;
        }
      }
    }

    let filter = { first: 0, rows: 1000, filters: {} };

    // The filters parameter is passed from the p-table element with the template reference variable #gb.
    // It contains the current filtering criteria applied to the table, allowing the export to include only the filtered data.
    if (filters) {
      filter.filters = filters;
    }

    const appendSolicitations = (solicitations) => {
      document.body.style.cursor = 'wait';
      for (const s of solicitations.predictions) {
        csv += '\n';
        for (let i = 0; i < export_columns.length; i++) {
          const escaped_field = (s[export_columns[i].field] || '').replace(/"/g, '""');
          csv += '"' + escaped_field + '"' + csvSeparator;
        }
      }
      // if we got them all, send it. Otherwise pull another batch
      if (filter.first >= solicitations.totalCount) {
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
      .subscribe(appendSolicitations);

    return;
  };

  sendBlob(data) {
    const exportFilename = 'srt_data.csv';
    const blob = new Blob([data], {
      type: 'text/csv;charset=utf-8;'
    });
    const nav = (window.navigator as any)
    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, exportFilename);
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
        matchMode: 'equals', value: noticeEl.getElementsByClassName('p-dropdown-label')[0].textContent
      };
      if (this.tableState.filter.noticeType.value === 'All') {
        delete this.tableState.filter.noticeType;
      }
    }

    // Read the bound dropdown model directly (robust to PrimeNG DOM changes / accessible inputId).
    // reviewResultFilterModel already holds the backend value bound from the [(ngModel)] on p-dropdown.
    const reviewRecValue = this.reviewResultFilterModel;
    if (reviewRecValue && reviewRecValue !== 'All' && reviewRecValue !== '') {
      this.tableState.filter.reviewRec = {
        matchMode: 'equals', value: reviewRecValue
      };
      // Translate user-facing labels back to canonical backend values, in case
      // a saved filter still carries the old label.
      const labelToValue: { [k: string]: string } = {
        'Non-Compliant': 'Non-compliant (Action Required)',
        'Not Included': 'Non-compliant (Action Required)',
        'Compliant': 'Compliant',
        'Included': 'Compliant',
        'Cannot Evaluate': 'Cannot Evaluate (Review Required)',
      };
      if (labelToValue[this.tableState.filter.reviewRec.value]) {
        this.tableState.filter.reviewRec.value = labelToValue[this.tableState.filter.reviewRec.value];
      }
    } else {
      delete this.tableState.filter.reviewRec;
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
