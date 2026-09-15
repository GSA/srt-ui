import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
  standalone: false
})
export class AdminFeedbackComponent implements OnInit {

  feedback: any[] = [];
  totalCount = 0;
  loading = false;
  sourceFilter = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.loading = true;
    this.feedbackService.listFeedback({
      limit: 50,
      source: this.sourceFilter || undefined
    }).subscribe({
      next: (data) => {
        this.feedback = data.feedback || [];
        this.totalCount = data.totalCount || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onFilterChange(): void {
    this.loadFeedback();
  }

  updateStatus(id: number, status: string): void {
    this.feedbackService.updateStatus(id, status).subscribe({
      next: () => {
        const item = this.feedback.find(f => f.id === id);
        if (item) item.status = status;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'new': return '#005ea2';
      case 'reviewed': return '#e5a000';
      case 'resolved': return '#2e8540';
      case 'dismissed': return '#1b1b1b';
      default: return '#1b1b1b';
    }
  }
}
