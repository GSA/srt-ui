import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../../shared/services/admin-management.service';

interface PendingAction {
  title: string;
  message: string;
  confirmLabel: string;
  confirmClass: string;   // 'usa-button--secondary' for destructive, '' for normal
  execute: () => void;
}

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

  // Filters
  searchText = '';
  statusFilter = '';
  agencyFilter = '';

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

  constructor(private adminService: AdminManagementService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAgencies();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.adminService.listUsers({
      status: this.statusFilter || undefined,
      agency: this.agencyFilter || undefined,
      search: this.searchText || undefined
    }).subscribe({
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

  applyFilters(): void {
    let result = [...this.users];
    if (this.searchText) {
      const s = this.searchText.toLowerCase();
      result = result.filter(u =>
        (u.firstName || '').toLowerCase().includes(s) ||
        (u.lastName || '').toLowerCase().includes(s) ||
        (u.email || '').toLowerCase().includes(s)
      );
    }
    this.filteredUsers = result;
    this.selectedUserIds.clear();
    this.selectAll = false;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.loadUsers();
  }

  getUserStatus(user: any): string {
    if (user.isAccepted && !user.isRejected) return 'Active';
    if (user.isRejected) return 'Inactive';
    return 'Pending';
  }

  getStatusClass(user: any): string {
    const status = this.getUserStatus(user);
    if (status === 'Active') return 'srt-badge--success';
    if (status === 'Inactive') return 'srt-badge--error';
    return 'srt-badge--warning';
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
      this.filteredUsers.forEach(u => this.selectedUserIds.add(u.id));
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
    this.selectAll = this.selectedUserIds.size === this.filteredUsers.length;
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
