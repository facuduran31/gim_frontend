import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  notificaciones = [
    {redirectTo: '#', mensaje: 'Notificacion 1', fecha: '17 de Diciembre de 2024'}
  ];

}
