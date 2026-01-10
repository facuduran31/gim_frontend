import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';
import { Ingreso } from 'src/app/models/ingreso';
import { Socio } from 'src/app/models/socio';
import { IngresoService } from 'src/app/services/ingreso.service';
import { SociosService } from 'src/app/services/socios.service';

interface IngresoConSocio extends Ingreso {
  socio: Socio;
}

@Component({
  selector: 'app-administrar-ingresos',
  templateUrl: './administrar-ingresos.component.html',
  styleUrls: ['./administrar-ingresos.component.css']
})
export class AdministrarIngresosComponent implements OnInit {

  ingresos: IngresoConSocio[] = [];
  idGimnasio!: number;
  procesando: boolean = false; // Para controlar el estado del botón

  formIngreso = new FormGroup({
    dniSocio: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10)
    ])
  });

  constructor(
    private sociosService: SociosService,
    private ingresoService: IngresoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idGimnasio = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.idGimnasio) {
      Swal.fire({
        title: 'Error',
        text: 'Gimnasio inválido',
        icon: 'error'
      });
      return;
    }

    this.cargarIngresos();
  }

  cargarIngresos() {
    this.ingresoService.getIngresosByIdGimnasio(this.idGimnasio).subscribe({
      next: (ingresos: Ingreso[]) => {
        const ingresosConDatos$ = ingresos.map(ing =>
          this.sociosService.getSocioById(ing.idSocio).pipe(
            map(socio => ({
              ...ing,
              socio
            }))
          )
        );

        forkJoin(ingresosConDatos$).subscribe({
          next: (resultado) => this.ingresos = resultado,
          error: () =>
            Swal.fire('Error', 'No se pudieron cargar los datos de los socios', 'error')
        });

      },
      error: () =>
        Swal.fire('Error', 'No se pudieron cargar los ingresos', 'error')
    });
  }

  validarIngreso() {
    if (this.formIngreso.invalid) {
      Swal.fire('Error', 'Debes ingresar un DNI válido', 'error');
      return;
    }

    const dni = this.formIngreso.value.dniSocio!;
    this.procesando = true; // Deshabilita el botón

    Swal.showLoading();

    this.ingresoService.validarIngreso(dni, this.idGimnasio).subscribe({
      next: () => {
        Swal.fire({
          title: 'Ingreso validado',
          icon: 'success'
        }).then(() => {
          this.cargarIngresos();

          // Reseteamos el formulario correctamente
          this.formIngreso.reset();
          this.formIngreso.markAsPristine();
          this.formIngreso.markAsUntouched();
          this.formIngreso.updateValueAndValidity();

          this.procesando = false; // Rehabilita el botón
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error al validar',
          text: err.error?.error ?? 'Ocurrió un error inesperado',
          icon: 'error'
        }).then(() => {
          // Restaurar formulario y habilitar botón
          this.formIngreso.markAsPristine();
          this.formIngreso.markAsUntouched();
          this.formIngreso.updateValueAndValidity();
          this.procesando = false;
        });
      }
    });
  }
}
