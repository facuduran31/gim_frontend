import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/authservice.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Mostrar alerta de sesión expirada
    Swal.fire({
      title: 'Sesión expirada',
      text: 'Debes iniciar sesión para acceder a esta sección',
      icon: 'warning',
      confirmButtonText: 'Ir al login',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      this.router.navigate(['/']);
    });

    return false; // Bloquea el acceso mientras se muestra la alerta
  }
}
