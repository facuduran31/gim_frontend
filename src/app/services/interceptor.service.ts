import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private alreadyRedirecting = false; // evita bucle infinito
  private ignoredUrls = ['/usuarios/login', '/usuarios/logout', '/usuarios/register'];

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Ignorar ciertas URLs
    if (this.ignoredUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    const authReq = req.clone({
      withCredentials: true
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.alreadyRedirecting) {
          this.alreadyRedirecting = true; // bloquear múltiples alertas

          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha caducado. Por favor inicia sesión nuevamente.',
            icon: 'warning',
            confirmButtonText: 'Ir al login',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.authService.logout(); // redirige al login
          });
        }

        return throwError(() => error);
      })
    );
  }
}
