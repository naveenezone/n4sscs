import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { Role } from './../../model/role.model';
import { UserRole } from './../../model/userrole.model';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  constructor(private http: HttpClient) { }

  IAM_API_URL = environment.IAM_API_URL;
  private role: Role;

  getRoles() {
    return this.http.get<Role[]>(`${this.IAM_API_URL}/iam/roles`);
  }

  getRole(id) {
    return this.http.get<Role>(`${this.IAM_API_URL}/iam/roles/${id}`);
  }

  deleteRole(id) {
    return this.http.delete(`${this.IAM_API_URL}/iam/roles/${id}`);
  }

  updateRole(id: number, role) {
    return this.http.put<Role>(`${this.IAM_API_URL}/iam/roles/${id}`, role);
  }

  createRole(role) {
    return this.http.post<Role>(`${this.IAM_API_URL}/iam/roles`, role);
  }

  assignNewRoleToUser(userrole: UserRole, roleId) {
    return this.http.post<Role>(`${this.IAM_API_URL}/iam/updateroles/${roleId}`, userrole).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  removeRoleFromUser(userrole: UserRole, roleId) {
    return this.http.post<Role>(`${this.IAM_API_URL}/iam/deleteroles/${roleId}`, userrole).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    // console.log('la la la');
    return throwError(error);
  }


}
