import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeedbackService {

  private baseUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) {}

  submitFeedback(payload: {
    source: 'manual_upload' | 'solicitation_detail' | 'contact_us';
    feedback_text: string;
    solicitation_number?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/feedback`, payload);
  }

  // Admin
  listFeedback(params?: { limit?: number; offset?: number; source?: string }): Observable<any> {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set('limit', String(params.limit));
    if (params?.offset) qs.set('offset', String(params.offset));
    if (params?.source) qs.set('source', params.source);
    const query = qs.toString() ? '?' + qs.toString() : '';
    return this.http.get<any>(`${this.baseUrl}/admin/feedback${query}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/feedback/${id}/status`, { status });
  }
}
