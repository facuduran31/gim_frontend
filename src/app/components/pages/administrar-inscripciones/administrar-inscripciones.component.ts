import { Component } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion';

@Component({
  selector: 'app-administrar-inscripciones',
  templateUrl: './administrar-inscripciones.component.html',
  styleUrls: ['./administrar-inscripciones.component.css']
})
export class AdministrarInscripcionesComponent {


  modoAgregarInscripcion:boolean=false;
  inscripciones:Array<Inscripcion>=[];



  toggleModoAgregarInscripcion(){
    this.modoAgregarInscripcion=!this.modoAgregarInscripcion;
  }

  borrarInscripcion(idInscripcion:number){

  }

}
