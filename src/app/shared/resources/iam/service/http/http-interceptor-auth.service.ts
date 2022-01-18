import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const AuthString = this.authService.getAuthenticatedToken();
    const username = this.authService.getAuthenticatedUser();
    if (AuthString && username) {
      request = request.clone(
        {
          setHeaders: {
            Authorization: AuthString
          }
        }
      );
    }
    return next.handle(request);
  }
}
