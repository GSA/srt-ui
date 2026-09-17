import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminManagementService } from '../../shared/services/admin-management.service';
import { MasqService } from '../../user/masq/masq.service';
import { TokenService } from '../../shared/services/token.service';

interface PendingAction {
  title: string;
  message: string;
  confirmLabel: string;
  confirmClass: string;   // 'usa-button--secondary' for destructive, '' for normal
  execute: () => void;
}

/** One entry in the per-column filter state. Keys match user fields/virtual fields. */
type ColumnFilters = {
  email: string;
  agency: string;
  userRole: string;
  status: string;        // 'Active' | 'Pending' | 'Inactive' | ''
  createdAfter: string;  // yyyy-mm-dd from <input type="date">
};

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: false
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  agencies: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  // ── Filtering ──────────────────────────────────────────────────────
  // All filtering is client-side over the loaded list: one fetch, then
  // every keystroke filters instantly and the screen-reader count updates
  // without a network round trip.
  searchText = '';
  colFilters: ColumnFilters = { email: '', agency: '', userRole: '', status: '', createdAfter: '' };

  // Saved views are just named filter presets. 'inactive' here means the
  // rejected/deactivated STATUS, not "hasn't logged in lately" (that view
  // arrives with the last-login column in a later phase).
  activeView: 'all' | 'pending' | 'admins' | 'inactive' = 'all';

  // ── Sorting ────────────────────────────────────────────────────────
  sortField = '';
  sortDir: 1 | -1 = 1;

  // ── Last login (Phase 5) ────────────────────────────────────────────
  // email -> most recent authentication, from /api/admin/last-logins.
  lastLogins: { [email: string]: string } = {};
  lastLoginFilter: '' | '7' | '30' | '90plus' | 'never' = '';

  // ── Pagination (Phase 5) ────────────────────────────────────────────
  page = 1;
  readonly pageSize = 50;

  // Edit modal
  editingUser: any = null;
  editForm = { agency: '', userRole: '' };

  // Inline editing
  inlineEditing: { id: number; field: string } | null = null;

  // Bulk selection
  selectedUserIds: Set<number> = new Set();
  selectAll = false;

  // Confirmation modal
  pendingAction: PendingAction | null = null;

  // Available roles
  roles = ['Administrator', 'SRT Program Manager', 'Section 508 Coordinator', 'CO/COR'];

  constructor(
    private adminService: AdminManagementService,
    private masqService: MasqService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.restoreFromUrl();
    this.loadUsers();
    this.loadAgencies();
    this.adminService.getLastLogins().subscribe({
      next: (d) => { this.lastLogins = d.last_logins || {}; this.applyFilters(); },
      error: () => { /* column shows em-dashes; not fatal */ }
    });
  }

  /** Filters live in the URL so a filtered view can be bookmarked or shared. */
  private restoreFromUrl(): void {
    const p = this.route.snapshot.queryParamMap;
    this.searchText = p.get('q') || '';
    this.colFilters.email = p.get('email') || '';
    this.colFilters.agency = p.get('agency') || '';
    this.colFilters.userRole = p.get('role') || '';
    this.colFilters.status = p.get('status') || '';
    this.colFilters.createdAfter = p.get('created') || '';
    this.lastLoginFilter = (p.get('ll') as any) || '';
    const view = p.get('view');
    if (view === 'pending' || view === 'admins' || view === 'inactive') this.activeView = view;
  }

  /** replaceState (not router.navigate) so typing in a filter never adds history entries. */
  private writeUrl(): void {
    const parts: string[] = ['tab=users'];
    const add = (k: string, v: string) => { if (v) parts.push(k + '=' + encodeURIComponent(v)); };
    add('q', this.searchText);
    add('email', this.colFilters.email);
    add('agency', this.colFilters.agency);
    add('role', this.colFilters.userRole);
    add('status', this.colFilters.status);
    add('created', this.colFilters.createdAfter);
    add('ll', this.lastLoginFilter);
    if (this.activeView !== 'all') parts.push('view=' + this.activeView);
    this.location.replaceState('/admin', parts.join('&'));
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    // Fetch the full list once; filters are applied locally in applyFilters().
    this.adminService.listUsers({}).subscribe({
      next: (data) => {
        this.users = data.users || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users.';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  loadAgencies(): void {
    this.adminService.listAgencies().subscribe({
      next: (data) => { this.agencies = data.agencies || []; },
      error: () => {}
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // FILTERING, VIEWS, SORTING
  // ══════════════════════════════════════════════════════════════════

  applyFilters(): void {
    let result = [...this.users];

    if (this.searchText) {
      const s = this.searchText.toLowerCase();
      result = result.filter(u =>
        (u.firstName || '').toLowerCase().includes(s) ||
        (u.lastName || '').toLowerCase().includes(s) ||
        (u.email || '').toLowerCase().includes(s) ||
        (u.agency || '').toLowerCase().includes(s)
      );
    }

    const f = this.colFilters;
    if (f.email) {
      const e = f.email.toLowerCase();
      result = result.filter(u => (u.email || '').toLowerCase().includes(e));
    }
    if (f.agency) {
      result = result.filter(u => (u.agency || '') === f.agency);
    }
    if (f.userRole) {
      result = result.filter(u => (u.userRole || '') === f.userRole);
    }
    if (f.status) {
      result = result.filter(u => this.getUserStatus(u) === f.status);
    }
    if (this.lastLoginFilter) {
      const now = Date.now();
      result = result.filter(u => {
        const t = this.lastLoginTime(u);
        if (this.lastLoginFilter === 'never') return t === null;
        if (t === null) return false;
        const days = (now - t) / 86400000;
        if (this.lastLoginFilter === '7') return days <= 7;
        if (this.lastLoginFilter === '30') return days <= 30;
        return days > 90; // '90plus'
      });
    }
    if (f.createdAfter) {
      const cutoff = new Date(f.createdAfter).getTime();
      if (!isNaN(cutoff)) {
        result = result.filter(u => {
          const t = new Date(u.creationDate || u.createdAt || '').getTime();
          return !isNaN(t) && t >= cutoff;
        });
      }
    }

    if (this.sortField) {
      const dir = this.sortDir;
      const field = this.sortField;
      result.sort((a, b) => {
        const va = this.sortValue(a, field);
        const vb = this.sortValue(b, field);
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
    }

    this.filteredUsers = result;
    this.selectedUserIds.clear();
    this.selectAll = false;
    this.page = 1;
    this.writeUrl();
  }

  /** Epoch millis of the user's most recent login, or null if never seen. */
  lastLoginTime(u: any): number | null {
    const raw = this.lastLogins[(u.email || '').toLowerCase()];
    if (!raw) return null;
    const t = new Date(raw).getTime();
    return isNaN(t) ? null : t;
  }

  lastLoginDisplay(u: any): string {
    const t = this.lastLoginTime(u);
    if (t === null) return '—';
    const days = (Date.now() - t) / 86400000;
    if (days < 1) return 'Today';
    if (days < 2) return 'Yesterday';
    if (days < 30) return Math.floor(days) + ' days ago';
    return new Date(t).toLocaleDateString();
  }

  // ── Pagination ──────────────────────────────────────────────────────
  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredUsers.length / this.pageSize)); }
  get pagedUsers(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }
  get pageStart(): number { return this.filteredUsers.length === 0 ? 0 : (this.page - 1) * this.pageSize + 1; }
  get pageEnd(): number { return Math.min(this.page * this.pageSize, this.filteredUsers.length); }
  setPage(p: number): void {
    this.page = Math.min(Math.max(1, p), this.totalPages);
    this.selectedUserIds.clear();
    this.selectAll = false;
  }

  /** Comparable value for a column; dates sort as time, text case-insensitively. */
  private sortValue(u: any, field: string): any {
    if (field === 'status') return this.getUserStatus(u);
    if (field === 'lastLogin') { const t = this.lastLoginTime(u); return t === null ? 0 : t; }
    if (field === 'creationDate' || field === 'updatedAt') {
      const t = new Date(u[field] || '').getTime();
      return isNaN(t) ? 0 : t;
    }
    return (u[field] || '').toString().toLowerCase();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 1 ? -1 : 1;
    } else {
      this.sortField = field;
      this.sortDir = 1;
    }
    this.applyFilters();
  }

  /** aria-sort value for a header; 'none' keeps unsorted columns honest for AT. */
  ariaSort(field: string): string {
    if (this.sortField !== field) return 'none';
    return this.sortDir === 1 ? 'ascending' : 'descending';
  }

  onSearchChange(): void { this.applyFilters(); }
  onColFilterChange(): void { this.applyFilters(); }

  setView(view: 'all' | 'pending' | 'admins' | 'inactive'): void {
    this.activeView = view;
    // A view is a preset: it REPLACES the status/role filters but leaves
    // any email/agency/date filters the admin typed intact.
    this.colFilters.status = '';
    this.colFilters.userRole = '';
    if (view === 'pending') this.colFilters.status = 'Pending';
    if (view === 'inactive') this.colFilters.status = 'Deactivated';
    if (view === 'admins') this.colFilters.userRole = 'Administrator';
    this.applyFilters();
  }

  /** Chips for every active filter so state is visible and removable in one click. */
  get activeFilterChips(): { key: string; label: string }[] {
    const chips: { key: string; label: string }[] = [];
    if (this.searchText) chips.push({ key: 'search', label: 'Search: ' + this.searchText });
    if (this.colFilters.email) chips.push({ key: 'email', label: 'Email: ' + this.colFilters.email });
    if (this.colFilters.agency) chips.push({ key: 'agency', label: 'Agency: ' + this.colFilters.agency });
    if (this.colFilters.userRole) chips.push({ key: 'userRole', label: 'Role: ' + this.colFilters.userRole });
    if (this.colFilters.status) chips.push({ key: 'status', label: 'Status: ' + this.colFilters.status });
    if (this.colFilters.createdAfter) chips.push({ key: 'createdAfter', label: 'Created after: ' + this.colFilters.createdAfter });
    if (this.lastLoginFilter) {
      const labels: any = { '7': 'last 7 days', '30': 'last 30 days', '90plus': 'over 90 days', 'never': 'never' };
      chips.push({ key: 'lastLogin', label: 'Last login: ' + labels[this.lastLoginFilter] });
    }
    return chips;
  }

  removeFilter(key: string): void {
    if (key === 'search') this.searchText = '';
    else if (key === 'lastLogin') this.lastLoginFilter = '';
    else (this.colFilters as any)[key] = '';
    // Dropping a preset's own filter also deselects the preset chip.
    if ((key === 'status' && this.activeView !== 'admins') || (key === 'userRole' && this.activeView === 'admins')) {
      this.activeView = 'all';
    }
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.searchText = '';
    this.colFilters = { email: '', agency: '', userRole: '', status: '', createdAfter: '' };
    this.lastLoginFilter = '';
    this.activeView = 'all';
    this.applyFilters();
  }

  // ── CSV export of exactly what is on screen ─────────────────────────
  exportCsv(): void {
    const esc = (v: any) => {
      const s = (v === null || v === undefined) ? '' : String(v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const header = ['Email', 'First Name', 'Last Name', 'Agency', 'Role', 'Status', 'Last Login', 'Created', 'Updated'];
    const lines = this.filteredUsers.map(u => [
      u.email, u.firstName, u.lastName, u.agency, u.userRole,
      this.getUserStatus(u), this.lastLoginDisplay(u), u.creationDate, u.updatedAt
    ].map(esc).join(','));
    const csv = header.join(',') + '\n' + lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'srt-users-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    this.showSuccess('Exported ' + this.filteredUsers.length + ' user(s) to CSV.');
  }

  // ── Quick stats for the strip above the table ───────────────────────
  get statTotal(): number { return this.users.length; }
  get statPending(): number { return this.users.filter(u => this.getUserStatus(u) === 'Pending').length; }
  get statAdmins(): number { return this.users.filter(u => u.userRole === 'Administrator').length; }
  get statInactive(): number { return this.users.filter(u => this.getUserStatus(u) === 'Inactive').length; }

  // ── Masquerade (row action) ─────────────────────────────────────────
  // The masquerade API takes an agency + role pair, so "view as this user"
  // means adopting that user's agency and role. Replaces the old tab.
  masqueradeAs(user: any): void {
    const role = user.userRole || '';
    const agency = user.agency || '';
    this.pendingAction = {
      title: 'Masquerade',
      message: `View SRT as a ${role || 'user'} at ${agency || 'no agency'} (like ${user.email})?\n\nYou will leave Administration and see the app as that role. Sign out and back in to return to your own account.`,
      confirmLabel: 'Start masquerade',
      confirmClass: '',
      execute: () => {
        this.masqService.getMasqueradeToken(agency, role).subscribe({
          next: (data: any) => {
            this.tokenService.installToken(data.token);
            window.location.href = '/';
          },
          error: () => { this.errorMessage = 'Masquerade failed.'; }
        });
      }
    };
  }

  // Admin-set reviewStatus overrides the derived status. When empty, status is
  // derived from the accept/reject booleans exactly as before.
  getUserStatus(user: any): string {
    if (user.reviewStatus) return user.reviewStatus;
    if (user.isAccepted && !user.isRejected) return 'Active';
    if (user.isRejected) return 'Deactivated';
    return 'Pending';
  }

  // The statuses an admin can set by hand. Active/Pending/Deactivated remain
  // derived; the rest are review states stored on reviewStatus.
  readonly reviewStatuses = [
    'Active',
    'Pending',
    'Awaiting Reply',
    'On Hold',
    'Declined (Personal Email)',
    'Declined (Generic Mailbox)',
    'Deactivated',
  ];

  // Apply a chosen status: map it back to the accept/reject booleans plus the
  // reviewStatus string, then persist through the existing confirm+update flow.
  setUserStatus(user: any, status: string): void {
    if (this.getUserStatus(user) === status) { this.inlineEditing = null; return; }
    const updates: any = {};
    if (status === 'Active')      { updates.isAccepted = true;  updates.isRejected = false; updates.reviewStatus = ''; }
    else if (status === 'Pending'){ updates.isAccepted = false; updates.isRejected = false; updates.reviewStatus = ''; }
    else if (status === 'Deactivated') { updates.isAccepted = false; updates.isRejected = true; updates.reviewStatus = ''; }
    else if (status.startsWith('Declined')) { updates.isAccepted = false; updates.isRejected = true; updates.reviewStatus = status; }
    else { updates.isAccepted = false; updates.isRejected = false; updates.reviewStatus = status; } // Awaiting Reply / On Hold

    const fullName = `${user.firstName} ${user.lastName}`;
    this.pendingAction = {
      title: 'Change Status',
      message: `Set ${fullName} (${user.email}) to "${status}"?`,
      confirmLabel: 'Save',
      confirmClass: status === 'Deactivated' || status.startsWith('Declined') ? 'usa-button--secondary' : '',
      execute: () => {
        this.adminService.updateUser(user.id, updates).subscribe({
          next: (updated) => {
            const idx = this.users.findIndex(u => u.id === user.id);
            if (idx >= 0) this.users[idx] = updated;
            this.applyFilters();
            this.inlineEditing = null;
            this.showSuccess(`${fullName} set to ${status}.`);
          },
          error: () => { this.errorMessage = 'Failed to update status.'; this.inlineEditing = null; }
        });
      }
    };
  }

  getStatusClass(user: any): string {
    const status = this.getUserStatus(user);
    if (status === 'Active') return 'srt-badge--success';
    if (status === 'Deactivated' || status.startsWith('Declined')) return 'srt-badge--error';
    if (status === 'Awaiting Reply' || status === 'On Hold') return 'srt-badge--info';
    return 'srt-badge--warning'; // Pending
  }

  // ══════════════════════════════════════════════════════════════════
  // CONFIRMATION MODAL
  // ══════════════════════════════════════════════════════════════════

  confirmAction(): void {
    if (this.pendingAction) {
      this.pendingAction.execute();
    }
    this.pendingAction = null;
  }

  cancelAction(): void {
    // If we were doing an inline edit, clear it too
    this.inlineEditing = null;
    this.pendingAction = null;
  }

  // ── Toggle Status ──────────────────────────────────────────────────

  toggleStatus(user: any): void {
    const currentStatus = this.getUserStatus(user);
    const newStatus = currentStatus === 'Active' ? 'deactivate' : 'activate';
    const fullName = `${user.firstName} ${user.lastName}`;

    this.pendingAction = {
      title: `${newStatus === 'activate' ? 'Activate' : 'Deactivate'} User`,
      message: `Are you sure you want to ${newStatus} ${fullName} (${user.email})?`,
      confirmLabel: newStatus === 'activate' ? 'Activate' : 'Deactivate',
      confirmClass: newStatus === 'deactivate' ? 'usa-button--secondary' : '',
      execute: () => {
        this.adminService.toggleUserStatus(user.id).subscribe({
          next: (updated) => {
            const idx = this.users.findIndex(u => u.id === user.id);
            if (idx >= 0) this.users[idx] = updated;
            this.applyFilters();
            this.showSuccess(`${updated.firstName} ${updated.lastName} ${updated.isAccepted ? 'activated' : 'deactivated'}.`);
          },
          error: () => { this.errorMessage = 'Failed to toggle user status.'; }
        });
      }
    };
  }

  // ── Edit User ──────────────────────────────────────────────────────

  openEdit(user: any): void {
    this.editingUser = { ...user };
    this.editForm.agency = user.agency || '';
    this.editForm.userRole = user.userRole || '';
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  saveEdit(): void {
    if (!this.editingUser) return;
    const updates: any = {};
    if (this.editForm.agency !== this.editingUser.agency) updates.agency = this.editForm.agency;
    if (this.editForm.userRole !== this.editingUser.userRole) updates.userRole = this.editForm.userRole;

    if (Object.keys(updates).length === 0) {
      this.editingUser = null;
      return;
    }

    const fullName = `${this.editingUser.firstName} ${this.editingUser.lastName}`;
    const changeList = Object.entries(updates).map(([k, v]) => `${k === 'userRole' ? 'Role' : 'Agency'} → ${v}`).join(', ');
    const capturedUser = this.editingUser;

    this.pendingAction = {
      title: 'Confirm User Update',
      message: `Update ${fullName} (${capturedUser.email})?\n\nChanges: ${changeList}`,
      confirmLabel: 'Save Changes',
      confirmClass: '',
      execute: () => {
        this.adminService.updateUser(capturedUser.id, updates).subscribe({
          next: (updated) => {
            const idx = this.users.findIndex(u => u.id === capturedUser.id);
            if (idx >= 0) this.users[idx] = updated;
            this.applyFilters();
            this.editingUser = null;
            this.showSuccess(`Updated ${updated.firstName} ${updated.lastName}.`);
          },
          error: () => { this.errorMessage = 'Failed to update user.'; }
        });
      }
    };
  }

  // ── Bulk Actions ───────────────────────────────────────────────────

  toggleSelectAll(): void {
    if (this.selectAll) {
      // Select the visible page, not the whole filtered set — bulk actions
      // should never silently reach rows the admin cannot see.
      this.pagedUsers.forEach(u => this.selectedUserIds.add(u.id));
    } else {
      this.selectedUserIds.clear();
    }
  }

  toggleSelect(userId: number): void {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
    this.selectAll = this.pagedUsers.length > 0 && this.pagedUsers.every(u => this.selectedUserIds.has(u.id));
  }

  bulkDeactivate(): void {
    const ids = Array.from(this.selectedUserIds);
    if (ids.length === 0) return;

    const names = this.users
      .filter(u => ids.includes(u.id))
      .map(u => `${u.firstName} ${u.lastName}`)
      .join(', ');

    this.pendingAction = {
      title: 'Bulk Deactivate Users',
      message: `Are you sure you want to deactivate ${ids.length} user(s)?\n\n${names}`,
      confirmLabel: `Deactivate ${ids.length} User(s)`,
      confirmClass: 'usa-button--secondary',
      execute: () => {
        this.adminService.bulkDeactivate(ids).subscribe({
          next: () => {
            this.showSuccess(`${ids.length} user(s) deactivated.`);
            this.loadUsers();
          },
          error: () => { this.errorMessage = 'Failed to bulk deactivate.'; }
        });
      }
    };
  }

  // ── Inline Editing ──────────────────────────────────────────────

  startInlineEdit(user: any, field: string): void {
    this.inlineEditing = { id: user.id, field };
  }

  cancelInlineEdit(): void {
    // Small delay so blur doesn't cancel before ngModelChange fires
    setTimeout(() => { this.inlineEditing = null; }, 150);
  }

  saveInlineEdit(user: any, field: string, newValue: string): void {
    if (user[field] === newValue) {
      this.inlineEditing = null;
      return;
    }

    const fullName = `${user.firstName} ${user.lastName}`;
    const fieldLabel = field === 'userRole' ? 'role' : 'agency';
    const oldValue = user[field] || '(none)';

    this.pendingAction = {
      title: `Change ${fieldLabel === 'role' ? 'Role' : 'Agency'}`,
      message: `Change ${fullName}'s ${fieldLabel} from "${oldValue}" to "${newValue}"?`,
      confirmLabel: 'Save Change',
      confirmClass: '',
      execute: () => {
        const updates: any = {};
        updates[field] = newValue;

        this.adminService.updateUser(user.id, updates).subscribe({
          next: (updated) => {
            const idx = this.users.findIndex(u => u.id === user.id);
            if (idx >= 0) this.users[idx] = updated;
            this.applyFilters();
            this.inlineEditing = null;
            this.showSuccess(`Updated ${updated.firstName} ${updated.lastName}'s ${fieldLabel}.`);
          },
          error: () => {
            this.errorMessage = `Failed to update ${fieldLabel}.`;
            this.inlineEditing = null;
          }
        });
      }
    };
  }

  // ── Helpers ────────────────────────────────────────────────────────

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    this.errorMessage = '';
    setTimeout(() => { this.successMessage = ''; }, 4000);
  }
}
