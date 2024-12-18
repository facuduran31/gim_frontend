import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private usuarioService: UsuarioService) { }

  inputNombre: string = '';
  inputApellido: string = '';
  inputEmail: string = '';
  inputPassword: string = '';
  inputRepeatPassword: string = '';

  registerUser() {
    const usuario = new Usuario(this.inputNombre, this.inputApellido, this.inputEmail, this.inputPassword);

    this.usuarioService.createUsuario(usuario).subscribe(
      {
        next: (data) => { console.log('Usuario registrado:', data); },
        error: (error) => { console.error('Error al registrar usuario:', error); }
      }
    );

    console.log('Usuario registrado:', this.usuarioService.getUsuarios());
  }
}
