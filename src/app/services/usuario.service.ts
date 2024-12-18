import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get<Usuario[]>(`${this.urlApi}/usuarios`);
  }

  getUsuarioById(id:number){
    return this.http.get<Usuario>(`${this.urlApi}/usuarios/${id}`);
  }

  createUsuario(usuario:Usuario){
    return this.http.post(`${this.urlApi}/usuarios`, usuario);
  }

  updateUsuario(usuario:Usuario){
    return this.http.put(`${this.urlApi}/usuarios/${usuario.id}`, usuario);
  }

  deleteUsuario(id:number){
    return this.http.delete(`${this.urlApi}/usuarios/${id}`);
  }
}
