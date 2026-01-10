import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  urlApi = `${environment.urlApi}/ingresos`;

  constructor(private http: HttpClient) { }

  getIngresosByIdGimnasio(idGimnasio: number) {
    return this.http.get<Ingreso[]>(`${this.urlApi}/${idGimnasio}`, { withCredentials: true });
  }

  createIngreso(ingreso: Ingreso) {
    return this.http.post(this.urlApi, ingreso, { withCredentials: true });
  }

  deleteIngreso(idIngreso: number) {
    return this.http.delete(`${this.urlApi}/${idIngreso}`, { withCredentials: true });
  }

  /**
   * Valida un ingreso por DNI y crea uno nuevo
   */
  validarIngreso(dni: string, idGimnasio: number) {
    return this.http.post(
      `${this.urlApi}/validar`,
      { dni, idGimnasio },
      { withCredentials: true }
    );
  }
}
