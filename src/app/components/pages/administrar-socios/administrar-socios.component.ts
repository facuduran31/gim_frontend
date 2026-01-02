import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Socio } from 'src/app/models/socio';
import { PagosService } from 'src/app/services/pago.service';
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
  pagos: Pago[] = [];
  idSocioPlanSeleccionado!: number;
  mostrarModalPagos = false;
  socioSeleccionado!: Socio;


  constructor(private route: ActivatedRoute, private sociosService: SociosService, private pagosService: PagosService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idGimnasio = parseInt(params.get('id') || '0')
      this.sociosService.getSociosByIdGimnasio(idGimnasio).subscribe(socios => {
        socios.forEach((socio: any) => {
          this.socios.push(new Socio(socio.idSocio, socio.dni, socio.nombre, socio.apellido, socio.telefono, socio.activo, socio.diaDePago, socio.idGimnasio, socio.idSocioPlan))
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

  openPagos(idSocio: number) {
    const socio = this.socios.find(s => s.idSocio === idSocio);
    if (!socio) return;

    this.socioSeleccionado = socio;

    // ESTE dato idealmente viene del backend
    this.idSocioPlanSeleccionado = socio.idSocioPlan;

    this.pagosService.getBySocioPlan(this.idSocioPlanSeleccionado).subscribe({
        next: pagos => {
          this.pagos = pagos;
          this.mostrarModalPagos = true;
          console.log(this.mostrarModalPagos);
          
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar los pagos', 'error');
        }
      });
    }

    cobrarCuota() {
    const nuevoPago = {
      idSocioPlan: this.idSocioPlanSeleccionado,
      idMetodoPago: 1, // efectivo por ejemplo
      monto: 5000,
      fechaPago: new Date()
    };

    this.pagosService.create(nuevoPago).subscribe(() => {
      Swal.fire('Pago registrado', '', 'success');
      this.openPagos(this.socioSeleccionado.idSocio);
    });
  }

  eliminarPago(idPago: number) {
    Swal.fire({
      title: 'Eliminar pago',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.pagosService.delete(idPago).subscribe(() => {
          this.pagos = this.pagos.filter(p => p.idPago !== idPago);
        });
      }
    });
  }

  cerrarModal() {
  this.mostrarModalPagos = false;
  this.pagos = [];
}

crearPago() {
  if (!this.socioSeleccionado) return;

  // Usamos SweetAlert para pedir los datos del pago
  Swal.fire({
    title: `Registrar pago para ${this.socioSeleccionado.nombre} ${this.socioSeleccionado.apellido}`,
    html:
      `<input type="number" id="monto" class="swal2-input" placeholder="Monto">` +
      `<select id="metodo" class="swal2-input">
          <option value="" disabled selected>Seleccione método</option>
          <option *ngFor="let metodo of metodosPago" value="{{metodo.idMetodoPago}}">
            {{metodo.nombre}}
          </option>
       </select>` +
      `<input type="date" id="fechaPago" class="swal2-input" value="${new Date().toISOString().split('T')[0]}">`,
    focusConfirm: false,
    preConfirm: () => {
      const montoInput = (document.getElementById('monto') as HTMLInputElement).value;
      const metodoInput = (document.getElementById('metodo') as HTMLSelectElement).value;
      const fechaInput = (document.getElementById('fechaPago') as HTMLInputElement).value;

      if (!montoInput || !metodoInput || !fechaInput) {
        Swal.showValidationMessage(`Por favor complete todos los campos`);
        return;
      }

      return {
        monto: parseFloat(montoInput),
        idMetodoPago: parseInt(metodoInput),
        fechaPago: fechaInput
      };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Construimos el objeto pago
      const nuevoPago = {
        idSocioPlan: this.socioSeleccionado.idSocioPlan,
        idMetodoPago: result.value.idMetodoPago,
        monto: result.value.monto,
        fechaPago: result.value.fechaPago
      };

      // Llamamos al servicio para guardar en backend
      this.pagosService.create(nuevoPago).subscribe(
        (res) => {
          Swal.fire({
            title: 'Pago registrado',
            icon: 'success',
            confirmButtonColor: '#00aa00'
          });
          // Recargamos los pagos para actualizar la tabla
          this.openPagos(this.socioSeleccionado.idSocio);
        },
        (err) => {
          Swal.fire({
            title: 'Error al registrar pago',
            text: err.error?.message || 'Revise la consola',
            icon: 'error',
            confirmButtonColor: '#aa0000'
          });
        }
      );
    }
  });
}





}


