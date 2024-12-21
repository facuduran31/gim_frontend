import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gimnasio } from 'src/app/models/gimnasio';
import { GimnasioService } from 'src/app/services/gimnasio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.css']
})
export class GimnasioComponent implements OnInit{

  id: number = 0;
  gimnasio: Gimnasio = new Gimnasio('', '');
  options = [
    {title: 'Editar informacion', subtitle: 'Modificar gimnasio', classes: 'fas fa-dumbbell', color: 'primary', redirectTo: null},
    {title: 'Agregar o editar planes', subtitle: 'Administrar planes', classes: 'fas fa-dollar-sign', color: 'success', redirectTo: '/planes'},
    {title: 'Administrar socios', subtitle: 'Socios', classes: 'fas fa-user', color: 'danger', redirectTo: ''},
    {title: 'Validar ingresos', subtitle: 'Ingresos', classes: 'fas fa-table', color: 'warning', redirectTo: ''}
  ];
  modoEditarGimnasio = false;

  constructor(private route:ActivatedRoute, private gimnasioService: GimnasioService, private router: Router) {}

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

  toggleModoEditar() {
    this.modoEditarGimnasio = !this.modoEditarGimnasio;
    console.log(this.modoEditarGimnasio);
    
  }

  borrarGimnasio() {
    Swal.fire({
      title: '¡ADVERTENCIA!',
      text: 'SI BORRAS EL GIMNASIO TODA LA INFORMACIÓN SE PERDERÁ DE MANERA DEFINITIVA',
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
        this.gimnasioService.deleteGimnasio(this.id).subscribe(() => {
          Swal.fire({
            title: 'Gimnasio borrado con exito',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#00aa00',
          }).then((result) => {
            this.router.navigate(['/mis-gimnasios']);
          })
        });
      }
      
    })
  }
}
