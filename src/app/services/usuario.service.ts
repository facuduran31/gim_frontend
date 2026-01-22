import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  urlApi = environment.urlApi;

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<Usuario[]>(`${this.urlApi}/usuarios`, {
      withCredentials: true,
    });
  }

  getUsuarioById(id: number) {
    return this.http.get<Usuario>(`${this.urlApi}/usuarios/${id}`, {
      withCredentials: true,
    });
  }

  createUsuario(usuario: Usuario) {
    return this.http.post(`${this.urlApi}/usuarios`, usuario, {
      withCredentials: true,
    });
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put(`${this.urlApi}/usuarios/${usuario.id}`, usuario, {
      withCredentials: true,
    });
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.urlApi}/usuarios/${id}`, {
      withCredentials: true,
    });
  }

  forgotPassword(mail: string) {
    return this.http.post(`${this.urlApi}/usuarios/request-password-reset`, {
      mail,
    });
  }

  resetPassword(token: string, password: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); //Acá uso token en ves de cookies pq el usuario no está logueado
    return this.http.post(
      `${this.urlApi}/usuarios/password-reset`,
      { password },
      { headers },
    );
  }

  sendEmail(data: any) {
    return this.http.post(`${this.urlApi}/usuarios/send-email`, data, {
      withCredentials: true,
    });
  }
}
