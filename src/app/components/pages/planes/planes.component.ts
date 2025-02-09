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

  planes: Plan[] = [];

  constructor(private planesService: PlanService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
      const idGimnasio = parseInt(params.get('id') || '0')
      this.planesService.getPlanesByIdGimnasio(idGimnasio).subscribe(planes => {
        this.planes = [...planes];
        console.log(this.planes);
        console.log(idGimnasio);
        
        
      });
    });
  }

}
