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
  @Input() plan: Plan = new Plan(0, '', '', 0, 0, 0, 0);

  inputNombrePlan: string = '';
  inputDescripcion: string = '';
  inputPrecio: number = 0;
  inputDuracion: number = 0;
  inputDiasPorSemana: number = 0;

  constructor(
    private planesService: PlanService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idGimnasio = Number(params.get('id')) || 0;
      const idPlan = Number(params.get('idplan')) || 0;
      console.log(idPlan);
      
      this.plan.idGimnasio = idGimnasio;
      if (idPlan > 0) {
        console.log(idPlan); // DEVUELVE 7
        
        // Obtener el plan antes de inicializar inputs
        this.planesService.getPlanById(idPlan).subscribe(plan => {
          this.plan = plan;
          console.log(plan);
          
          this.inputNombrePlan = plan.nombre;
          console.log(this.inputNombrePlan); // DEVUELVE undefined (EL PLAN NO TIENE undefined EN .nombre)
          
          this.inputDescripcion = plan.descripcion;
          this.inputPrecio = plan.precio;
          this.inputDuracion = plan.duracion;
          this.inputDiasPorSemana = plan.diasPorSemana;
          this.modoEditar = true;
        });
      }
    });
  }

  crearPlan() {
    this.plan.nombre = this.inputNombrePlan;
    this.plan.descripcion = this.inputDescripcion;
    this.plan.precio = this.inputPrecio;
    this.plan.duracion = this.inputDuracion;
    this.plan.diasPorSemana = this.inputDiasPorSemana;

    this.planesService.createPlan(this.plan).subscribe(
      () => {
        Swal.fire({
          title: 'Plan creado con éxito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then(() => {
          this.router.navigate(['/mis-planes']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error al crear el plan',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        });
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
      () => {
        Swal.fire({
          title: 'Plan editado con éxito',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00aa00',
        }).then(() => {
          this.router.navigate(['/mis-planes']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error al editar el plan',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0000aa'
        });
      }
    );
  }
}
