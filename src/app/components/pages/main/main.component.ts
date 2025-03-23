import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private authService: AuthService) { }


  options = [
    {title: 'Gestiona tus gimnasios', subtitle: 'Mis gimnasios', classes: 'fas fa-dumbbell', color: 'primary', redirectTo: 'mis-gimnasios'},
    {title: 'Gestiona tu suscripcion', subtitle: 'Mi suscripcion', classes: 'fas fa-dollar-sign', color: 'success', redirectTo: ''},
    {title: 'Gestiona tu cuenta', subtitle: 'Mi cuenta', classes: 'fas fa-user', color: 'danger', redirectTo: 'mi-cuenta'},
    {title: 'Soporte', subtitle: 'Necesito ayuda', classes: 'fas fa-circle-question', color: 'warning', redirectTo: 'necesito-ayuda'},
    {title: 'Ver gráficos', subtitle: 'Ver gráficos', classes: 'fas fa-chart-pie', color: 'info', redirectTo: ''},
    {title: 'Ver tablas', subtitle: 'Ver tablas', classes: 'fas fa-table', color: 'dark', redirectTo: ''}
  ]


}
