import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { HistoricoPreciosService } from 'src/app/services/historico-precios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {
  planes: Plan[] = [];

  constructor(
    private planesService: PlanService,
    private historicoService: HistoricoPreciosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idGimnasio = Number(params.get('id')) || 0;

      // Traemos todos los planes del gimnasio
      this.planesService.getPlanesByIdGimnasio(idGimnasio).subscribe(
        (planesData) => {
          this.planes = planesData;

          // Por cada plan, consultamos el precio actual del histórico
          this.planes.forEach((plan) => {
            this.historicoService.getHistoricoByPlan(plan.idPlan).subscribe(
              (hist) => {
                if (hist && hist.length > 0) {
                  // Tomamos el precio más reciente (fechaHasta null o la última fechaDesde)
                  const precioActual =
                    hist.find((h) => h.fechaHasta === null) || hist[0];
                  plan.precio = precioActual.precio;
                } else {
                  plan.precio = 0;
                }
              },
              (error) => {
                console.error(
                  'Error al obtener histórico de precios del plan',
                  error,
                );
                plan.precio = 0;
              },
            );
          });
        },
        (error) => {
          console.error('Error al obtener los planes', error);
          Swal.fire('Error', 'No se pudieron cargar los planes', 'error');
        },
      );
    });
  }

  borrarPlan(idPlan: number) {
    Swal.fire({
      title: '¡ADVERTENCIA!',
      text: 'SI BORRAS EL PLAN TODA LA INFORMACIÓN SE PERDERÁ DE MANERA DEFINITIVA',
      icon: 'warning',
      showConfirmButton: true,
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: 'BORRAR',
      denyButtonText: 'Cancelar',
      confirmButtonColor: '#ff0000',
      denyButtonColor: '#555555',
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesService.deletePlan(idPlan).subscribe(
          () => {
            Swal.fire('Plan borrado con éxito', '', 'success').then(() =>
              this.ngOnInit(),
            );
          },
          (error) => {
            Swal.fire('Error', 'No se pudo borrar el plan', 'error');
          },
        );
      }
    });
  }

  editarPlan(idPlan: number) {
    this.router.navigate([idPlan], { relativeTo: this.route });
  }
}
