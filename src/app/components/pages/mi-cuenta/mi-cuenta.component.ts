import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/authservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css'],
})
export class MiCuentaComponent {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
  ) {}

  usuarioLogeado: Usuario = this.authService.getUsuario();
  inputNombreUsuario: string = '';
  inputApellidoUsuario: string = '';

  ngOnInit(): void {
    this.inputNombreUsuario = this.usuarioLogeado.nombre;
    this.inputApellidoUsuario = this.usuarioLogeado.apellido;
  }

  editarUsuario() {
    Swal.showLoading();

    const usuario = new Usuario(
      this.inputNombreUsuario,
      this.inputApellidoUsuario,
      this.usuarioLogeado.mail,
      '',
    );
    usuario.id = this.usuarioLogeado.id;

    this.usuarioService.updateUsuario(usuario).subscribe(
      (response) => {
        Swal.fire({
          text: 'Usuario actualizado correctamente',
          icon: 'success',
        });
        // aca hay que ver como hago para traer al usuario actualizado y guardarlo en la cookie
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar el usuario, intente nuevamente más tarde',
          icon: 'error',
        });
        console.error(error);
      },
    );
  }

  editarPassword() {
    Swal.showLoading();
    this.usuarioService.forgotPassword(this.usuarioLogeado.mail).subscribe({
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
