import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gimnasio } from 'src/app/models/gimnasio';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/authservice.service';
import { GimnasioService } from 'src/app/services/gimnasio.service';

@Component({
  selector: 'app-form-gimnasio',
  templateUrl: './form-gimnasio.component.html',
  styleUrls: ['./form-gimnasio.component.css']
})
export class FormGimnasioComponent {

  constructor(private gimnasioService: GimnasioService, private authService: AuthService, private route: Router) { }

  gimnasio: Gimnasio = new Gimnasio('', '');
  usuarioLogeado: Usuario = this.authService.getUsuario();
  inputNombreGimnasio: string = '';
  inputLogoGimnasio: string = '';

  crearGimnasio() {
    this.gimnasio.nombre = this.inputNombreGimnasio;
    this.gimnasio.logo = this.inputLogoGimnasio;
    this.gimnasio.idUsuario = this.usuarioLogeado.id;
    this.gimnasioService.createGimnasio(this.gimnasio).subscribe(
      (response) => {
        alert('Gimnasio creado');
        this.route.navigate(['/mis-gimnasios']);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
