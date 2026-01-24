import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { HistoricoPreciosService } from 'src/app/services/historico-precios.service';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-planes',
  templateUrl: './form-planes.component.html',
  styleUrls: ['./form-planes.component.css'],
})
export class FormPlanesComponent implements OnInit {
  modoEditar = false;
  cargando = false;

  plan: Plan = {
    idPlan: 0,
    nombre: '',
    descripcion: '',
    precio: 0, // en backend se usa para histórico
    duracion: 0,
    diasPorSemana: 0,
  };

  inputNombrePlan = '';
  inputDescripcion = '';
  inputPrecio: number | null = null;
  inputDuracion: number | null = null;
  inputDiasPorSemana: number | null = null;

  constructor(
    private planesService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private historicoService: HistoricoPreciosService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idPlan = Number(params['idplan'] || 0);

      if (idPlan > 0) {
        this.modoEditar = true;
        this.cargarPlanParaEditar(idPlan);
      } else {
        this.plan.idGimnasio = Number(
          this.route.snapshot.paramMap.get('id') || 0,
        );
      }
    });
  }

  private cargarPlanParaEditar(idPlan: number) {
    this.cargando = true;

    this.planesService.getPlanById(idPlan).subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.cargando = false;
          Swal.fire('Error', 'No se encontró el plan', 'error');
          return;
        }

        const p = res[0];
        this.plan = p;

        this.inputNombrePlan = p.nombre ?? '';
        this.inputDescripcion = p.descripcion ?? '';
        this.inputDuracion = Number(p.duracion ?? 0);
        this.inputDiasPorSemana = Number(p.diasPorSemana ?? 0);

        this.plan.idGimnasio = Number(
          this.route.snapshot.paramMap.get('id') || 0,
        );

        this.historicoService.getHistoricoByPlan(p.idPlan).subscribe({
          next: (hist) => {
            if (hist && hist.length > 0) {
              const vigente =
                hist.find((h: any) => h.fechaHasta === null) ?? hist[0];
              this.inputPrecio = Number(vigente.precio ?? 0);
            } else {
              this.inputPrecio = null;
            }

            this.cargando = false;
          },
          error: (err) => {
            console.error(
              'Error al obtener histórico de precios del plan',
              err,
            );
            this.inputPrecio = null;
            this.cargando = false;
          },
        });
      },
      error: () => {
        this.cargando = false;
        Swal.fire('Error', 'No se pudo cargar el plan', 'error');
      },
    });
  }

  guardarPlan() {
    const idGimnasio = Number(this.route.snapshot.paramMap.get('id') || 0);
    const precio = Number(this.inputPrecio);

    if (!idGimnasio || Number.isNaN(idGimnasio)) {
      Swal.fire(
        'Error',
        'No se encontró el gimnasio (id inválido en la ruta)',
        'error',
      );
      return;
    }

    if (!precio || Number.isNaN(precio) || precio <= 0) {
      Swal.fire('Atención', 'El precio debe ser mayor a 0', 'warning');
      return;
    }

    const duracion = Number(this.inputDuracion);
    const dias = Number(this.inputDiasPorSemana);

    if (!duracion || Number.isNaN(duracion) || duracion <= 0) {
      Swal.fire('Atención', 'La duración debe ser mayor a 0', 'warning');
      return;
    }

    if (!dias || Number.isNaN(dias) || dias <= 0) {
      Swal.fire(
        'Atención',
        'Los días por semana deben ser mayor a 0',
        'warning',
      );
      return;
    }

    this.plan.nombre = this.inputNombrePlan.trim();
    this.plan.descripcion = this.inputDescripcion.trim();
    this.plan.precio = precio;
    this.plan.duracion = duracion;
    this.plan.diasPorSemana = dias;
    this.plan.idGimnasio = idGimnasio;

    Swal.showLoading();

    if (this.modoEditar) {
      this.planesService.updatePlan(this.plan).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Plan editado correctamente', 'success').then(() =>
            this.router.navigate(['/gimnasio', this.plan.idGimnasio, 'planes']),
          );
        },
        error: (error) => {
          console.error(error);
          Swal.fire(
            'Error',
            error?.error?.message ||
              error?.error?.error ||
              'No se pudo editar el plan',
            'error',
          );
        },
      });
    } else {
      this.planesService.createPlan(this.plan).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Plan creado correctamente', 'success').then(() =>
            this.router.navigate(['/gimnasio', this.plan.idGimnasio, 'planes']),
          );
        },
        error: (error) => {
          console.error(error);
          Swal.fire(
            'Error',
            error?.error?.message ||
              error?.error?.error ||
              'No se pudo crear el plan',
            'error',
          );
        },
      });
    }
  }
}
