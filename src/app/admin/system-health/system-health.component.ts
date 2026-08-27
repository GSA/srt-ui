import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminManagementService } from '../../shared/services/admin-management.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-system-health',
  templateUrl: './system-health.component.html',
  styleUrls: ['./system-health.component.scss'],
  standalone: false
})
export class SystemHealthComponent implements OnInit {

  // ── Phase 3: ingestion freshness ──
  overview: any = null;
  overviewError = false;

  health: any = null;
  loading = false;
  lastChecked: Date | null = null;

  // Scheduled pipeline stats
  pipelineStats: any = null;
  pipelineLoading = false;
  pipelineDays = 30;

  // Logs
  logs: any[] = [];
  logsLoading = false;
  logFilter = '';
  logLevel = '';

  constructor(
    private adminService: AdminManagementService,
    private http: HttpClient
  ) {}


  loadOverview(): void {
    this.adminService.getOverview().subscribe({
      next: (d) => { this.overview = d; this.overviewError = false; },
      error: () => { this.overviewError = true; }
    });
  }

  /**
   * green < 24h, amber 24-48h, red >= 48h (or never). The thresholds encode
   * the lesson of the July 2026 outage: a silent feed is an incident, not a
   * quiet day.
   */
  freshnessLevel(): 'ok' | 'warn' | 'bad' | 'unknown' {
    const h = this.overview?.hours_since_ingest;
    if (h === null || h === undefined) return this.overview ? 'bad' : 'unknown';
    if (h < 24) return 'ok';
    if (h < 48) return 'warn';
    return 'bad';
  }

  freshnessText(): string {
    const h = this.overview?.hours_since_ingest;
    if (h === null || h === undefined) return 'No solicitations have ever been ingested.';
    if (h < 1) return 'Ingestion healthy — last new solicitation under an hour ago.';
    if (h < 24) return `Ingestion healthy — last new solicitation ${Math.round(h)} hour(s) ago.`;
    const days = Math.floor(h / 24);
    return `No new solicitations for ${days} day(s) (${Math.round(h)} hours). Check the SAM.gov feed and API quota.`;
  }

  ngOnInit(): void {
    this.loadOverview();
    this.refresh();
    this.loadLogs();
  }

  refresh(): void {
    this.loading = true;
    this.adminService.getSystemHealth().subscribe({
      next: (data) => {
        this.health = data;
        this.lastChecked = new Date();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
    this.loadPipelineStats();
  }

  loadPipelineStats(): void {
    this.pipelineLoading = true;
    this.adminService.getScheduledPipelineStats(this.pipelineDays).subscribe({
      next: (data) => {
        this.pipelineStats = data;
        this.pipelineLoading = false;
      },
      error: () => {
        this.pipelineStats = null;
        this.pipelineLoading = false;
      }
    });
  }

  onPipelineDaysChange(): void {
    this.loadPipelineStats();
  }

  loadLogs(): void {
    this.logsLoading = true;
    const params: any = { limit: 100 };
    if (this.logLevel) params.level = this.logLevel;
    if (this.logFilter) params.search = this.logFilter;

    const qs = Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
    this.http.get<any>(`${environment.SERVER_URL}/admin/system-logs?${qs}`).subscribe({
      next: (data) => {
        this.logs = data.logs || [];
        this.logsLoading = false;
      },
      error: () => {
        this.logs = [];
        this.logsLoading = false;
      }
    });
  }

  onLogFilterChange(): void {
    this.loadLogs();
  }

  formatUptime(seconds: number): string {
    if (!seconds) return '—';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }

  getLogLevelClass(level: string): string {
    if (level === 'error') return 'log-level--error';
    if (level === 'warn') return 'log-level--warn';
    if (level === 'info') return 'log-level--info';
    return 'log-level--debug';
  }

  getUnreadablePercent(): string {
    if (!this.pipelineStats?.totals) return '0';
    const total = this.pipelineStats.totals.documents;
    if (!total) return '0';
    return ((this.pipelineStats.totals.unreadable / total) * 100).toFixed(1);
  }

  getReadablePercent(): string {
    if (!this.pipelineStats?.totals) return '0';
    const total = this.pipelineStats.totals.documents;
    if (!total) return '0';
    return ((this.pipelineStats.totals.readable / total) * 100).toFixed(1);
  }
}
