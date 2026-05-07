import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../../shared/services/admin-management.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
  standalone: false
})
export class AuditLogComponent implements OnInit {

  entries: any[] = [];
  totalCount = 0;
  loading = false;
  currentPage = 0;
  pageSize = 50;
  Math = Math;

  constructor(private adminService: AdminManagementService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.loading = true;
    this.adminService.getAuditLog(this.pageSize, this.currentPage * this.pageSize).subscribe({
      next: (data) => {
        this.entries = data.entries || [];
        this.totalCount = data.totalCount || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.totalCount) {
      this.currentPage++;
      this.loadPage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }

  getActionBadgeClass(action: string): string {
    if (action.includes('deactivat')) return 'srt-badge--error';
    if (action.includes('activat')) return 'srt-badge--success';
    if (action.includes('update')) return 'srt-badge--info';
    return '';
  }

  formatDetails(details: any): string {
    if (!details) return '';
    try {
      const d = typeof details === 'string' ? JSON.parse(details) : details;
      return JSON.stringify(d, null, 2);
    } catch {
      return String(details);
    }
  }
}
