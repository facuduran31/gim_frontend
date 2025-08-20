import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  modoCrearPlan: boolean = false;
  modoEditarPlan: boolean = false;
  plan: Plan = new Plan(0, '', '', 0, 0, 0, 0);
  planes: Array<Plan> = [];

  constructor(private planesService: PlanService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    console.log(this.plan);
    
    this.route.paramMap.subscribe(params => {
      const idGimnasio = Number(params.get('id')) || 0;
      const idPlan = Number(params.get('idplan')) || 0;
  
      this.planesService.getPlanesByIdGimnasio(idGimnasio).subscribe(planes => {
        this.planes = [...planes];
      });
    });
  }
  

  toggleModoCrearPlan() {
    this.modoCrearPlan = !this.modoCrearPlan;
  }

  editarPlan(idPlan: number) {
    this.router.navigate([idPlan], { relativeTo: this.route });
  }


  borrarPlan(id: number) {
      Swal.fire({
        title: '¡ADVERTENCIA!',
        text: 'SI BORRAS EL PLAN TODA LA INFORMACIÓN SE PERDERÁ DE MANERA DEFINITIVA',
        icon: 'warning',
        showConfirmButton: true,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: 'BORRAR',
        denyButtonText: 'Cancelar',
        confirmButtonColor: '#ff0000',
        denyButtonColor: '#555555'
      }).then((result) => {
        if(result.isConfirmed)
        {
          this.planesService.deletePlan(id).subscribe(() => {
            Swal.fire({
              title: 'Plan borrado con exito',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#00aa00',
            }).then((result) => {
              this.ngOnInit();
            })
          });
        }
        
      });
  }
}