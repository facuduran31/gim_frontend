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
  planes: Array<Plan> = [];

  constructor(private planesService: PlanService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idGimnasio = parseInt(params.get('id') || '0')
      this.planesService.getPlanesByIdGimnasio(idGimnasio).subscribe(planes => {
        this.planes = [...planes];


      });
    });
  }

  toggleModoCrearPlan() {
    this.modoCrearPlan = !this.modoCrearPlan;
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
      if (result.isConfirmed) {
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

    })
  }
}
