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
    // ✅ Siempre enviar credenciales (cookies httpOnly)
    const authReq = req.clone({ withCredentials: true });

    // No queremos alertar por 401 “esperables” en endpoints de auth-check
    const isMeEndpoint = req.url.includes('/usuarios/me');
    const isLoginEndpoint = req.url.includes('/usuarios/login');
    const isLogoutEndpoint = req.url.includes('/usuarios/logout');

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // ✅ Si es login/logout/me, no rompas el flujo con swal automático
        if (
          error.status === 401 &&
          (isMeEndpoint || isLoginEndpoint || isLogoutEndpoint)
        ) {
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
            this.authService.logout(); // redirige al login y limpia estado
            this.alreadyRedirecting = false;
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
