import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/authservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usuarioLogeado: Usuario | null = null;

  ngOnInit(): void {
    this.usuarioLogeado = this.authService.getUsuario();
  }

  notificaciones = [
    {
      redirectTo: '#',
      mensaje: 'Notificacion 1',
      fecha: '17 de Diciembre de 2024',
    },
  ];

  constructor(
    private authService: AuthService,
    private route: Router,
  ) {}

  logout() {
    this.authService.logout();
  }

  getUsuario() {
    return this.authService.getUsuario();
  }
}
