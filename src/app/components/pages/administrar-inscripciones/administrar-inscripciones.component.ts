import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { PlanService } from 'src/app/services/plan.service';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-inscripciones',
  templateUrl: './administrar-inscripciones.component.html',
  styleUrls: ['./administrar-inscripciones.component.css']
})
export class AdministrarInscripcionesComponent {


  modoAgregarInscripcion: boolean = false;
  inscripciones: Array<Inscripcion> = [];

  constructor(private inscripcionesService: InscripcionesService, private route: ActivatedRoute, private planesService: PlanService, private sociosService: SociosService) { }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const idGimnasio = parseInt(params.get('id') || '0');
        return this.inscripcionesService.getInscripcionesByIdGimnasio(idGimnasio);
      }),
      switchMap((inscripciones: any[]) => {
        // Mapeo cada inscripcion a un observable que trae socio y plan
        const requests = inscripciones.map(inscripcion => {
          return forkJoin({
            plan: this.planesService.getPlanById(inscripcion.idPlan),
            socio: this.sociosService.getSocioById(inscripcion.idSocio)
          }).pipe(
            map(({ plan, socio }) => new Inscripcion(
              inscripcion.idSocioPlan,
              inscripcion.idSocio,
              inscripcion.idPlan,
              inscripcion.fechaInicio,
              inscripcion.fechaFin,
              plan[0].nombre,
              socio.dni
            ))
          );
        });

        // Espero a que terminen todas las peticiones de socios y planes
        return forkJoin(requests);
      })
    ).subscribe((inscripciones: Inscripcion[]) => {
      this.inscripciones = inscripciones;
    });
  }





  deleteInscripcion(idInscripcion: number) {
    Swal.fire({
      title: '¡ADVERTENCIA!',
      text: 'SI BORRAS LA INSCRIPCIÓN TODA LA INFORMACIÓN SE PERDERÁ DE MANERA DEFINITIVA',
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
        Swal.showLoading();
        this.inscripcionesService.deleteInscripcion(idInscripcion).subscribe(() => {
          Swal.fire({
            title: 'Inscripción borrada con exito',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#00aa00',
          }).then((result) => {
            window.location.reload(); // Recarga la página
          })
        },
          (error) => {
            console.log(error)
            Swal.fire({
              title: 'Error al borrar la inscripción',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0000aa'
            })
          });
      }

    })
  }

}
