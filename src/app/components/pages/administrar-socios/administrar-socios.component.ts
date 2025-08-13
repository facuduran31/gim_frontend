import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socio } from 'src/app/models/socio';
import { SociosService } from 'src/app/services/socios.service';

@Component({
  selector: 'app-administrar-socios',
  templateUrl: './administrar-socios.component.html',
  styleUrls: ['./administrar-socios.component.css']
})
export class AdministrarSociosComponent {


  modoAgregarSocio:boolean=false;
  socios:Array<Socio>=[];

  constructor(private route:ActivatedRoute, private sociosService: SociosService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idGimnasio = parseInt(params.get('id') || '0')
      this.sociosService.getSociosByIdGimnasio(idGimnasio).subscribe(socios => {
        socios.forEach((socio:any)=>{
          this.socios.push(new Socio(socio.idUsuario, socio.dni, socio.nombre, socio.apellido, socio.telefono, socio.activo))
        })
      });
    });
  }



  toggleModoAgregarSocio(){
    this.modoAgregarSocio=!this.modoAgregarSocio;
  }

}
