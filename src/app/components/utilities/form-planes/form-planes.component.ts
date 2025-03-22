import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-planes',
  templateUrl: './form-planes.component.html',
  styleUrls: ['./form-planes.component.css']
})
export class FormPlanesComponent implements OnInit {

  modoEditar: boolean = false;

  constructor(private planesService: PlanService, private route: Router, private router: ActivatedRoute) { }

  @Input() plan: Plan = new Plan(0, '', '', 0, 0, 0, 0);
  inputNombrePlan: string = '';
  inputDescripcion: string = '';
  inputPrecio: number = 0;
  inputDuracion: number = 0;
  inputDiasPorSemana: number = 0;

  ngOnInit(): void {
    this.inputNombrePlan = this.plan.nombre;
    this.inputDescripcion = this.plan.descripcion;
    this.inputPrecio = this.plan.precio;
    this.inputDuracion = this.plan.duracion;
    this.inputDiasPorSemana = this.plan.diasPorSemana;
    this.router.paramMap.subscribe(params => {
      this.plan.idGimnasio = parseInt(params.get('id')!);
    });
    if(this.inputNombrePlan != '') {
      this.modoEditar = true;
    }
  }

  crearPlan() {
    this.plan.nombre = this.inputNombrePlan;
    this.plan.descripcion = this.inputDescripcion;
    this.plan.precio = parseInt(this.inputPrecio.toString());
    this.plan.duracion = parseInt(this.inputDuracion.toString());
    this.plan.diasPorSemana = parseInt(this.inputDiasPorSemana.toString());
    this.planesService.createPlan(this.plan).subscribe(
      (response) => {
        Swal.fire({
          title: 'Plan creado con exito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then((result) => {
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            window.location.reload(); // Recarga la página
          });
        })
      },
      (error) => {
        Swal.fire({
          title: 'Error al crear el plan',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        })
      }
    );
  }

  editarPlan() {
    this.plan.nombre = this.inputNombrePlan;
    this.plan.descripcion = this.inputDescripcion;
    this.plan.precio = this.inputPrecio;
    this.plan.duracion = this.inputDuracion;
    this.plan.diasPorSemana = this.inputDiasPorSemana;

    this.planesService.updatePlan(this.plan).subscribe(
      (response) => {
        Swal.fire({
          title: 'Plan editado con exito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then((result) => {
          this.route.navigateByUrl('/mis-plans', { skipLocationChange: true }).then(() => {
            window.location.reload(); // Recarga la página
          });
        })
      },
      (error) => {
        Swal.fire({
          title: 'Error al editar el plan',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        })
      }
    );
  }

}
