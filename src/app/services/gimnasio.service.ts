import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Gimnasio } from '../models/gimnasio';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {

  urlApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  getGimnasios() {
    return this.http.get(`${this.urlApi}/gimnasios`);
  }

  getGimnasio(id: string) {
    return this.http.get(`${this.urlApi}/gimnasios/${id}`);
  }

  postGimnasio(gimnasio: Gimnasio) {
    return this.http.post(`${this.urlApi}/gimnasios`, gimnasio);
  }

  putGimnasio(id: number, gimnasio: Gimnasio) {
    return this.http.put(`${this.urlApi}/gimnasios/${id}`, gimnasio);
  }

  deleteGimnasio(id: number) {
    return this.http.delete(`${this.urlApi}/gimnasios/${id}`);
  }
}
