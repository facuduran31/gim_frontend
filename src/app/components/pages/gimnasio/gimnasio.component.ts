import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gimnasio } from 'src/app/models/gimnasio';
import { GimnasioService } from 'src/app/services/gimnasio.service';

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.css']
})
export class GimnasioComponent implements OnInit{

  id: number = 0;
  gimnasio: Gimnasio | undefined;
  options = [
    {title: 'Editar informacion', subtitle: 'Modificar gimnasio', classes: 'fas fa-dumbbell', color: 'primary', redirectTo: ''},
    {title: 'Agregar o editar planes', subtitle: 'Administrar planes', classes: 'fas fa-dollar-sign', color: 'success', redirectTo: ''},
    {title: 'Administrar socios', subtitle: 'Socios', classes: 'fas fa-user', color: 'danger', redirectTo: ''},
    {title: 'Validar ingresos', subtitle: 'Ingresos', classes: 'fas fa-table', color: 'warning', redirectTo: ''}
  ]

  constructor(private route:ActivatedRoute, private gimnasioService: GimnasioService) {}

  ngOnInit(): void {
    this.obtenerGimnasio()
  }

  obtenerGimnasio() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') || '0');
      this.gimnasioService.getGimnasioById(this.id).subscribe((gim:any) => {
        this.gimnasio = gim[0];
      });
    })
    
  }
}
