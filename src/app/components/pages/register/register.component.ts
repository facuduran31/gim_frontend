import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private usuarioService: UsuarioService, private route: Router) { }

  inputNombre: string = '';
  inputApellido: string = '';
  inputEmail: string = '';
  inputPassword: string = '';
  inputRepeatPassword: string = '';

  registerUser() {
    const usuario = new Usuario(this.inputNombre, this.inputApellido, this.inputEmail, this.inputPassword);

    this.usuarioService.createUsuario(usuario).subscribe(
      {
        next: (data) => { 
          console.log('Usuario registrado:', data); 
          alert('Usuario registrado correctamente');
          this.route.navigate(['/']);
        },
        error: (error) => { console.error('Error al registrar usuario:', error); }
      }
    );

    console.log('Usuario registrado:', this.usuarioService.getUsuarios());
  }
}
