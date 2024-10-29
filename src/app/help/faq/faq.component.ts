import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from '../../shared/services/help.service';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends BaseComponent implements OnInit {
  public faq: any[];  // Array of FAQs from the API
  public id = '';
  public expanded: { [key: string]: boolean } = {}; // Track accordion state

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
      if (this.id === 'ICT') {
        $('#search').val('What is "Information and Communication Technology"(ICT)?');
      } else if (this.id === 'EIT') {
        $('#search').val('What is "Electronic and Information Technology"(E&IT)?');
      }
      // Wait for html to be rendered and trigger click for the given id
      setTimeout(() => {
        this.prefillSearch(this.id);
        this.search();
      }, 500);
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
        // Initialize all accordion items as collapsed
        this.faq.forEach((section, sectionIndex) => {
          section.children?.forEach(item => {
            this.expanded[this.getUniqueKey(sectionIndex, item.id)] = false;
          });
        });
      },
      error: (e) => console.log(e)
    });
  }

  /**
   * Generate a unique key for each accordion item based on section and item IDs.
   * @param sectionIndex - The index of the section
   * @param itemId - The unique ID of the accordion item within the section
   * @returns A unique key string
   */
  getUniqueKey(sectionIndex: number, itemId: string): string {
    return `${sectionIndex}-${itemId}`;
  }

  /**
   * Toggle Accordion visibility for a specific item within a section
   * @param sectionIndex - The index of the section
   * @param itemId - The unique ID of the accordion item
   */
  toggleAccordion(sectionIndex: number, itemId: string): void {
    const uniqueKey = this.getUniqueKey(sectionIndex, itemId);
    this.expanded[uniqueKey] = !this.expanded[uniqueKey];
  }

  /**
   * Determine if an accordion section is expanded
   * @param sectionIndex - The index of the section
   * @param itemId - The unique ID of the accordion item
   * @returns boolean
   */
  isExpanded(sectionIndex: number, itemId: string): boolean {
    return this.expanded[this.getUniqueKey(sectionIndex, itemId)] || false;
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