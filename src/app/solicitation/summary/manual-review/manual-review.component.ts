import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-review',
  templateUrl: './manual-review.component.html',
  styleUrls: ['./manual-review.component.scss']
})
export class ManualReviewComponent implements OnInit {

  /* ATTRIBUTES */
  public solicitation: any;
  public solicitationID: string;

  /* CONSTRUCTOR */
  constructor(private router: Router) {}

  /**
   * Lifecycle hook for component initialization
   */
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    // Attempt to load solicitation data from router state
    if (navigation?.extras?.state?.['solicitation']) {
      this.solicitation = navigation.extras.state['solicitation'];
      console.log('Loaded solicitation data from navigation state:', this.solicitation);
    } else {
      // Fallback to localStorage if no state is found
      const storedSolicitation = localStorage.getItem('currentSolicitation');
      if (storedSolicitation) {
        this.solicitation = JSON.parse(storedSolicitation);
        console.log('Loaded solicitation data from localStorage:', this.solicitation);
      } else {
        // Provide a default object to avoid breaking the UI
        console.error('No solicitation data found in navigation state or localStorage.');
        this.solicitation = {
          title: 'Manually Uploaded Solicitation',
          reviewRec: 'Unknown Status',
          parseStatus: []
        };
      }
    }
  }

  /**
   * Tracks clicks on tabs for analytics or navigation
   * @param action Identifier for the action
   * @param label Display label for the action
   */
  onClickTabs(action: string, label: string): void {
    console.log(`Tab clicked: ${label} (${action})`);
  }
}
