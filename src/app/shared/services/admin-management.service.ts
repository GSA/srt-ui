import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminManagementService {

  private baseUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) {}

  // ── Agency Management ──────────────────────────────────────────────
  //
  // Solicitation access and deviation inheritance are separate relationships
  // and have separate endpoints. Setting one never moves the other, so the two
  // methods below must not be combined into a single "save agency" call.

  /** Hierarchy, domains, user counts, access scope, and deviation, in one call. */
  getAgencyManagement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/agency-management`);
  }

  createAgency(payload: {
    agency: string; acronym?: string; agencyType: string; parentId?: number | null;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/agencies`, payload);
  }

  /** Edit, deactivate, or reparent. Agencies are deactivated, never deleted. */
  updateAgency(agencyId: number, updates: {
    agency?: string; acronym?: string; agencyType?: string;
    parentId?: number | null; active?: boolean;
  }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/agencies/${agencyId}`, updates);
  }

  /** Which agencies' solicitations this agency's users may see. Access only. */
  setSolicitationScope(agencyId: number, visibleAgencyIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/agencies/${agencyId}/scope`, { visibleAgencyIds });
  }

  /** Whose deviation applies. Null returns the agency to inheriting its parent. */
  setDeviationSource(agencyId: number, deviationSourceId: number | null): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/agencies/${agencyId}/deviation`, { deviationSourceId });
  }

  createAgencyDomain(domain: string, agencyId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/agency-domains`, { domain, agencyId });
  }

  updateAgencyDomain(domainId: number, updates: {
    domain?: string; agencyId?: number; active?: boolean;
  }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/agency-domains/${domainId}`, updates);
  }

  deleteAgencyDomain(domainId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/admin/agency-domains/${domainId}`);
  }

  /** Domains that did not resolve to a known agency at login, grouped by domain. */
  getNeedsReview(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/needs-review`);
  }

  /**
   * Resolve one domain for every user parked on it. Pass an existing agencyId,
   * or a newComponent under a named parent. Creating a top-level agency is a
   * separate deliberate act through createAgency.
   */
  resolveNeedsReview(payload: {
    domain: string;
    agencyId?: number;
    newComponent?: { agency: string; acronym?: string; agencyType?: string; parentId: number };
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/needs-review/resolve`, payload);
  }

  // ── User Management ────────────────────────────────────────────────

  listUsers(params?: { status?: string; agency?: string; search?: string }): Observable<any> {
    const queryParts: string[] = [];
    if (params?.status) queryParts.push(`status=${encodeURIComponent(params.status)}`);
    if (params?.agency) queryParts.push(`agency=${encodeURIComponent(params.agency)}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    const qs = queryParts.length ? '?' + queryParts.join('&') : '';
    return this.http.get<any>(`${this.baseUrl}/admin/users${qs}`);
  }

  /** Phase 3: headline counts + ingestion freshness for the Operations banner. */
  getOverview(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/overview`);
  }

  /** Phase 5: email -> last authentication timestamp for the Users table. */
  getLastLogins(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/last-logins`);
  }

  updateUser(userId: number, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/users/${userId}`, updates);
  }

  toggleUserStatus(userId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/users/${userId}/toggle-status`, {});
  }

  bulkDeactivate(userIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/users/bulk-deactivate`, { userIds });
  }

  // ── Audit Log ──────────────────────────────────────────────────────

  getAuditLog(limit = 100, offset = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/audit-log?limit=${limit}&offset=${offset}`);
  }

  // ── Website Analytics ──────────────────────────────────────────────

  getAnalyticsOverview(days = 30): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/analytics/overview?days=${days}`);
  }

  getFeatureUsage(days = 30): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/analytics/feature-usage?days=${days}`);
  }

  // ── System Health ──────────────────────────────────────────────────

  getSystemHealth(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/system-health`);
  }

  getScheduledPipelineStats(days = 30): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/scheduled-pipeline-stats?days=${days}`);
  }

  // ── Agencies ───────────────────────────────────────────────────────

  listAgencies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/agencies`);
  }

  // ── Activity Tracking ──────────────────────────────────────────────

  trackEvent(event: {
    eventType: string;
    eventName?: string;
    pageUrl?: string;
    pageTitle?: string;
    metadata?: any;
    durationMs?: number;
    sessionId?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/analytics/track`, event);
  }

  trackBatch(events: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/analytics/track-batch`, { events });
  }

  // ── Email ──────────────────────────────────────────────────────────

  sendBulkEmail(payload: {
    templateId: string;
    subject: string;
    body: string;
    recipientMode: string;
    agency?: string;
    role?: string;
    inactivityDays?: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/send-bulk-email`, payload);
  }
}
