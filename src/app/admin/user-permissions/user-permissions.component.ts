// src/app/admin/user-permissions/user-permissions.component.ts
import { Component, OnInit } from '@angular/core';
import {
  UserPermissionsService,
  UserPermission
} from './user-permissions.service';    // adjust path if you’ve moved the service

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

  /* ------------------------------------------------------------------
   * State
   * ------------------------------------------------------------------ */
  users: UserPermission[] = [];             // full list from the API
  searchTerm = '';                          // bound to the search box
  userTypes = [                             // dropdown choices
    'Executive User',
    'Section 508 Coordinator',
    'Administrator'
  ];

  /* ------------------------------------------------------------------
   * Lifecycle
   * ------------------------------------------------------------------ */
  constructor(private ups: UserPermissionsService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /* ------------------------------------------------------------------
   * Public methods (template calls)
   * ------------------------------------------------------------------ */

  /** Pull the latest list from the backend */
  loadUsers(): void {
    this.ups.getUserPermissions().subscribe(
      data => (this.users = data),
      err  => alert('Failed to load users')
    );
  }

  /** Persist all edits to the backend */
  updateUsers(): void {
    this.ups.updateUserPermissions(this.users).subscribe(
      ()  => alert('User permissions updated successfully.'),
      err => alert('Failed to update user permissions')
    );
  }

    /* replace removeUser() in user-permissions.component.ts */
  removeUser(idx: number): void {
    const { id } = this.filteredUsers()[idx];       // grab actual user id
    if (!confirm('Permanently delete this user?')) return;

    this.ups.deleteUserPermission(id).subscribe(
      ()  => {
        // remove locally only after server success
        const originalIdx = this.users.findIndex(u => u.id === id);
        this.users.splice(originalIdx, 1);
      },
      err => alert('Failed to delete user')
    );
  }


  /** Live filter by email OR agency */
  filteredUsers(): UserPermission[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.users;

    return this.users.filter(u =>
      u.email.toLowerCase().includes(term) ||
      u.agency.toLowerCase().includes(term)
    );
  }
}
