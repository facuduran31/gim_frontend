import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  options = [
    {title: 'Gestionar mis gimnasios', subtitle: 'Mis gimnasios', classes: 'fas fa-dumbbell', color: 'primary'},
    {title: 'Gestiona tu suscripcion', subtitle: 'Mi suscripcion', classes: 'fas fa-dollar-sign', color: 'success'},
    {title: 'Gestiona tu cuenta', subtitle: 'Mi cuenta', classes: 'fas fa-user', color: 'danger'},
    {title: 'Soporte', subtitle: 'Necesito ayuda', classes: 'fas fa-circle-question', color: 'warning'}
  ]

}
