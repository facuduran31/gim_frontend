import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socio } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { Inscripcion } from 'src/app/models/inscripcion';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-form-socios',
  templateUrl: './form-socios.component.html',
  styleUrls: ['./form-socios.component.css']
})
export class FormSociosComponent {

  modoEditar: boolean = false;


  @Input() socio: Socio = new Socio(0, "", "", "", "", false, 0);

  planes: Array<Plan> = [new Plan(0, 'Seleccione un plan', '', 0, 0, 0, 0)];

  inscripcion: Inscripcion = new Inscripcion(null, 0, 0, new Date(), new Date(), '', '');



  constructor(private sociosService: SociosService, private route: ActivatedRoute, private planService: PlanService, private inscripcionesService: InscripcionesService) { }

  inputDniSocio: string = "";
  inputNombreSocio: string = "";
  inputApellidoSocio: string = "";
  inputTelefonoSocio: string = "";
  inputEstadoSocio: boolean = false;
  inputPlan: Plan = this.planes[0];


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.socio.idGimnasio = parseInt(params.get('id') || '0');
      this.socio.idSocio = parseInt(params.get('idSocio') || '0');

      // Cargar planes primero
      this.planService.getPlans().subscribe((res: any) => {
        this.planes = [new Plan(0, 'Seleccione un plan', '', 0, 0, 0, 0)];
        res.forEach((plan: any) => {
          this.planes.push(new Plan(plan.idPlan, plan.nombre, plan.descripcion, plan.precio, plan.duracion, plan.diasPorSemana, plan.idGimnasio));
        });

        // Si estamos en modo edición
        if (this.socio.idSocio > 0) {
          this.modoEditar = true;

          this.sociosService.getSocioById(this.socio.idSocio).subscribe((res: any) => {
            this.socio.nombre = res.nombre;
            this.socio.apellido = res.apellido;
            this.socio.dni = res.dni;
            this.socio.estado = res.activo;
            this.socio.idGimnasio = res.idGimnasio;
            this.socio.telefono = res.telefono;
            this.inputDniSocio = this.socio.dni;
            this.inputNombreSocio = this.socio.nombre;
            this.inputApellidoSocio = this.socio.apellido;
            this.inputTelefonoSocio = this.socio.telefono;
            this.inputEstadoSocio = this.socio.estado;
          });

          this.inscripcionesService.getLastInscripcion(this.socio.idSocio).subscribe((plan: any) => {
            // Buscar el plan en la lista ya cargada
            let idPlan = plan ? plan.idPlan : 0;
            const planSeleccionado = this.planes.find(p => p.idPlan === idPlan);
            if (planSeleccionado) {
              this.inputPlan = planSeleccionado;
            }
          });
        }
      });
    });
  }





  editarSocio() {
    this.socio.dni = this.inputDniSocio;
    this.socio.nombre = this.inputNombreSocio;
    this.socio.apellido = this.inputApellidoSocio;
    this.socio.telefono = this.inputTelefonoSocio;
    this.socio.estado = this.inputEstadoSocio;
    this.sociosService.updateSocio(this.socio).pipe(
      switchMap((res: any) => {
        let fechaIni = new Date();
        let fechaFin = new Date();
        fechaFin.setMonth(fechaIni.getMonth() + this.inputPlan.duracion)
        const inscripcion = new Inscripcion(null, this.socio.idSocio, this.inputPlan.idPlan, fechaIni, fechaFin, this.inputPlan.nombre, this.socio.dni);
        if (inscripcion.idPlan != 0) {
          return this.inscripcionesService.createInscripcion(inscripcion);
        }
        return of(res)
      })
    ).subscribe(
      {
        next: (res: any) => {
          Swal.fire({
            title: 'Socio actualizado con éxito',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#00aa00',
          }).then(() => {
            window.location.reload(); // Recarga la página
          });
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error al actualizar el socio',
            text: error.message || error,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0000aa'
          });
        }
      }
    )
  }



  crearSocio() {
    this.socio.dni = this.inputDniSocio;
    this.socio.nombre = this.inputNombreSocio;
    this.socio.apellido = this.inputApellidoSocio;
    this.socio.telefono = this.inputTelefonoSocio;
    this.socio.estado = this.inputEstadoSocio;
    this.sociosService.createSocio(this.socio).pipe(
      switchMap((res: any) => {
        let fechaIni = new Date();
        let fechaFin = new Date();
        fechaFin.setMonth(fechaIni.getMonth() + this.inputPlan.duracion)
        const inscripcion = new Inscripcion(null, res.idSocio, this.inputPlan.idPlan, fechaIni, fechaFin, this.inputPlan.nombre, this.socio.dni);
        console.log(inscripcion)
        if (inscripcion.idPlan != 0) {
          return this.inscripcionesService.createInscripcion(inscripcion);
        }
        return of(res)
      })
    ).subscribe({
      next: (response: any) => {
        Swal.showLoading();
        Swal.fire({
          title: 'Socio creado con éxito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then(() => {
          window.location.reload(); // Recarga la página
        });
      },
      error: (error: any) => {
        console.log(error)
        Swal.fire({
          title: 'Error al crear el socio',
          text: error.message || error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        });
      }
    }
    )
  }




}
