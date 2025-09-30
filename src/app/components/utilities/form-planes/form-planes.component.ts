import { Component, OnInit } from '@angular/core';
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

  modoEditar: boolean = false; // determina si es edición o creación
  plan: Plan = new Plan(0, '', '', 0, 0, 0, 0);

  // Inputs ligados al ngModel
  inputNombrePlan: string = '';
  inputDescripcion: string = '';
  inputPrecio: number = 0;
  inputDuracion: number = 0;
  inputDiasPorSemana: number = 0;

  constructor(
    private planesService: PlanService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // Captura de parámetros
    this.route.params.subscribe(params => {
      const idPlan = params['idplan'];
      if (idPlan > 0) {
        this.modoEditar = true;
        this.planesService.getPlanById(idPlan).subscribe(res => {
          if (res.length > 0) {
            const plan = res[0];  // ⚠️ Tomamos el primer elemento del array
            this.plan = plan;

            this.inputNombrePlan = plan.nombre;
            this.inputDescripcion = plan.descripcion;
            this.inputPrecio = plan.precio;
            this.inputDuracion = plan.duracion;
            this.inputDiasPorSemana = plan.diasPorSemana;

          } else {
            Swal.fire('Error', 'No se encontró el plan', 'error');
          }
        }, error => {
          Swal.fire('Error', 'No se pudo cargar el plan', 'error');
        });
      }
    });
  }


  guardarPlan() {
    this.plan.nombre = this.inputNombrePlan;
    this.plan.descripcion = this.inputDescripcion;

    this.plan.precio = Number(this.inputPrecio);
    this.plan.duracion = Number(this.inputDuracion);
    this.plan.diasPorSemana = Number(this.inputDiasPorSemana);
    this.plan.idGimnasio = Number(this.route.snapshot.paramMap.get('id'));

    if (this.modoEditar) {
      this.planesService.updatePlan(this.plan).subscribe(() => {
        Swal.fire('Éxito', 'Plan editado correctamente', 'success')
          .then(() => this.router.navigate(['/gimnasio', this.plan.idGimnasio, 'planes']));
      }, error => {
        Swal.fire('Error', 'No se pudo editar el plan', 'error');
      });
    } else {
      this.planesService.createPlan(this.plan).subscribe(() => {
        Swal.fire('Éxito', 'Plan creado correctamente', 'success')
          .then(() => this.router.navigate(['/gimnasio', this.plan.idGimnasio, 'planes']));
      }, error => {
        Swal.fire('Error', 'No se pudo crear el plan', 'error');
      });
    }

  }
}
