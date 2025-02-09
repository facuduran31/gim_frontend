import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  modoCrearPlan: boolean = false;
  planes: Plan[] = [];

  constructor(private planesService: PlanService, private route:ActivatedRoute) { }

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
}
