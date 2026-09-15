import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../../shared/services/admin-management.service';
import { ActivityTrackerService } from '../../shared/services/activity-tracker.service';

@Component({
  selector: 'app-website-analytics',
  templateUrl: './website-analytics.component.html',
  styleUrls: ['./website-analytics.component.scss'],
  standalone: false
})
export class WebsiteAnalyticsComponent implements OnInit {

  overview: any = null;
  featureUsage: any = null;
  loading = false;
  errorMessage = '';
  selectedDays = 30;
  dayOptions = [7, 14, 30, 60, 90];
  testEventSent = false;

  // Chart data
  dailyChartData: any = null;
  dailyChartOptions: any = null;

  constructor(
    private adminService: AdminManagementService,
    private activityTracker: ActivityTrackerService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupChartOptions();
  }

  loadData(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adminService.getAnalyticsOverview(this.selectedDays).subscribe({
      next: (data) => {
        this.overview = data;
        this.buildDailyChart(data.daily || []);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load analytics data.';
        this.loading = false;
        console.error('Analytics error:', err);
      }
    });

    this.adminService.getFeatureUsage(this.selectedDays).subscribe({
      next: (data) => { this.featureUsage = data; },
      error: () => {}
    });
  }

  onDaysChange(): void {
    this.loadData();
  }

  private setupChartOptions(): void {
    this.dailyChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, grid: { color: '#e6e6e6' } }
      }
    };
  }

  private buildDailyChart(daily: any[]): void {
    const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date));
    this.dailyChartData = {
      labels: sorted.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Page Views',
          data: sorted.map(d => parseInt(d.page_views) || 0),
          borderColor: '#005ea2',
          backgroundColor: 'rgba(0, 94, 162, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Unique Users',
          data: sorted.map(d => parseInt(d.unique_users) || 0),
          borderColor: '#2e6e2e',
          backgroundColor: 'rgba(46, 110, 46, 0.1)',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Uploads',
          data: sorted.map(d => parseInt(d.uploads) || 0),
          borderColor: '#e5a000',
          backgroundColor: 'rgba(229, 160, 0, 0.1)',
          fill: false,
          tension: 0.3
        }
      ]
    };
  }

  formatDuration(ms: number): string {
    if (!ms || ms <= 0) return '—';
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  }

  formatNumber(val: any): string {
    const num = parseInt(val);
    if (isNaN(num)) return '0';
    return num.toLocaleString();
  }

  sendTestEvent(): void {
    this.activityTracker.trackFeature('analytics_test_event', { source: 'admin_panel', timestamp: new Date().toISOString() });
    this.activityTracker.trackClick('test_button_click');
    this.testEventSent = true;
    setTimeout(() => { this.testEventSent = false; }, 3000);
    // Reload data after a short delay to show the event
    setTimeout(() => { this.loadData(); }, 2000);
  }
}
