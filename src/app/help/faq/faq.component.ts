import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from '../../shared/services/help.service';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    standalone: false
})
export class FaqComponent extends BaseComponent implements OnInit {
  public faq: any[];  // Array of FAQs from the API
  public id = '';
  // Accordion open/close state is owned by the global USWDS script (its
  // delegated click handler on .usa-accordion__button). Keeping a parallel
  // Angular state here is what double-toggled clicks and broke items.

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private helpService: HelpService,
    private route: ActivatedRoute,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Frequently Asked Questions';
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.id = this.route.snapshot.params['id'];
    if (this.id !== null) {
      if (this.id === 'ICT' || this.id === 'EIT') {
        this.prefillSearch(this.id);
        // Wait for html to be rendered and trigger search
        setTimeout(() => {
          this.search();
        }, 500);
      }
    }
    // Fetch FAQs
    this.getFAQs();
  }

  /**
   * Prefill search input based on the route parameter
   * @param id - Search term identifier
   */
  prefillSearch(id: string): void {
    const predefinedQuestions = {
      ICT: 'What is "Information and Communication Technology"(ICT)?',
      EIT: 'What is "Electronic and Information Technology"(E&IT)?'
    };

    this.searchInput.nativeElement.value = predefinedQuestions[id] || '';
  }

  /**
   * Fetch FAQs from the API
   */
  getFAQs(): void {
    this.helpService.getFAQs().subscribe({
      next: (data) => {
        this.faq = data;
      },
      error: (e) => console.log(e)
    });
  }



  /**
   * Scroll window to selected element by ID
   * @param ID - The ID of the element to scroll to
   */
  scroll(ID: string): void {
    const element = document.getElementById(ID);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Perform search based on the input value
   */
  search(): void {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    
    // Get all search content elements
    const searchContentElements = document.querySelectorAll('.search-content');
    const searchTitleElements = document.querySelectorAll('.search-title');

    // Filter search content
    searchContentElements.forEach(element => {
      if (element instanceof HTMLElement) {
        const isVisible = element.textContent?.toLowerCase().includes(searchTerm);
        element.style.display = isVisible ? '' : 'none';
      }
    });

    // Filter titles
    searchTitleElements.forEach(element => {
      if (element instanceof HTMLElement) {
        const isVisible = element.textContent?.toLowerCase().includes(searchTerm);
        element.style.display = isVisible ? '' : 'none';
      }
    });
  }
}