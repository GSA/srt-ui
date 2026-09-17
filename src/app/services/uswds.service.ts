import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class USWDSService {
  initializeUSWDS() {
    // Wait for document to be ready
    if (document.readyState === 'complete') {
      this.init();
    } else {
      window.addEventListener('load', () => this.init());
    }
  }

  private init() {
    // Give time for USWDS script to load
    setTimeout(() => {
      if ((window as any).uswds) {
        (window as any).uswds.init();
      } else {
        console.error('USWDS not loaded');
      }
    }, 1000);
  }
}