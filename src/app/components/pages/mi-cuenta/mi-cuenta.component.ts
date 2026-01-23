import { Component, OnInit } from '@angular/core';
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
export class MiCuentaComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
  ) {}

  usuarioLogeado: Usuario | null = null;

  inputNombreUsuario: string = '';
  inputApellidoUsuario: string = '';

  ngOnInit(): void {
    const u = this.authService.getUsuario();

    // ✅ Si no hay usuario en memoria, forzamos a login (o podés llamar this.authService.me())
    if (!u) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioLogeado = u;

    // ✅ Precargar inputs con datos actuales
    this.inputNombreUsuario = u.nombre ?? '';
    this.inputApellidoUsuario = u.apellido ?? '';
  }

  editarUsuario() {
    if (!this.usuarioLogeado) {
      this.router.navigate(['/login']);
      return;
    }

    Swal.showLoading();

    const usuario = new Usuario(
      this.inputNombreUsuario,
      this.inputApellidoUsuario,
      this.usuarioLogeado.mail, // ✅ ahora TS no se queja
      '',
    );

    usuario.id = this.usuarioLogeado.id;

    this.usuarioService.updateUsuario(usuario).subscribe({
      next: () => {
        Swal.fire({
          text: 'Usuario actualizado correctamente',
          icon: 'success',
        });

        // ✅ Sugerencia: volver a pedir /usuarios/me para refrescar estado
        this.authService.me().subscribe({
          next: () => {},
          error: () => {},
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar el usuario, intente nuevamente más tarde',
          icon: 'error',
        });
        console.error(error);
      },
    });
  }

  editarPassword() {
    if (!this.usuarioLogeado) {
      this.router.navigate(['/login']);
      return;
    }

    Swal.showLoading();

    this.usuarioService.forgotPassword(this.usuarioLogeado.mail).subscribe({
      next: () => {
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
