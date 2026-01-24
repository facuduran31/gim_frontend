import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Plan } from 'src/app/models/plan';
import { Socio } from 'src/app/models/socio';
import { PagosService } from 'src/app/services/pago.service';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-socios',
  templateUrl: './administrar-socios.component.html',
  styleUrls: ['./administrar-socios.component.css'],
})
export class AdministrarSociosComponent {
  modoAgregarSocio: boolean = false;
  socios: Array<any> = [];

  pagos: any[] = [];

  mostrarModalPagos = false;
  mostrarModalCrearPago = false;

  socioSeleccionado: any = null;

  nuevoPago: any = {
    fechaPago: new Date(),
    idMetodoPago: null,
    monto: null,
  };

  constructor(
    private route: ActivatedRoute,
    private sociosService: SociosService,
    private pagosService: PagosService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idGimnasio = parseInt(params.get('id') || '0');

      this.sociosService
        .getSociosByIdGimnasioConPlanActual(idGimnasio)
        .subscribe({
          next: (rows) => {
            this.socios = rows.map((r: any) => ({
              idSocio: r.idSocio,
              dni: r.dni,
              nombre: r.nombre,
              apellido: r.apellido,
              telefono: r.telefono,
              estado: r.activo,
              idGimnasio: r.idGimnasio,
              planActual: r.nombrePlan
                ? {
                    idPlan: r.idPlan,
                    nombrePlan: r.nombrePlan,
                    descripcion: r.descripcion,
                    duracion: r.duracion,
                    diasPorSemana: r.diasPorSemana,
                    fechaInicio: r.fechaInicio,
                    fechaFin: r.fechaFin,
                    idSocioPlan: r.idSocioPlan, // si te lo trae
                  }
                : null,
            }));
          },
          error: (err) => console.error(err),
        });
    });
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
      denyButtonColor: '#555555',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sociosService.deleteSocio(id).subscribe(
          () => {
            Swal.fire({
              title: 'Socio borrado con exito',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#00aa00',
            }).then(() => window.location.reload());
          },
          (error) => {
            Swal.fire({
              title: 'Error al borrar el socio',
              text: error?.error ?? 'Error',
              icon: 'error',
            });
          },
        );
      }
    });
  }

  openPagos(idSocio: number) {
    const socio = this.socios.find((s) => s.idSocio === idSocio);
    if (!socio) return;

    this.socioSeleccionado = socio;

    this.pagosService.getBySocio(idSocio).subscribe({
      next: (rows) => {
        this.pagos = rows;
        this.mostrarModalPagos = true;
      },
      error: () =>
        Swal.fire('Error', 'No se pudieron cargar los pagos', 'error'),
    });
  }

  eliminarPago(idPago: number) {
    Swal.fire({
      title: 'Eliminar pago',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagosService.delete(idPago).subscribe(() => {
          this.pagos = this.pagos.filter((p) => p.idPago !== idPago);
        });
      }
    });
  }

  cerrarModal() {
    this.mostrarModalPagos = false;
    this.pagos = [];
  }

  crearPago() {
    if (!this.socioSeleccionado?.planActual?.idSocioPlan) {
      Swal.fire(
        'Atención',
        'Este socio no tiene un plan activo para registrar pagos.',
        'info',
      );
      return;
    }

    this.nuevoPago = {
      idSocioPlan: this.socioSeleccionado.planActual.idSocioPlan,
      idMetodoPago: 1,
      monto: null,
      fechaPago: new Date(),
    };

    this.mostrarModalCrearPago = true;
  }

  cerrarModalPago() {
    this.mostrarModalCrearPago = false;
  }

  registrarPago() {
    if (
      !this.nuevoPago?.idSocioPlan ||
      !this.nuevoPago?.idMetodoPago ||
      !this.nuevoPago?.monto ||
      !this.nuevoPago?.fechaPago
    ) {
      Swal.fire('Faltan datos', 'Completá método, monto y fecha.', 'warning');
      return;
    }

    this.pagosService.create(this.nuevoPago).subscribe({
      next: () => {
        Swal.fire('Pago registrado', '', 'success');
        this.mostrarModalCrearPago = false;
        // recargar lista
        this.openPagos(this.socioSeleccionado.idSocio);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar el pago', 'error'),
    });
  }

  $eventAsDate(value: string): Date {
    return new Date(value);
  }
}
