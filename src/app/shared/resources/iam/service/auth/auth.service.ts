import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IAM_API_URL = environment.IAM_API_URL;

  helper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  authenticate(username, password) {


    return this.http.post<any>(`${this.IAM_API_URL}/token/authenticate`, {
      username, password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticated user', username);
          sessionStorage.setItem('jwt', `${data.token}`);
          sessionStorage.setItem('authToken', `Bearer ${data.token}`);
          this.decodedToken = this.helper.decodeToken(data.token);
          // console.log(this.decodedToken);
          return data;
        }
      )
    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticated user');
    const token = sessionStorage.getItem('jwt');
    const isExpired = this.helper.isTokenExpired(token);
    return !isExpired;
  }

  logout() {
    sessionStorage.removeItem('authenticated user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('jwt');
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticated user');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('authToken');
    }
  }

}
