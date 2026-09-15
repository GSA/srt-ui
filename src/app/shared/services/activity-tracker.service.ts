import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminManagementService } from './admin-management.service';

/**
 * Lightweight activity tracker that auto-records page views, time on page,
 * and provides methods for tracking clicks and feature usage.
 * Events are buffered and sent in batches to reduce API calls.
 */
@Injectable({ providedIn: 'root' })
export class ActivityTrackerService implements OnDestroy {

  private sessionId: string;
  private buffer: any[] = [];
  private flushInterval: any;
  private routerSub: Subscription;
  private currentPageUrl = '';
  private currentPageTitle = '';
  private pageEnteredAt = 0;

  constructor(
    private adminService: AdminManagementService,
    private router: Router
  ) {
    this.sessionId = this.generateSessionId();
    this.startAutoTracking();
  }

  /** Start listening to route changes and flush buffer periodically. */
  private startAutoTracking(): void {
    // Track page views on navigation
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Record time on previous page
        if (this.currentPageUrl && this.pageEnteredAt > 0) {
          const duration = Date.now() - this.pageEnteredAt;
          if (duration > 1000) { // Only track if > 1 second
            this.addEvent('page_view', this.currentPageTitle || this.currentPageUrl, {
              pageUrl: this.currentPageUrl,
              pageTitle: this.currentPageTitle,
              durationMs: duration
            });
          }
        }

        // Start tracking new page
        this.currentPageUrl = event.urlAfterRedirects || event.url;
        this.currentPageTitle = document.title;
        this.pageEnteredAt = Date.now();
      });

    // Flush buffer every 30 seconds
    this.flushInterval = setInterval(() => this.flush(), 30000);

    // Flush on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
    }
  }

  /** Track a click event. */
  trackClick(elementName: string, metadata?: any): void {
    this.addEvent('click', elementName, {
      pageUrl: this.currentPageUrl,
      metadata
    });
  }

  /** Track a feature usage event (e.g., "manual_upload", "daily_dashboard"). */
  trackFeature(featureName: string, metadata?: any): void {
    this.addEvent('feature', featureName, {
      pageUrl: this.currentPageUrl,
      metadata
    });
  }

  /** Track a manual upload event. */
  trackUpload(fileName: string, fileSize: number): void {
    this.addEvent('upload', fileName, {
      pageUrl: this.currentPageUrl,
      metadata: { fileName, fileSize }
    });
  }

  /** Add an event to the buffer. */
  private addEvent(eventType: string, eventName: string, extra?: any): void {
    this.buffer.push({
      eventType,
      eventName,
      pageUrl: extra?.pageUrl || this.currentPageUrl,
      pageTitle: extra?.pageTitle || this.currentPageTitle,
      metadata: extra?.metadata || null,
      durationMs: extra?.durationMs || null,
      sessionId: this.sessionId
    });

    // Auto-flush if buffer gets large
    if (this.buffer.length >= 20) {
      this.flush();
    }
  }

  /** Send buffered events to the API. */
  private flush(): void {
    if (this.buffer.length === 0) return;

    const events = [...this.buffer];
    this.buffer = [];

    this.adminService.trackBatch(events).subscribe({
      error: (err) => {
        console.warn('Activity tracking flush failed:', err);
        // Put events back in buffer on failure (up to a limit)
        if (this.buffer.length < 100) {
          this.buffer.push(...events);
        }
      }
    });
  }

  private generateSessionId(): string {
    // crypto.getRandomValues works in secure and non-secure contexts alike,
    // unlike crypto.randomUUID. Deliberately no insecure fallback: a weak
    // path that is never meant to run is still a weak path.
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    const rand = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return 'sess_' + Date.now().toString(36) + '_' + rand;
  }


  ngOnDestroy(): void {
    this.flush();
    if (this.routerSub) this.routerSub.unsubscribe();
    if (this.flushInterval) clearInterval(this.flushInterval);
  }
}
