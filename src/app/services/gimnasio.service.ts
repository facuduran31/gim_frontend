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

  getGimnasios(){
    return this.http.get<Gimnasio[]>(`${this.urlApi}/gimnasios`);
  }

  getGimnasioById(id:number){
    return this.http.get<Gimnasio>(`${this.urlApi}/gimnasios/${id}`);
  }

  createGimnasio(gimnasio:Gimnasio){
    return this.http.post(`${this.urlApi}/gimnasios`, gimnasio);
  }

  updateGimnasio(gimnasio:Gimnasio){
    return this.http.put(`${this.urlApi}/gimnasios/${gimnasio.id}`, gimnasio);
  }

  deleteGimnasio(id:number){
    return this.http.delete(`${this.urlApi}/gimnasios/${id}`);
  }

  getGimnasiosByIdUsuario(idUsuario:number){
    return this.http.get<Gimnasio[]>(`${this.urlApi}/gimnasios/usuario/${idUsuario}`);
  }
}
