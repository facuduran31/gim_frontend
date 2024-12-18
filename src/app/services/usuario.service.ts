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

  getUsuarios() {
    return this.http.get(`${this.urlApi}/usuarios`);
  }

  getUsuario(id: string) {
    return this.http.get(`${this.urlApi}/usuarios/${id}`);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post(`${this.urlApi}/usuarios`, usuario);
  }

  putUsuario(id: number, usuario: Usuario) {
    return this.http.put(`${this.urlApi}/usuarios/${id}`, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.urlApi}/usuarios/${id}`);
  }
}
