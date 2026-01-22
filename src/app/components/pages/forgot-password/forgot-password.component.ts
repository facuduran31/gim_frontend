import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UsuarioService) {}

  forgotPassword() {
    Swal.showLoading();
    this.userService.forgotPassword(this.email).subscribe({
      next: (res) => {
        Swal.fire({
          text: 'Se ha enviado un correo a tu dirección de correo electrónico para restablecer tu contraseña',
          icon: 'info',
        });
      },
      error: (error) => {
        console.error('Error al cambiar contraseña:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al enviar el correo, intenta de nuevo mas tarde',
          icon: 'error',
        });
      },
    });
  }
}
