import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  inputNombre: string = '';
  inputApellido: string = '';
  inputEmail: string = '';
  inputPassword: string = '';
  inputRepeatPassword: string = '';

  registerUser() {
    const usuario = new Usuario(this.inputNombre, this.inputApellido, this.inputEmail, this.inputPassword);

    console.log('Usuario registrado:', usuario);
  }
}
