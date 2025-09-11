import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socio } from '../models/socio';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  urlApi = environment.urlApi + '/socios';

  constructor(private http: HttpClient) { }



  getSocioById(idSocio: number) {
    return this.http.get<Socio>(`${this.urlApi}/${idSocio}`, { withCredentials: true })
  }

  getSociosByIdGimnasio(idGimnasio: number) {
    return this.http.get<Socio[]>(`${this.urlApi}/gimnasio/${idGimnasio}`, { withCredentials: true })
  }

  getSocioByDni(dni: string) {
    return this.http.get<Socio>(`${this.urlApi}/dni/${dni}`, { withCredentials: true })
  }

  createSocio(socio: Socio) {
    return this.http.post(this.urlApi, socio, { withCredentials: true })
  }

  deleteSocio(idSocio: number) {
    return this.http.delete(`${this.urlApi}/${idSocio}`, { withCredentials: true })
  }

  validarIngreso(dni: string) {
    return this.http.get(`${this.urlApi}/ingreso/${dni}`, { withCredentials: true })
  }
}
