import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from '../../shared/services/help.service';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends BaseComponent implements OnInit {
  public faq: any[];  // Array of FAQs from the API
  public id = '';
  public params: any;
  public expanded: { [key: string]: boolean } = {}; // Track accordion state

  constructor(
    private helpService: HelpService,
    private route: ActivatedRoute,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Frequently Asked Questions';
  }

  ngOnInit() {
    super.ngOnInit();
    this.id = this.route.snapshot.params['id'];
    if (this.id !== null) {
      if (this.id === 'ICT') {
        $('#search').val('What is "Information and Communication Technology"(ICT)?');
      } else if (this.id === 'EIT') {
        $('#search').val('What is "Electronic and Information Technology"(E&IT)?');
      }
      // Wait for html to be rendered and trigger click for the given id
      setTimeout(() => {
        $('.' + this.id).click();
        this.search();
      }, 500);
    }
    // Fetch FAQs
    this.getFAQs();
  }

  /**
   * Fetch FAQs from the API
   */
  getFAQs() {
    this.helpService.getFAQs().subscribe({
      next: (data) => (this.faq = data),
      error: (e) => console.log(e)
    });
  }

  /**
   * Scroll window to selected element by ID
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
   * Toggle Accordion visibility
   * @param id - Unique ID for the accordion element
   */
  toggleAccordion(id: string) {
    this.expanded[id] = !this.expanded[id];
  }

  /**
   * Determine if an accordion section is expanded
   * @param id - Unique ID for the accordion element
   * @returns boolean
   */
  isExpanded(id: string): boolean {
    return this.expanded[id] || false;
  }

  /**
   * Perform search based on the input value
   */
  search() {
    const txt = $('#search').val().toString().toLowerCase();
    $('.search-content').each(function() {
      if ($(this).text().toLowerCase().indexOf(txt) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $('.search-title').each(function() {
      if ($(this).text().toLowerCase().indexOf(txt) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
}