import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private http: HttpClient) { }
  
  
    urlApi = `${environment.urlApi}/ingresos`;
  
  
  
    getIngresosByIdGimnasio(idGimnasio: number) {
      return this.http.get<Ingreso[]>(`${this.urlApi}/${idGimnasio}`, { withCredentials: true })
    }
  
    deleteIngreso(idIngreso: number) {
      return this.http.delete(`${this.urlApi}/${idIngreso}`, { withCredentials: true })
    }
  
    createInscripcion(ingreso: Ingreso) {
      return this.http.post(this.urlApi, ingreso, { withCredentials: true })
    }
}
