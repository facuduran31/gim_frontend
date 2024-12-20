import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gimnasio } from 'src/app/models/gimnasio';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/authservice.service';
import { GimnasioService } from 'src/app/services/gimnasio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-gimnasio',
  templateUrl: './form-gimnasio.component.html',
  styleUrls: ['./form-gimnasio.component.css']
})
export class FormGimnasioComponent implements OnInit {

  constructor(private gimnasioService: GimnasioService, private authService: AuthService, private route: Router) { }

  @Input() gimnasio: Gimnasio = new Gimnasio('', '');
  usuarioLogeado: Usuario = this.authService.getUsuario();
  inputNombreGimnasio: string = '';
  inputLogoGimnasio: string = '';

  ngOnInit(): void {
    this.inputNombreGimnasio = this.gimnasio.nombre;
  }

  crearGimnasio() {
    this.gimnasio.nombre = this.inputNombreGimnasio;
    this.gimnasio.logo = this.inputLogoGimnasio;
    this.gimnasio.idUsuario = this.usuarioLogeado.id;
    this.gimnasioService.createGimnasio(this.gimnasio).subscribe(
      (response) => {
        Swal.fire({
          title: 'Gimnasio creado con exito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then((result) => {
          this.route.navigateByUrl('/mis-gimnasios', { skipLocationChange: true }).then(() => {
            window.location.reload(); // Recarga la página
          });
        })
      },
      (error) => {
        Swal.fire({
          title: 'Error al crear el gimnasio',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        })
      }
    );
  }

}
