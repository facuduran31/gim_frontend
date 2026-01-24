import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Pago } from 'src/app/models/pago';
import { Socio } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';
import { PagosService } from 'src/app/services/pago.service';
import { MetodoPago } from 'src/app/models/metodo-pago';
import { MetodoPagoService } from 'src/app/services/metodo-pago.service';

@Component({
  selector: 'app-administrar-socios',
  templateUrl: './administrar-socios.component.html',
  styleUrls: ['./administrar-socios.component.css'],
})
export class AdministrarSociosComponent {
  modoAgregarSocio = false;

  socios: Array<any> = [];
  pagos: any[] = [];

  mostrarModalPagos = false;
  mostrarModalCrearPago = false;

  socioSeleccionado: any = null;

  metodosPago: MetodoPago[] = [];

  nuevoPago: any = {
    idMetodoPago: null as number | null,
    monto: null as number | null,
    fechaPago: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private sociosService: SociosService,
    private pagosService: PagosService,
    private metodoPagoService: MetodoPagoService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idGimnasio = parseInt(params.get('id') || '0', 10);

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
                    precioPlan: r.precioPlan,
                    idSocioPlan: r.idSocioPlan,
                  }
                : null,
            }));
          },
          error: (err) => console.error(err),
        });
    });

    this.metodoPagoService.getAll().subscribe({
      next: (data) => (this.metodosPago = data),
      error: () => {
        console.warn('No se pudieron cargar los métodos de pago');
      },
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
    const idSocioPlan = socio?.planActual?.idSocioPlan;
    if (!idSocioPlan) {
      this.pagos = [];
      this.mostrarModalPagos = true;
      return;
    }

    this.pagosService.getBySocioPlan(idSocioPlan).subscribe({
      next: (rows) => {
        this.pagos = (rows as any[]).map((p) => ({
          ...p,
          metodoPago: p.metodoPago ?? this.getMetodoPagoNombre(p.idMetodoPago),
        }));
        this.mostrarModalPagos = true;
      },
      error: () =>
        Swal.fire('Error', 'No se pudieron cargar los pagos', 'error'),
    });
  }

  getMetodoPagoNombre(idMetodoPago: number): string {
    const m = this.metodosPago.find((x) => x.idMetodoPago === idMetodoPago);
    return m ? m.nombre : `#${idMetodoPago}`;
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
    const idSocioPlan = this.socioSeleccionado?.planActual?.idSocioPlan;

    if (!idSocioPlan) {
      Swal.fire(
        'Atención',
        'Este socio no tiene un plan activo para registrar pagos.',
        'info',
      );
      return;
    }

    const precioPlan = Number(
      this.socioSeleccionado?.planActual?.precioPlan ?? 0,
    );

    this.nuevoPago = {
      idSocioPlan,
      idMetodoPago: this.metodosPago.length
        ? this.metodosPago[0].idMetodoPago
        : null,
      monto: precioPlan > 0 ? precioPlan : null,
      fechaPago: new Date(),
    };

    this.mostrarModalCrearPago = true;
  }

  cerrarModalPago() {
    this.mostrarModalCrearPago = false;
  }

  registrarPago() {
    if (!this.nuevoPago?.idSocioPlan) {
      Swal.fire('Error', 'No se detectó el plan del socio.', 'error');
      return;
    }

    const idMetodoPagoNum = Number(this.nuevoPago.idMetodoPago);
    const montoNum = Number(this.nuevoPago.monto);

    if (!idMetodoPagoNum || isNaN(idMetodoPagoNum)) {
      Swal.fire('Faltan datos', 'Seleccioná un método de pago.', 'warning');
      return;
    }

    if (!montoNum || isNaN(montoNum) || montoNum <= 0) {
      Swal.fire('Faltan datos', 'Ingresá un monto válido.', 'warning');
      return;
    }

    if (!this.nuevoPago.fechaPago) {
      Swal.fire('Faltan datos', 'Seleccioná una fecha.', 'warning');
      return;
    }

    const payload = {
      idSocioPlan: this.nuevoPago.idSocioPlan,
      idMetodoPago: idMetodoPagoNum,
      monto: montoNum,
      fechaPago: this.nuevoPago.fechaPago,
    };

    this.pagosService.create(payload).subscribe({
      next: () => {
        Swal.fire('Pago registrado', '', 'success');
        this.mostrarModalCrearPago = false;
        this.openPagos(this.socioSeleccionado.idSocio);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar el pago', 'error'),
    });
  }

  $eventAsDate(value: string): Date {
    return new Date(value);
  }
}
