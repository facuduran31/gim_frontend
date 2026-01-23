import { Component } from '@angular/core';
import { Gimnasio } from 'src/app/models/gimnasio';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/authservice.service';
import { GimnasioService } from 'src/app/services/gimnasio.service';

@Component({
  selector: 'app-mis-gimnasios',
  templateUrl: './mis-gimnasios.component.html',
  styleUrls: ['./mis-gimnasios.component.css'],
})
export class MisGimnasiosComponent {
  constructor(
    private authService: AuthService,
    private gimnasioService: GimnasioService,
  ) {
    this.obtenerGimnasios();
  }

  modoCrearGimnasio = false;
  usuarioLogeado: Usuario | null = null;

  ngOnInit(): void {
    this.usuarioLogeado = this.authService.getUsuario();
    this.obtenerGimnasios();
  }

  gimnasios: Gimnasio[] = [];

  obtenerGimnasios() {
    if (this.usuarioLogeado) {
      if (this.usuarioLogeado.id) {
        this.gimnasioService
          .getGimnasiosByIdUsuario(this.usuarioLogeado.id)
          .subscribe((gimnasio) => {
            this.gimnasios = [...gimnasio];
          });
      }
    }
  }

  toggleModoCrearGimnasio() {
    this.modoCrearGimnasio = !this.modoCrearGimnasio;
  }
}
