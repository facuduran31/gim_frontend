import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // 1) Si ya tenemos usuario en memoria, ok
    if (this.authService.isLoggedIn()) {
      return of(true);
    }

    // 2) Si no, intentamos validar sesión vía cookie (GET /usuarios/me)
    return this.authService.me().pipe(
      map(() => true),
      catchError(() => of(this.router.createUrlTree(['/login']))),
    );
  }
}
