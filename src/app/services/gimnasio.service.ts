import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Gimnasio } from '../models/gimnasio';

@Injectable({
  providedIn: 'root',
})
export class GimnasioService {
  urlApi = environment.urlApi;

  constructor(private http: HttpClient) {}

  getGimnasios() {
    return this.http.get<Gimnasio[]>(`${this.urlApi}/gimnasios`, {
      withCredentials: true,
    });
  }

  getGimnasioById(id: number) {
    return this.http.get<Gimnasio>(`${this.urlApi}/gimnasios/${id}`, {
      withCredentials: true,
    });
  }

  createGimnasio(gimnasio: Gimnasio) {
    return this.http.post(`${this.urlApi}/gimnasios`, gimnasio, {
      withCredentials: true,
    });
  }

  updateGimnasio(gimnasio: Gimnasio) {
    return this.http.put(
      `${this.urlApi}/gimnasios/${gimnasio.idGimnasio}`,
      gimnasio,
      { withCredentials: true },
    );
  }

  deleteGimnasio(id: number) {
    return this.http.delete(`${this.urlApi}/gimnasios/${id}`, {
      withCredentials: true,
    });
  }

  getGimnasiosByIdUsuario(idUsuario: number) {
    return this.http.get<Gimnasio[]>(
      `${this.urlApi}/gimnasios/usuario/${idUsuario}`,
      { withCredentials: true },
    );
  }
}
