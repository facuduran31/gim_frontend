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

  formIngreso = new FormGroup({
    dniSocio: new FormControl('', Validators.required)
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
        const ingresosConSocio$ = ingresos.map(ingreso =>
          this.sociosService.getSocioById(ingreso.idSocio).pipe(
            map(socio => ({
              ...ingreso,
              socio
            }))
          )
        );

        forkJoin(ingresosConSocio$).subscribe({
          next: (ingresosEnriquecidos: IngresoConSocio[]) => {
            this.ingresos = ingresosEnriquecidos;
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudieron cargar los socios de los ingresos',
              icon: 'error'
            });
          }
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los ingresos',
          icon: 'error'
        });
      }
    });
  }

  validarIngreso() {
    if (this.formIngreso.invalid) return;

    const dni = this.formIngreso.value.dniSocio!;
    Swal.showLoading();

    this.sociosService.validarIngreso(dni).subscribe({
      next: () => {
        Swal.fire({
          title: 'Ingreso validado con éxito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then(() => {
          this.cargarIngresos(); // recarga los ingresos sin recargar la página
          this.formIngreso.reset();
          console.log(this.ingresos);
          
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error al validar el ingreso',
          text: err.error || 'Ocurrió un error',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        });
      }
    });
  }
}
