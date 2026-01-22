import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environment';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.urlApi;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: { mail: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, credentials, {
      withCredentials: true, // Permitir envío de cookies
    });
  }

  logout(): void {
    const url = `${this.apiUrl}/usuarios/logout`;
    this.http.post<any>(url, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        // Aunque falle, limpiamos y redirigimos
        this.router.navigate(['/']);
      },
    });
  }

  isLoggedIn(): boolean {
    // Verificar si el token existe y no ha expirado
    return !!this.getCookie('user');
  }

  // getToken(): string | null { //NO LA BORRO POR LAS DUDAS PERO NO HACE FALTA
  //   return localStorage.getItem('token');
  // }

  getCookie(name: any) {
    //Obtiene solo la cookie que tiene los datos del usuario
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift();
    return null;
  }

  getUsuario(): Usuario {
    const encodedUser = this.getCookie('user'); // Obtener el valor de la cookie
    const decodedUser = JSON.parse(decodeURIComponent(encodedUser!)); // Decodificar y convertir a objeto

    return decodedUser;
  }
}
