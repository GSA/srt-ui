import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-ai-analytics',
    templateUrl: './ai-analytics.component.html',
    styleUrls: ['./ai-analytics.component.scss'],
    standalone: false
})
export class AiAnalyticsComponent implements OnInit {
  usage: any = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.fetchUsage();
  }

  fetchUsage() {
    this.loading = true;
    fetch(`${environment.SERVER_URL}/rag-analytics/adhoc-usage`)
      .then(res => res.json())
      .then(data => {
        this.usage = data;
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      });
  }
}
