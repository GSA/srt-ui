import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SolicitationService} from '../solicitation.service';
import {LazyLoadEvent, SelectItem} from 'primeng/primeng';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';
import {BaseComponent} from '../../base.component';
import {NoticeTypesService} from '../../shared/services/noticeTypes.service';


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

  dateFrom: Date;
  dateTo: Date;
  today: Date = new Date();
  maxDate: Date = new Date();
  minDate: Date;

  dateScan: String = '';

  filterParams = {
    agency: '',
    office: '',
    contact: '',
    eitLikelihood: '',
    numDocs: '',
    reviewStatus: '',
    reviewRec: '',
    rows: 15
  };

  columns = [
    { field: 'solNum', title: 'Solicitation ID'},
    { field: 'title', title: 'Solicitation Title'},
    { field: 'noticeType', title: 'Notice Type'},
    { field: 'date', title: 'Date Posted on FedBizOps'},
    { field: 'reviewRec', title: 'SRT Review Result'},
    { field: 'actionStatus', title: 'Action Status'},
    { field: 'actionDate', title: 'Latest Action Date'},
    { field: 'agency', title: 'Agency'},
    { field: 'office', title: 'Office'}
  ];


  noticeTypes: Array<Object> = [
    {label : 'All', value : ''},
    {label : 'COMBINE', value : 'COMBINE'},
    {label : 'AMDCSS', value : 'AMDCSS'},
    {label : 'PRESOL', value : 'PRESOL'},
    {label : 'MOD', value : 'MOD'},
    ]

  reviewRec: Array<Object> = [
    {label : 'All', value : ''},
    {label : 'Not Applicable', value : 'Not Applicable'},
    {label : 'Non-Compliant', value : 'Non-compliant (Action Required)'},
    {label : 'Compliant', value : 'Compliant'}
  ]

  /**
   * constructor
   * @param solicitationService
   * @param router
   */
  constructor(
    private solicitationService: SolicitationService,
    private router: Router,
    private titleService: Title,
    private noticeTypesService: NoticeTypesService
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
          this.solicitations = solicitations.predictions
          this.solicitationService.solicitations = solicitations.predictions;
          this.dateScan = this.solicitations[0] && this.solicitations[0].date;
          $('.pDataTable').show();
          // sorting
          //  this.solicitations = this.sortByReviewResult(this.solicitations);

          this.getNoticeTypes(this.solicitations);
          this.loading = false;
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
    const now = new Date().toLocaleDateString();
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
          this.titleService.setTitle('SRT - Solicitation ID ' + msg.id)
          this.router.navigate(['/solicitation/report', msg.id]);
        },
        () => {
          console.log('e131');
        });
  }


  /**
   * sort by review result
   * @param solicitations
   */
  sortByReviewResult(solicitations) {
    const NotApplicable = solicitations.filter(d => d.reviewRec === 'Not Applicable');
    const Noncompliant = solicitations.filter(d => d.reviewRec === 'Non-compliant (Action Required)');
    const Compliant = solicitations.filter(d => d.reviewRec === 'Compliant');
    solicitations = Noncompliant.concat(Compliant).concat(NotApplicable);
    return solicitations;
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
        let noticeCount: Number = 1;
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
        this.solType.push({label: noticeTypeMap[k].label + ' (' + noticeTypeMap[k].count + ')', value: noticeTypeMap[k].label});
      }
    }
  }

  /**
   * filter solicitation by date
   * @param event
   */
  filterDate(event) {
    if (this.dateFrom && this.dateTo) {
      this.minDate = this.dateFrom;
      this.maxDate = this.dateTo;
      this.solicitations = this.solicitationService.solicitations.filter(
        d => {
          const dDate = new Date(d.date);
          return dDate >= this.dateFrom && dDate <= this.dateTo;
        }
      );
      this.getNoticeTypes(this.solicitations);
    }
  }

  /**
   * reset filter result
   */
  reset() {
    if (!this.dateFrom && !this.dateTo) {
      this.solicitations = this.solicitationService.solicitations;
    }
  }

}
