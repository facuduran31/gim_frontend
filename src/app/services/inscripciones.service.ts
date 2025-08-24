import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Inscripcion } from '../models/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private http: HttpClient) { }


  urlApi = `${environment.urlApi}/inscripciones`;



  getInscripcionesByIdGimnasio(idGimnasio:number){
    return this.http.get<Inscripcion[]>(`${this.urlApi}/gimnasio/${idGimnasio}`, {withCredentials: true})
  }

  deleteInscripcion(idInscripcion:number){
    return this.http.delete(`${this.urlApi}/${idInscripcion}`, {withCredentials: true})
  }

  createInscripcion(inscripcion:Inscripcion){
    return this.http.post(this.urlApi, inscripcion, {withCredentials:true})
  }



}
