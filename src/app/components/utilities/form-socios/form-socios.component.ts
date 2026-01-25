import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socio } from 'src/app/models/socio';
import { SocioCrear } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-socios',
  templateUrl: './form-socios.component.html',
  styleUrls: ['./form-socios.component.css'],
})
export class FormSociosComponent {
  modoEditar: boolean = false;

  @Input() socio: Socio = {
    idSocio: 0,
    dni: '',
    nombre: '',
    apellido: '',
    telefono: '',
    estado: false,
    idGimnasio: 0,
  };

  planes: Plan[] = [];

  inputDniSocio: string = '';
  inputNombreSocio: string = '';
  inputApellidoSocio: string = '';
  inputTelefonoSocio: string = '';
  inputEstadoSocio: boolean = false;
  inputPlan: Plan | null = null;
  ultimoSocioPlanId: number | null = null;

  constructor(
    private sociosService: SociosService,
    private route: ActivatedRoute,
    private planService: PlanService,
    private inscripcionesService: InscripcionesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.socio.idGimnasio = parseInt(params.get('id') || '0');
      this.socio.idSocio = parseInt(params.get('idSocio') || '0');

      this.planService.getPlans().subscribe((res: Plan[]) => {
        this.planes = res;

        if (this.socio.idSocio > 0) {
          this.modoEditar = true;

          this.sociosService
            .getSocioById(this.socio.idSocio)
            .subscribe((res) => {
              this.socio = res;
              this.inputDniSocio = res.dni;
              this.inputNombreSocio = res.nombre;
              this.inputApellidoSocio = res.apellido;
              this.inputTelefonoSocio = res.telefono;
              this.inputEstadoSocio = res.estado;
            });

          this.inscripcionesService
            .getLastInscripcion(this.socio.idSocio)
            .subscribe((plan) => {
              if (plan) {
                const planSeleccionado = this.planes.find(
                  (p) => p.idPlan === plan.idPlan,
                );
                if (planSeleccionado) this.inputPlan = planSeleccionado;

                this.ultimoSocioPlanId = plan.idPlan;
              }
            });
        }
      });
    });
  }

  editarSocio(): void {
    if (!this.inputPlan) {
      Swal.fire('Error', 'Debe seleccionar un plan', 'error');
      return;
    }

    const idGimnasio =
      this.socio.idGimnasio ||
      parseInt(this.route.snapshot.paramMap.get('id') || '0');

    const socioActualizado: Socio & { idPlan?: number; duracion?: number } = {
      ...this.socio,
      dni: this.inputDniSocio,
      nombre: this.inputNombreSocio,
      apellido: this.inputApellidoSocio,
      telefono: this.inputTelefonoSocio,
      estado: this.inputEstadoSocio,
      idGimnasio: idGimnasio,
      idPlan: this.inputPlan.idPlan,
      duracion: this.inputPlan.duracion,
    };

    this.sociosService.updateSocio(socioActualizado).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Socio actualizado correctamente', 'success').then(
          () => {
            this.router.navigate([
              `/gimnasio/${idGimnasio}/administrar-socios`,
            ]);
          },
        );
      },
      error: (err) => {
        console.error(err);
        Swal.fire(
          'Error',
          err.error?.error || err.message || 'Error desconocido',
          'error',
        );
      },
    });
  }

  crearSocio(): void {
    if (!this.inputPlan) {
      Swal.fire('Error', 'Debe seleccionar un plan', 'error');
      return;
    }

    const idGimnasio =
      this.socio.idGimnasio ||
      parseInt(this.route.snapshot.paramMap.get('id') || '0');

    const socioCrear: SocioCrear = {
      dni: this.inputDniSocio,
      nombre: this.inputNombreSocio,
      apellido: this.inputApellidoSocio,
      telefono: this.inputTelefonoSocio,
      estado: this.inputEstadoSocio,
      idGimnasio: idGimnasio,
      idPlan: this.inputPlan.idPlan,
      duracion: this.inputPlan.duracion,
    };

    this.sociosService.createSocio(socioCrear).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Éxito',
          'Socio creado correctamente con plan',
          'success',
        ).then(() => {
          this.router.navigate([`/gimnasio/${idGimnasio}/administrar-socios`]);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire(
          'Error',
          err.error?.error || err.message || 'Error desconocido',
          'error',
        );
      },
    });
  }
}
