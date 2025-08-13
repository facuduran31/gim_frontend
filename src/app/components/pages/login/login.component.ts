import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private userService : UsuarioService) {}

  login() {
    this.authService.login({ mail: this.email, password: this.password }).subscribe({
      next: (res) => {
        // Redirigir a la página protegida
        console.log(res)
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        Swal.fire({
          title: "Creedenciales incorrectas",
          text: "Por favor, verifique su email y contraseña",
          icon: "error"
        });
      }
    });
  }

}
