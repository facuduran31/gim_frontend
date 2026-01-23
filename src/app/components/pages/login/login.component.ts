import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          // ✅ Sellar sesión: validar /me antes de entrar a rutas protegidas
          this.authService.me().subscribe({
            next: () => this.router.navigate(['/main']),
            error: () => {
              Swal.fire({
                title: 'Sesión no iniciada',
                text: 'No se pudo validar la sesión. Reintentá.',
                icon: 'error',
              });
            },
          });
        },
        error: () => {
          Swal.fire({
            title: 'Credenciales incorrectas',
            text: 'Por favor, verifique su email y contraseña',
            icon: 'error',
          });
        },
      });
  }

  loginWithGoogle() {
    this.authService.beginGoogleLogin();
  }
}
