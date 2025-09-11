import { Component, Input } from '@angular/core';
import { Socio } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-socios',
  templateUrl: './form-socios.component.html',
  styleUrls: ['./form-socios.component.css']
})
export class FormSociosComponent {

  modoEditar: boolean = false;

  @Input() socio: Socio = new Socio(0, "", "", "", "", false);



  constructor(private sociosService: SociosService) { }

  inputDniSocio: string = "";
  inputNombreSocio: string = "";
  inputApellidoSocio: string = "";
  inputTelefonoSocio: string = "";
  inputEstadoSocio: boolean = false;


  ngOnInit() {
    this.inputDniSocio = this.socio.dni;
    this.inputNombreSocio = this.socio.nombre;
    this.inputApellidoSocio = this.socio.apellido;
    this.inputTelefonoSocio = this.socio.telefono;
    this.inputEstadoSocio = this.socio.estado;
  }




  editarSocio() {

  }


  crearSocio() {
    this.socio.dni = this.inputDniSocio;
    this.socio.nombre = this.inputNombreSocio;
    this.socio.apellido = this.inputApellidoSocio;
    this.socio.telefono = this.inputTelefonoSocio;
    this.socio.estado = this.inputEstadoSocio;
    this.sociosService.createSocio(this.socio).subscribe((res: any) => {
      Swal.fire({
        title: 'Socio creado con exito',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#00aa00',
      }).then((result) => {
        window.location.reload(); // Recarga la página
      })
    },
      (error) => {
        Swal.fire({
          title: 'Error al crear el socio',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        })
      });
  }

}
