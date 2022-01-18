import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Role } from './../../model/role.model';
import { UserRoleInfo } from './../../model/userRoleInfo.model';
import { Rolemap } from './../../model/rolemap.model';
import { Roles } from './../../model/roles.model';
import { User } from './../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  IAM_API_URL = environment.IAM_API_URL;
  private user: User;
  private roles: Roles;
  private cred: string;
  private users: User[];

  getUsers() {
    return this.http.get<User[]>(`${this.IAM_API_URL}/iam/users`);
  }

  getUser(id) {
    return this.http.get<User>(`${this.IAM_API_URL}/iam/users/${id}`);
  }

  deleteUser(id) {
    return this.http.delete(`${this.IAM_API_URL}/iam/users/${id}`);
  }

  updateUser(user: User, id: any) {
    return this.http.put<User>(`${this.IAM_API_URL}/iam/users/${id}`, user);
  }

  createUser(user) {
    return this.http.post<User>(`${this.IAM_API_URL}/signup`, user);
  }

  //
  getRoleMap(id) {
    return this.http.get<Rolemap>(`${this.IAM_API_URL}/iam/users/${id}`);
  }

  saveCred(user: User, id: any) {
    return this.http.put<string>(`${this.IAM_API_URL}/iam/resetcred/${id}`, user);
  }

  // getUserbyUsername(username: string) {
  //   return this.http.get<User>(`${this.IAM_API_URL}/iam/getuser/${username}`);
  // }

  getUserbyUsername(username: string) {
    return this.http.get<User>(`${this.IAM_API_URL}/iam/getuser/${username}`).pipe(
      retry(2),
      catchError(this.handleErrorgetUserbyUsername)
    );
  }

  handleErrorgetUserbyUsername(error: HttpErrorResponse) {
    // console.log('la la la');
    return throwError(error);
  }

  getUserRoleInfobyRoleId(id: any) {
    return this.http.get<UserRoleInfo[]>(`${this.IAM_API_URL}/iam/userbyroleid/${id}`);
  }

  getUserRoleInfo() {
    return this.http.get<UserRoleInfo[]>(`${this.IAM_API_URL}/iam/userroleinfo`);
  }

  createRole(role) {
    return this.http.post<Role>(`${this.IAM_API_URL}/iam/userroleinfo`, role);
  }

  getRolesByNameLike(name) {
    return this.http.get<Role>(`${this.IAM_API_URL}/iam/roles/searchnamelike?name=${name}`);
  }

  getRolesByDescLike(strdesc) {
    return this.http.get<Role[]>(`${this.IAM_API_URL}/iam/roles/searchdesclike?strdesc=${strdesc}`);
  }

  getUserRoleInfoByNameLike(name) {
    return this.http.get<UserRoleInfo[]>(`${this.IAM_API_URL}/iam/userroleinfo/searchnamelike?name=${name}`);
    // /iam/userroleinfo/searchnamelike?name=Todo-103
  }

  removeRoleFromUser(user: User, id: any){
    console.log();
  }

}
