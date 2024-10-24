import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { HelpService } from '../../shared/services/help.service';
import * as $ from 'jquery';
import {BaseComponent} from '../../base.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends BaseComponent implements OnInit {

  /* ATTRIBUTES */

  public faq: any[];
  public id = '';
  public metrix = '{ (1) ∪ { (2) ∩ (3) } }';
  public params: any;

  /* CONSTRUCTOR */

  /**
   * constructor
   * @param helpService
   * @param route
   * @param ts
   */
  constructor(
    private helpService: HelpService,
    private route: ActivatedRoute,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Frequently Asked Questions';
  }

  /**
   * angular lifecycle
   */
  ngOnInit() {
    super.ngOnInit();
    this.id = this.route.snapshot.params['id'];

    if (this.id !== null) {
      if (this.id === 'ICT') {
        $('#search').val(
          'What is "Information and Communication Technology"(ICT)?'
        );
      } else if (this.id === 'EIT') {
        $('#search').val(
          'What is "Electronic and Information Technology"(E&IT)?'
        );
      }

      // Wait for html
      setTimeout(() => {
        $('.' + this.id).click();
        this.search();
      }, 500);
    }

    this.getFAQs();
  }

  /**
   * Get FAQs
   */
  getFAQs() {
    this.helpService
      .getFAQs()
      .subscribe({next: data => (this.faq = data), error: e => console.log(e)});
  }

  /**
   * window scroll to selected ID
   * @param ID
   */
  scroll(ID: string) {
    const element = document.getElementById(ID);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  /**
   * Search text
   */
  search() {
    const txt = $('#search').val().toString();

    $('.search-content').each(function() {
      if ( $(this).text().toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    $('.search-title').each(function() {
      if ( $(this).text().toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
}
