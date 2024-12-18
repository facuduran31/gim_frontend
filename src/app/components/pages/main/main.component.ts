import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  options = [
    {title: 'Gestiona tus gimnasios', subtitle: 'Mis gimnasios', classes: 'fas fa-dumbbell', color: 'primary', redirectTo: 'mis-gimnasios'},
    {title: 'Gestiona tu suscripcion', subtitle: 'Mi suscripcion', classes: 'fas fa-dollar-sign', color: 'success', redirectTo: ''},
    {title: 'Gestiona tu cuenta', subtitle: 'Mi cuenta', classes: 'fas fa-user', color: 'danger', redirectTo: ''},
    {title: 'Soporte', subtitle: 'Necesito ayuda', classes: 'fas fa-circle-question', color: 'warning', redirectTo: ''},
    {title: 'Ver gráficos', subtitle: 'Ver gráficos', classes: 'fas fa-chart-pie', color: 'info', redirectTo: ''},
    {title: 'Ver tablas', subtitle: 'Ver tablas', classes: 'fas fa-table', color: 'dark', redirectTo: ''}
  ]

  
}
