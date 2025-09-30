import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socio } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-socios',
  templateUrl: './administrar-socios.component.html',
  styleUrls: ['./administrar-socios.component.css']
})
export class AdministrarSociosComponent {


  modoAgregarSocio: boolean = false;
  socios: Array<Socio> = [];

  constructor(private route: ActivatedRoute, private sociosService: SociosService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idGimnasio = parseInt(params.get('id') || '0')
      this.sociosService.getSociosByIdGimnasio(idGimnasio).subscribe(socios => {
        socios.forEach((socio: any) => {
          this.socios.push(new Socio(socio.idSocio, socio.dni, socio.nombre, socio.apellido, socio.telefono, socio.activo, socio.idGimnasio))
        })
      });
    });
  }



  toggleModoAgregarSocio() {
    this.modoAgregarSocio = !this.modoAgregarSocio;
  }


  borrarSocio(id: number) {
    Swal.fire({
      title: '¡ADVERTENCIA!',
      text: 'SI BORRAS EL SOCIO TODA LA INFORMACIÓN SE PERDERÁ DE MANERA DEFINITIVA',
      icon: 'warning',
      showConfirmButton: true,
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: 'BORRAR',
      denyButtonText: 'Cancelar',
      confirmButtonColor: '#ff0000',
      denyButtonColor: '#555555'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sociosService.deleteSocio(id).subscribe(() => {
          Swal.fire({
            title: 'Socio borrado con exito',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#00aa00',
          }).then((result) => {
            window.location.reload(); // Recarga la página
          })
        },
          (error) => {
            Swal.fire({
              title: 'Error al borrar el socio',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0000aa'
            })
          });
      }

    })
  }

  inscribirSocio(idSocio:number){

  }


}


