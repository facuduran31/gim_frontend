import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ mail: this.email, password: this.password }).subscribe({
      next: (res) => {
        // Redirigir a la página protegida
        console.log(res)
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Credenciales inválidas');
      }
    });
  }


}
