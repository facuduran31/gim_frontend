import { Component, Input } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Plan } from 'src/app/models/plan';
import { Socio } from 'src/app/models/socio';

@Component({
  selector: 'app-form-inscripciones',
  templateUrl: './form-inscripciones.component.html',
  styleUrls: ['./form-inscripciones.component.css']
})
export class FormInscripcionesComponent {


  modoEditar:boolean=false;


  @Input() inscripcion: Inscripcion = new Inscripcion(-1, -1, -1, new Date(), new Date(), '', '');
inputDniSocio: string | null = null;
inputNombrePlan: string | null = null;

  socios:Array<Socio>=[];
  planes:Array<Plan>=[];



  crearInscripcion(){

  }


  editarInscripcion(){

  }

}
