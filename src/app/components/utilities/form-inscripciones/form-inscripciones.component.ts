import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Plan } from 'src/app/models/plan';
import { Socio } from 'src/app/models/socio';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { PlanService } from 'src/app/services/plan.service';
import { SociosService } from 'src/app/services/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-inscripciones',
  templateUrl: './form-inscripciones.component.html',
  styleUrls: ['./form-inscripciones.component.css']
})
export class FormInscripcionesComponent {

  @Input() inscripcion: Inscripcion = new Inscripcion(null, -1, -1, new Date(), new Date(), '', '');

  constructor(private planService: PlanService, private inscripcionesService: InscripcionesService, private sociosService: SociosService) { }


  modoEditar: boolean = false;

  planes: Array<Plan> = [];



  formInscripcion = new FormGroup({
    dniSocio: new FormControl('', Validators.required),
    plan: new FormControl<Plan | null>(null, Validators.required)
  });

  ngOnInit() {
    this.planService.getPlans().subscribe((planes: any) => {
      planes.forEach((plan: any) => {
        this.planes.push(new Plan(plan.idPlan, plan.nombre, plan.descripcion, plan.precio, plan.duracion, plan.diasPorSemana, plan.idGimnasio))
      })
    })
  }



  crearInscripcion() {

    this.inscripcion.dniSocio = this.formInscripcion.value.dniSocio!;
    this.inscripcion.idPlan = this.formInscripcion.value.plan!.idPlan;
    this.inscripcion.nombrePlan = this.formInscripcion.value.plan!.nombre;
    this.inscripcion.fechaFin.setMonth(this.inscripcion.fechaFin.getMonth() + this.formInscripcion.value.plan!.duracion)


    this.sociosService.getSocioByDni(this.inscripcion.dniSocio).pipe(
      switchMap((socio: any) => {
        this.inscripcion.idSocio = socio.idSocio;
        return this.inscripcionesService.createInscripcion(this.inscripcion);
      })
    ).subscribe({
      next: (response: any) => {
        Swal.showLoading();
        Swal.fire({
          title: 'Inscripción creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then(() => {
          window.location.reload(); // Recarga la página
        });
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error al crear la inscripción',
          text: error.message || error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        });
      }
    })

  }



  editarInscripcion() {

  }

}
