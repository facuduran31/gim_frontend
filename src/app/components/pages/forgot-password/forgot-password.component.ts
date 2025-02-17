import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
 email: string = '';
  password: string = '';

  constructor(private userService: UsuarioService) {}

  

  forgotPassword(){
    this.userService.forgotPassword(this.email).subscribe({
      next: (res) => {
        console.log(res);
        alert('Se ha enviado un correo a tu dirección de correo electrónico');
      },
      error: (error) => {
        console.error('Error al cambiar contraseña:', error);
        alert('Error al cambiar contraseña');
      }
    });
  }
}
