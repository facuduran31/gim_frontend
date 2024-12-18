import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  notificaciones = [
    {redirectTo: '#', mensaje: 'Notificacion 1', fecha: '17 de Diciembre de 2024'}
  ];

  constructor(private authService: AuthService, private route: Router) { }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }

}
