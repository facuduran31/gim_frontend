import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private alreadyRedirecting = false;

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // ✅ Siempre enviar cookies
    const authReq = req.clone({ withCredentials: true });

    // 401 “esperables” donde NO queremos Swal automático
    const ignore401 =
      req.url.includes('/usuarios/me') ||
      req.url.includes('/usuarios/login') ||
      req.url.includes('/usuarios/logout') ||
      req.url.includes('/auth/google') ||
      req.url.includes('/auth/google/callback');

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && ignore401) {
          return throwError(() => error);
        }

        if (error.status === 401 && !this.alreadyRedirecting) {
          this.alreadyRedirecting = true;

          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha caducado. Por favor inicia sesión nuevamente.',
            icon: 'warning',
            confirmButtonText: 'Ir al login',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            this.authService.logout();
            this.alreadyRedirecting = false;
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
