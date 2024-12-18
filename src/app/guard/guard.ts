import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Redirigir al login si no está autenticado
    this.router.navigate(['/']);
    return false;
  }
}
