// src/app/admin/user-permissions/user-permissions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface UserPermission {
  id: number;                 // primary key
  email: string;
  agency: string;
  userType: string;
  isAccepted: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserPermissionsService {
  private readonly baseURL = `${environment.SERVER_URL}/user/permissions`;

  constructor(private http: HttpClient) {}

  /** GET /users  */
  getUserPermissions(): Observable<UserPermission[]> {
    return this.http.get<UserPermission[]>(this.baseURL);
  }

  /** PUT /users  */
  updateUserPermissions(payload: UserPermission[]): Observable<void> {
    return this.http.put<void>(this.baseURL, payload);
  }

    // user-permissions.service.ts
  deleteUserPermission(id: number) {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
